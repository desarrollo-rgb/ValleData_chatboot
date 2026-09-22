// ============================================================
// MOTOR DEL ÁRBOL — ValleDATA
// Navegación pura por opciones, como un IVR telefónico: el usuario
// solo puede elegir entre las opciones que se le muestran, haciendo
// clic en un botón. El widget (widget/valledata-chat.js) no tiene
// caja de texto — no hay forma de escribir texto libre.
//
// El caso 2 (respuesta numérica) queda como fallback defensivo por si
// algo le pega al webhook directamente fuera del widget; en el uso
// normal solo se disparan los casos 1 (clic) y 3 (apertura del chat).
//
// Para agregar, quitar o reescribir ramas se edita nodes.json,
// no este código.
// ============================================================

const arbol   = $input.first().json;
const nodos   = arbol.nodos;

// El nodo Webhook entrega { headers, params, query, body }; el viejo
// chatTrigger entregaba el cuerpo plano. Aceptamos las dos formas para
// no romper si alguien reimporta un workflow anterior.
const recibido = $('Chat entrante').first().json;
const entrada  = recibido.body || recibido;

const mensaje = (entrada.chatInput || '').trim();

// ----------------------------------------------------- memoria de sesión
// Solo guardamos el último nodo mostrado, para poder resolver respuestas
// numéricas ("2") contra las opciones de ese nodo.
const memoria = $getWorkflowStaticData('global');
if (!memoria.ultimoNodo) memoria.ultimoNodo = 'menu_principal';

function recordar(id) {
  memoria.ultimoNodo = id;
}

function norm(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .trim();
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

// 1. Clic de botón: navegación determinista, sin ambigüedad.
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
    return [{ json: { ...render(opciones[i].next), via: 'numero' } }];
  }
  // Número fuera de rango: repetimos el menú actual con un aviso.
  return [{ json: { ...render(memoria.ultimoNodo), via: 'numero-invalido', aviso: true } }];
}

// 3. Saludo o mensaje vacío: menú principal.
const SALUDOS = /^(hola|buenas|buenos dias|buenos días|buenas tardes|buenas noches|hey|hi|hello|menu|menú|inicio|empezar|volver|ayuda|help)\b/i;
if (!mensaje || SALUDOS.test(norm(mensaje))) {
  return [{ json: { ...render('menu_principal'), via: 'saludo' } }];
}

// 4. Cualquier otra cosa: no interpretamos texto libre. Repetimos el nodo
//    actual con un aviso, para que el usuario elija una de las opciones.
return [{ json: { ...render(memoria.ultimoNodo), via: 'no-entendido', aviso: true } }];
