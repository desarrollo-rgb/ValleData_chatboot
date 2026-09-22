#!/usr/bin/env node
/**
 * Ingesta de los manuales de ValleDATA al vector store.
 *
 *   node ingesta.mjs                 # indexa
 *   node ingesta.mjs --dry           # solo muestra los chunks, no sube nada
 *   node ingesta.mjs --recrear       # borra la colección y la crea de cero
 *
 * Variables de entorno:
 *   OPENAI_API_KEY     obligatoria
 *   QDRANT_URL         por defecto http://localhost:6333
 *   QDRANT_API_KEY     opcional
 *   COLECCION          por defecto valledata_manuales
 *
 * Chunkeo: por sección (encabezado markdown), que es la unidad natural de
 * estos manuales. Las secciones largas se parten en trozos con solape,
 * repitiendo el encabezado en cada trozo para que el chunk no pierda contexto.
 */

import { readFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR_MANUALES = join(__dirname, '..', 'manuales');

const QDRANT_URL   = process.env.QDRANT_URL   || 'http://localhost:6333';
const QDRANT_KEY   = process.env.QDRANT_API_KEY || '';
const COLECCION    = process.env.COLECCION    || 'valledata_manuales';
const OPENAI_KEY   = process.env.OPENAI_API_KEY;
const MODELO_EMB   = 'text-embedding-3-small';
const DIMENSIONES  = 1536;

const MAX_CHARS    = 1400;   // tamaño objetivo de chunk
const SOLAPE       = 200;    // solape entre trozos de una misma sección

const DRY     = process.argv.includes('--dry');
const RECREAR = process.argv.includes('--recrear');

// Nombre legible de cada archivo, para poder citar la fuente en las respuestas.
const MANUALES = {
  'ciudadano.md':      { titulo: 'Guía del Ciudadano',                    rol: 'ciudadano',        ambiente: 'portal' },
  'miembro.md':        { titulo: 'Manual del Miembro',                    rol: 'miembro',          ambiente: 'portal' },
  'editor.md':         { titulo: 'Manual del Editor',                     rol: 'editor',           ambiente: 'portal' },
  'admin_org.md':      { titulo: 'Manual del Administrador de Dependencia', rol: 'admin_dependencia', ambiente: 'portal' },
  'admin.md':          { titulo: 'Manual del Administrador',              rol: 'sysadmin',         ambiente: 'portal' },
  'admin_harvest.md':  { titulo: 'Manual del Administrador — Cosecha',    rol: 'sysadmin',         ambiente: 'harvest' },
  'miembro_harvest.md':{ titulo: 'Manual del Miembro — Cosecha',          rol: 'miembro',          ambiente: 'harvest' },
};

// Secciones que no se indexan: portada e índice. Mencionan todos los temas
// del manual a la vez, así que matchean cualquier consulta y desplazan a las
// secciones que sí tienen la respuesta.
const RUIDO = /^(introducci[oó]n|tabla de contenido|[¿?]qu[eé] vas a encontrar en esta gu[ií]a[?]?)$/i;

// ---------------------------------------------------------------- chunkeo

/** Parte un .md en secciones según sus encabezados (#, ##, ###). */
function porSecciones(md) {
  const lineas = md.split('\n');
  const secciones = [];
  let actual = { h1: null, h2: null, titulo: 'Introducción', cuerpo: [] };

  for (const linea of lineas) {
    const m = linea.match(/^(#{1,3})\s+(.*)$/);
    if (m) {
      if (actual.cuerpo.join('').trim()) secciones.push(actual);
      const nivel = m[1].length;
      const texto = m[2].trim();
      actual = {
        h1: nivel === 1 ? texto : actual.h1,
        h2: nivel === 2 ? texto : (nivel === 1 ? null : actual.h2),
        titulo: texto,
        cuerpo: [],
      };
    } else {
      actual.cuerpo.push(linea);
    }
  }
  if (actual.cuerpo.join('').trim()) secciones.push(actual);
  return secciones;
}

/** Parte un texto largo en trozos con solape, sin cortar a mitad de línea. */
function trocear(texto, max, solape) {
  if (texto.length <= max) return [texto];
  const trozos = [];
  const lineas = texto.split('\n');
  let buf = '';

  for (const linea of lineas) {
    if ((buf + '\n' + linea).length > max && buf) {
      trozos.push(buf.trim());
      const cola = buf.slice(-solape);
      const corte = cola.indexOf('\n');
      buf = (corte >= 0 ? cola.slice(corte + 1) : '') + '\n' + linea;
    } else {
      buf += (buf ? '\n' : '') + linea;
    }
  }
  if (buf.trim()) trozos.push(buf.trim());
  return trozos;
}

async function construirChunks() {
  const archivos = (await readdir(DIR_MANUALES)).filter(f => f.endsWith('.md'));
  const chunks = [];

  for (const archivo of archivos) {
    const meta = MANUALES[archivo];
    if (!meta) {
      console.warn(`  ! ${archivo} no está en el mapa MANUALES, lo salto`);
      continue;
    }

    const md = await readFile(join(DIR_MANUALES, archivo), 'utf8');
    const secciones = porSecciones(md);

    for (const sec of secciones) {
      const cuerpo = sec.cuerpo.join('\n').trim();
      if (cuerpo.length < 40) continue;   // descarta pies de figura sueltos

      // Portadas e índices: no aportan nada al RAG y compiten con las
      // secciones reales, porque mencionan todos los temas a la vez.
      if (RUIDO.test(sec.titulo)) continue;

      // Ruta jerárquica: "4. Cómo buscar > 4.2 Filtros"
      const ruta = [sec.h1, sec.h2 !== sec.h1 ? sec.h2 : null, sec.titulo !== sec.h2 ? sec.titulo : null]
        .filter(Boolean)
        .filter((v, i, a) => a.indexOf(v) === i)
        .join(' > ');

      const partes = trocear(cuerpo, MAX_CHARS, SOLAPE);

      partes.forEach((parte, i) => {
        // El encabezado se repite en cada trozo: sin esto, el trozo 2 de una
        // sección llega al modelo sin saber de qué sección es.
        const texto = `# ${meta.titulo}\n## ${ruta}\n\n${parte}`;
        chunks.push({
          texto,
          metadata: {
            manual: meta.titulo,
            archivo,
            rol: meta.rol,
            ambiente: meta.ambiente,
            seccion: ruta,
            parte: partes.length > 1 ? `${i + 1}/${partes.length}` : null,
            cita: `${meta.titulo}, ${ruta}`,
          },
        });
      });
    }
  }
  return chunks;
}

// ------------------------------------------------------------- embeddings

async function embeber(textos) {
  const salida = [];
  const LOTE = 96;

  for (let i = 0; i < textos.length; i += LOTE) {
    const lote = textos.slice(i, i + LOTE);
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: MODELO_EMB, input: lote }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
    }
    const json = await res.json();
    salida.push(...json.data.map(d => d.embedding));
    process.stdout.write(`\r  embeddings: ${salida.length}/${textos.length}`);
  }
  process.stdout.write('\n');
  return salida;
}

// ----------------------------------------------------------------- qdrant

function cabecerasQdrant() {
  const h = { 'Content-Type': 'application/json' };
  if (QDRANT_KEY) h['api-key'] = QDRANT_KEY;
  return h;
}

async function prepararColeccion() {
  if (RECREAR) {
    await fetch(`${QDRANT_URL}/collections/${COLECCION}`, {
      method: 'DELETE', headers: cabecerasQdrant(),
    });
    console.log(`  colección ${COLECCION} eliminada`);
  }

  const existe = await fetch(`${QDRANT_URL}/collections/${COLECCION}`, { headers: cabecerasQdrant() });
  if (existe.ok) {
    console.log(`  colección ${COLECCION} ya existe`);
    return;
  }

  const res = await fetch(`${QDRANT_URL}/collections/${COLECCION}`, {
    method: 'PUT',
    headers: cabecerasQdrant(),
    body: JSON.stringify({
      vectors: { size: DIMENSIONES, distance: 'Cosine' },
    }),
  });
  if (!res.ok) throw new Error(`Qdrant crear colección ${res.status}: ${await res.text()}`);
  console.log(`  colección ${COLECCION} creada`);
}

async function subir(chunks, vectores) {
  const LOTE = 100;
  for (let i = 0; i < chunks.length; i += LOTE) {
    const puntos = chunks.slice(i, i + LOTE).map((c, j) => ({
      id: i + j + 1,
      vector: vectores[i + j],
      // n8n (LangChain) espera el texto en `content` y los metadatos en `metadata`.
      payload: { content: c.texto, metadata: c.metadata },
    }));

    const res = await fetch(`${QDRANT_URL}/collections/${COLECCION}/points?wait=true`, {
      method: 'PUT',
      headers: cabecerasQdrant(),
      body: JSON.stringify({ points: puntos }),
    });
    if (!res.ok) throw new Error(`Qdrant upsert ${res.status}: ${await res.text()}`);
    process.stdout.write(`\r  subidos: ${Math.min(i + LOTE, chunks.length)}/${chunks.length}`);
  }
  process.stdout.write('\n');
}

// ------------------------------------------------------------------ main

async function main() {
  console.log('Construyendo chunks…');
  const chunks = await construirChunks();
  console.log(`  ${chunks.length} chunks desde ${Object.keys(MANUALES).length} manuales`);

  const porManual = {};
  for (const c of chunks) porManual[c.metadata.manual] = (porManual[c.metadata.manual] || 0) + 1;
  for (const [m, n] of Object.entries(porManual)) console.log(`    ${n.toString().padStart(3)}  ${m}`);

  const largos = chunks.map(c => c.texto.length);
  console.log(`  tamaño: min ${Math.min(...largos)}, medio ${Math.round(largos.reduce((a, b) => a + b, 0) / largos.length)}, max ${Math.max(...largos)} chars`);

  if (DRY) {
    console.log('\n--- muestra de los primeros 3 chunks ---\n');
    for (const c of chunks.slice(0, 3)) {
      console.log(`[${c.metadata.cita}]`);
      console.log(c.texto.slice(0, 400) + (c.texto.length > 400 ? '…' : ''));
      console.log('\n---\n');
    }
    console.log('Dry run: no se subió nada.');
    return;
  }

  if (!OPENAI_KEY) throw new Error('Falta OPENAI_API_KEY');

  console.log('\nPreparando Qdrant…');
  await prepararColeccion();

  console.log('\nGenerando embeddings…');
  const vectores = await embeber(chunks.map(c => c.texto));

  console.log('\nSubiendo a Qdrant…');
  await subir(chunks, vectores);

  console.log(`\nListo. ${chunks.length} chunks indexados en "${COLECCION}".`);
}

main().catch(err => {
  console.error('\nError:', err.message);
  process.exit(1);
});
