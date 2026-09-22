// ============================================================
// MOTOR DEL ÁRBOL — ValleDATA (FIX para n8n)
// Interpreta nodes.json. Para agregar, quitar o reescribir ramas
// se edita nodes.json, no este código.
// ============================================================

const arbol   = $input.first().json;
const nodos   = arbol.nodos;
const entrada = $('Chat entrante').first().json;

const mensaje   = (entrada.chatInput || '').trim();

const UMBRAL = 0.9;   // sin RAG: umbral más bajo + fallback explícito

// ----------------------------------------------------- memoria de sesión
// n8n no propaga sessionId de forma consistente, así que guardamos el
// último nodo en memoria estática que sí mantiene n8n entre mensajes.
const memoria = $getWorkflowStaticData('global');
if (!memoria.ultimoNodo) memoria.ultimoNodo = 'menu_principal';

function recordar(id) {
  memoria.ultimoNodo = id;
}

// ------------------------------------------------ normalización y tokens

const STOP = new Set(['de','la','el','los','las','un','una','unos','unas','y','o','a','en','que','como','para','por','con','del','al','se','mi','me','es','son','lo','su','sus','puedo','quiero','necesito','tengo','hay','donde','cual','cuales','esta','este','estos','estas','mas','muy','pero','si','no','the','of']);

function norm(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9ñ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stem(t) {
  if (t.length <= 4) return t;
  let s = t.replace(/(ciones|cion)$/, 'cion').replace(/(es|s)$/, '');
  if (s.length > 5) s = s.replace(/(ando|endo|aron|ieron|amos|emos|imos|ar|er|ir|o|a|e)$/, '');
  return s;
}

function tokens(s) {
  return norm(s).split(' ').filter(t => t.length > 2 && !STOP.has(t)).map(stem);
}

// --------------------------------------------------------------- índice
// Se reconstruye en cada ejecución: con ~80 nodos cuesta menos de 1 ms.
// El IDF evita que palabras omnipresentes en este dominio ("datos",
// "conjunto", "portal") decidan la clasificación.

function indexar(nodos) {
  const docs = {};
  const df = new Map();

  for (const [id, n] of Object.entries(nodos)) {
    if (id.startsWith('_')) continue;

    const kwFrases = (n.kw || []).map(norm).filter(k => k.includes(' '));
    const kwTokens = new Set((n.kw || []).flatMap(k => tokens(k)));
    const tituloTokens = new Set(tokens(n.titulo));
    const cuerpoTokens = new Set(tokens([
      n.texto, (n.pasos || []).join(' '), n.nota,
      (n.opciones || []).map(o => o.label).join(' ')
    ].join(' ')));

    docs[id] = { kwFrases, kwTokens, kwArr: [...kwTokens], tituloTokens, cuerpoTokens };
    for (const t of new Set([...kwTokens, ...tituloTokens, ...cuerpoTokens])) {
      df.set(t, (df.get(t) || 0) + 1);
    }
  }

  const N = Object.keys(docs).length;
  const idf = new Map();
  for (const [t, f] of df) idf.set(t, Math.max(0, Math.log(N / f) / Math.log(N)));

  return { docs, idf };
}

function prefijoComun(a, b) {
  return a.length >= 5 && b.length >= 5 && a.slice(0, 5) === b.slice(0, 5);
}

function clasificar(mensaje, idx) {
  const textoNorm = norm(mensaje);
  const consulta = tokens(mensaje);
  if (!consulta.length) return { mejor: null, puntaje: 0 };

  let mejor = null, mejorPuntaje = 0;

  for (const [id, doc] of Object.entries(idx.docs)) {
    let p = 0;

    for (const frase of doc.kwFrases) if (textoNorm.includes(frase)) p += 6;

    for (const t of consulta) {
      const w = idx.idf.get(t) ?? 1;
      if (doc.kwTokens.has(t)) p += 4 * w;
      else if (doc.kwArr.some(k => prefijoComun(k, t))) p += 2 * w;
      if (doc.tituloTokens.has(t)) p += 2 * w;
      if (doc.cuerpoTokens.has(t)) p += 0.5 * w;
    }

    const normalizado = p / Math.max(consulta.length, 1);
    if (normalizado > mejorPuntaje) { mejorPuntaje = normalizado; mejor = id; }
  }

  return { mejor, puntaje: +mejorPuntaje.toFixed(2) };
}

// ------------------------------------------------------ render de un nodo

function render(id) {
  const n = nodos[id];
  if (!n) return render('_fallback');

  recordar(id);

  let out = '';
  if (n.texto) out += n.texto + '\n';

  if (Array.isArray(n.pasos) && n.pasos.length) {
    out += '\n';
    const numerado = n.tipo === 'pasos';
    n.pasos.forEach((p, i) => {
      out += (numerado ? `**${i + 1}.** ` : '• ') + p + '\n';
    });
  }

  if (n.nota) out += '\n> ' + n.nota.replace(/\n/g, '\n> ') + '\n';

  return {
    nodo: id,
    titulo: n.titulo || '',
    texto: out.trim(),
    url: n.url || null,
    botones: (n.opciones || []).map(o => ({ label: o.label, value: '__nav__:' + o.next })),
    fuente: n.src || null,
    resuelto: true,
  };
}

// --------------------------------------------------------------- ruteo

// 1. Click de botón: navegación determinista, sin ambigüedad.
if (mensaje.startsWith('__nav__:')) {
  const destino = mensaje.slice(8).trim();
  return [{ json: { ...render(nodos[destino] ? destino : '_fallback'), via: 'boton' } }];
}

// 2. Respuesta numérica ("2", "opción 3"): se resuelve contra las opciones
//    del último nodo que mostramos.
const soloNumero = mensaje.match(/^(?:opcion\s*|opción\s*|n[°º]\s*)?(\d{1,2})[.)]?$/i);
if (soloNumero) {
  const i = parseInt(soloNumero[1], 10) - 1;
  const nodoActual = nodos[memoria.ultimoNodo];
  const opciones = nodoActual ? (nodoActual.opciones || []) : [];

  if (i >= 0 && i < opciones.length) {
    const destino = opciones[i].next;
    return [{ json: { ...render(destino), via: 'numero' } }];
  }
  // Número fuera de rango: repetimos el menú actual
  return [{ json: { ...render(memoria.ultimoNodo), via: 'numero-invalido' } }];
}

// 3. Saludo o mensaje vacío: menú principal.
const SALUDOS = /^(hola|buenas|buenos dias|buenas tardes|buenas noches|hey|hi|hello|menu|inicio|empezar|volver|ayuda|help)\b/i;
if (!mensaje || SALUDOS.test(norm(mensaje))) {
  return [{ json: { ...render('menu_principal'), via: 'saludo' } }];
}

// 4. Texto libre: ¿lo cubre alguna rama del árbol?
const idx = indexar(nodos);
const r = clasificar(mensaje, idx);

if (r.mejor && r.puntaje >= UMBRAL) {
  return [{ json: { ...render(r.mejor), via: 'arbol', puntaje: r.puntaje } }];
}

// 5. Sin match confiable: fallback.
return [{ json: { ...render('_fallback'), via: 'sin-match', puntaje: r.puntaje } }];
