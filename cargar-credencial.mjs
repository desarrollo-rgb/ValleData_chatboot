/**
 * Carga el secret token de .env a n8n como credencial httpHeaderAuth.
 *
 *   node cargar-credencial.mjs
 *
 * Hay que correrlo UNA VEZ antes de importar el workflow, y de nuevo cada
 * vez que se rote el token. n8n cifra el valor al importarlo, usando su
 * N8N_ENCRYPTION_KEY: en el archivo temporal viaja en claro, por eso se
 * borra apenas termina.
 *
 * Variables que lee de .env:
 *   SECRET   el token que van a tener que mandar los clientes
 */

import { readFile, writeFile, unlink } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const CRED_ID = 'valledata-token';
const CRED_NOMBRE = 'ValleDATA — Secret Token';
const HEADER_TOKEN = 'X-API-Key';
const CONTENEDOR = process.env.N8N_CONTENEDOR || 'n8n';
const TEMPORAL = './_credencial.json';

// ------------------------------------------------------------- leer .env
let env;
try {
  env = await readFile('./.env', 'utf8');
} catch {
  console.error('No encontré .env. Crealo con una línea:  SECRET=tu-token-largo');
  process.exit(1);
}

const secret = Object.fromEntries(
  env
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')];
    })
).SECRET;

if (!secret) {
  console.error('.env no tiene SECRET. Agregá una línea:  SECRET=tu-token-largo');
  process.exit(1);
}
if (secret.length < 24) {
  console.warn(`⚠  El token tiene ${secret.length} caracteres. Para producción conviene 32 o más.`);
}

// --------------------------------------------------- armar e importar
const credencial = [
  {
    id: CRED_ID,
    name: CRED_NOMBRE,
    type: 'httpHeaderAuth',
    data: { name: HEADER_TOKEN, value: secret },
  },
];

await writeFile(TEMPORAL, JSON.stringify(credencial, null, 2));

try {
  execFileSync('docker', ['cp', TEMPORAL, `${CONTENEDOR}:/tmp/cred.json`], { stdio: 'pipe' });
  const salida = execFileSync(
    'docker',
    ['exec', CONTENEDOR, 'n8n', 'import:credentials', '--input=/tmp/cred.json'],
    { encoding: 'utf8', stdio: 'pipe' }
  );
  if (!/Successfully imported|imported/i.test(salida)) {
    console.error(salida);
    throw new Error('n8n no confirmó la importación');
  }
  // Borrar el archivo en claro también de adentro del contenedor. Lo creó
  // "docker cp" como root, así que hay que borrarlo como root: el usuario
  // node con el que corre n8n no tiene permiso sobre él.
  try {
    execFileSync('docker', ['exec', '-u', 'root', CONTENEDOR, 'rm', '-f', '/tmp/cred.json'], {
      stdio: 'pipe',
    });
  } catch {
    console.warn('⚠  No pude borrar /tmp/cred.json dentro del contenedor.');
    console.warn('   Tiene el token en claro. Borralo a mano:');
    console.warn(`   docker exec -u root ${CONTENEDOR} rm -f /tmp/cred.json`);
  }

  console.log(`Credencial «${CRED_NOMBRE}» cargada en n8n.`);
  console.log(`  header:  ${HEADER_TOKEN}`);
  console.log(`  token:   ${secret.slice(0, 3)}${'•'.repeat(Math.max(secret.length - 6, 3))}${secret.slice(-3)}  (${secret.length} caracteres)`);
  console.log('\nReiniciá n8n para que tome la credencial:  docker restart ' + CONTENEDOR);
} finally {
  await unlink(TEMPORAL).catch(() => {});
}
