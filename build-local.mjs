/**
 * Genera workflow-local-solo-arbol.json: el chatbot con el árbol embebido,
 * sin RAG, sin credenciales y sin servicios externos. Importás y funciona.
 *
 *   node build-local.mjs
 *
 * Volvé a correrlo cada vez que edites nodes.json o motor.js, para
 * regenerar el workflow con los cambios.
 */

import { readFile, writeFile } from 'node:fs/promises';

const arbol = JSON.parse(await readFile('./nodes.json', 'utf8'));
const motorFuente = await readFile('./motor.js', 'utf8');

// Credencial de n8n que guarda el secret token (tipo httpHeaderAuth).
// El valor del token NO vive acá: está en .env y se carga con
// "node cargar-credencial.mjs". Acá solo referenciamos la credencial.
const CRED_ID = 'valledata-token';
const CRED_NOMBRE = 'ValleDATA — Secret Token';
const HEADER_TOKEN = 'X-API-Key';

// El motor en motor.js lee el árbol de $input.first().json (para poder
// probarlo también contra el nodo HTTP en una eventual versión con RAG).
// Acá lo embebemos directamente en el código.
const motorLocal = motorFuente.replace(
  'const arbol   = $input.first().json;',
  `// Árbol embebido — generado por build-local.mjs desde nodes.json.\n` +
  `// NO editar acá: editá nodes.json y volvé a correr "node build-local.mjs".\n` +
  `const arbol   = ${JSON.stringify(arbol)};`
);

if (motorLocal === motorFuente) {
  throw new Error('No se pudo embeber el árbol: cambió la línea que se reemplaza en motor.js.');
}

// Nodo final: entrega título, texto y botones por separado (sin aplanar a
// lista numerada) para que el widget propio (widget/valledata-chat.js)
// los renderice como botones clickeables de verdad. El usuario nunca
// escribe texto libre — solo hace clic.
const respuestaLocal = `const r = $input.first().json;

let texto = r.texto || '';
if (r.aviso) {
  texto = 'No entendí esa opción. Elegí una de las siguientes:\\n\\n' + texto;
}

return [{
  json: {
    titulo: r.titulo || '',
    texto,
    url: r.url || null,
    botones: r.botones || [],
    nodo: r.nodo || null,
    via: r.via || 'arbol',
  }
}];`;

const wf = {
  name: 'ValleDATA — Asistente (árbol de opciones)',
  nodes: [
    {
      // Nodo Webhook común, no chatTrigger. Dos razones:
      //   1. chatTrigger NO expone los headers al flujo (solo manda el body),
      //      así que no habría forma de leer el token.
      //   2. chatTrigger solo soporta basicAuth; el Webhook común soporta
      //      headerAuth, que es exactamente "un secret token en un header".
      // n8n valida el token y responde 403 ANTES de ejecutar el workflow.
      parameters: {
        httpMethod: 'POST',
        path: 'valledata-local',
        authentication: 'headerAuth',
        responseMode: 'lastNode',
        options: {
          allowedOrigins: '*',   // CORS abierto: hace falta para el widget embebido en otro dominio
        },
      },
      id: 'trigger-chat',
      name: 'Chat entrante',
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2,
      position: [-400, 300],
      webhookId: 'valledata-local',
      credentials: {
        httpHeaderAuth: { id: CRED_ID, name: CRED_NOMBRE },
      },
    },
    {
      parameters: { jsCode: motorLocal },
      id: 'motor-arbol',
      name: 'Motor del árbol',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-140, 300],
      notes: 'Árbol embebido. Para cambiarlo: editá nodes.json o motor.js y corré "node build-local.mjs".',
    },
    {
      parameters: { jsCode: respuestaLocal },
      id: 'respuesta',
      name: 'Respuesta al widget',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [120, 300],
    },
  ],
  connections: {
    'Chat entrante': { main: [[{ node: 'Motor del árbol', type: 'main', index: 0 }]] },
    'Motor del árbol': { main: [[{ node: 'Respuesta al widget', type: 'main', index: 0 }]] },
  },
  settings: { executionOrder: 'v1' },
  pinData: {},
  tags: [{ name: 'ValleDATA' }],
};

await writeFile('./workflow-local-solo-arbol.json', JSON.stringify(wf, null, 2) + '\n');

// Verificación: el motor tiene que compilar y el árbol estar completo adentro.
new Function('$input', '$', '$getWorkflowStaticData', wf.nodes[1].parameters.jsCode);
new Function('$input', wf.nodes[2].parameters.jsCode);
const tam = Math.round(JSON.stringify(wf).length / 1024);
console.log(`workflow-local-solo-arbol.json generado (${tam} KB)`);
console.log(`  ${Object.keys(arbol.nodos).length} nodos del árbol embebidos`);
console.log('  navegación pura por botones — sin texto libre, sin IA');
