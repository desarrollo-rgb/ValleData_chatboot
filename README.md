# Asistente virtual ValleDATA

## Visión General

Asistente conversacional del portal de datos abiertos de la Gobernación del Valle del Cauca. Funciona **como un IVR telefónico**: muestra un menú, el usuario elige una opción haciendo clic en un botón, y el bot lo lleva por un árbol de decisiones hasta la respuesta. **No hay caja de texto, no se escribe nada.**

No usa ningún modelo de lenguaje: es 100% reglas. Eso lo hace gratis de operar, determinista (la respuesta que da es exactamente la que un humano escribió) y auditable — cada respuesta cita la sección del manual de la que salió.

Se despliega como un **workflow de n8n** de tres nodos que expone un endpoint HTTP autenticado con token. Lo consume un **widget propio en JavaScript** que se embebe en el portal, pero cualquier aplicación puede consultarlo como API.

| | |
|---|---|
| Contenido | 132 nodos de árbol, 9 ramas, máximo 4 niveles de profundidad |
| Fuentes | 7 manuales de usuario + 5 documentos de capacitación |
| Runtime | n8n 2.31.4 (`n8n-nodes-base.webhook` + 2× `n8n-nodes-base.code`) |
| Autenticación | Header `X-API-Key` validado por n8n antes de ejecutar el workflow |
| Dependencias del widget | Ninguna. Vanilla JS, sin build, sin CDN |
| Latencia típica | 100–150 ms |

---

## Arquitectura

### El workflow es un artefacto generado, no una fuente

Este es el concepto central del repositorio. **Nunca se edita el workflow en la interfaz de n8n** — se edita el contenido y el código en el repo, se regenera el JSON y se reimporta. Cualquier cambio hecho en la UI de n8n se pierde en el siguiente build.

```
nodes.json      (contenido: los 132 nodos del árbol)
motor.js        (lógica de ruteo)
      │
      └── node build-local.mjs
                  │
                  ▼
      workflow-local-solo-arbol.json   (3 nodos de n8n, 145 KB)
                  │
                  ▼ import + activar + reiniciar
              n8n en el servidor
                  │
                  ▼ POST /webhook/valledata-local  (X-API-Key)
      widget/valledata-chat.js  ·  CKAN  ·  cualquier app
```

`build-local.mjs` embebe el árbol reemplazando **literalmente** la línea `const arbol   = $input.first().json;` de [`motor.js`](motor.js) por el JSON serializado. Si esa línea cambia — espaciado incluido — el build aborta a propósito. El código del nodo "Respuesta al widget" vive como string dentro de `build-local.mjs`, no como archivo aparte.

### Los tres nodos de n8n

| Nodo | Tipo | Función |
|---|---|---|
| **Chat entrante** | `n8n-nodes-base.webhook` v2 | Recibe el POST y valida el header `X-API-Key`. Rechaza con 403 antes de ejecutar nada más. |
| **Motor del árbol** | `n8n-nodes-base.code` v2 | Decide a qué nodo del árbol ir. Contiene `motor.js` con los 132 nodos embebidos. |
| **Respuesta al widget** | `n8n-nodes-base.code` v2 | Devuelve `{ titulo, texto, url, botones, nodo, via }` en JSON. No aplana nada a texto. |

> **Por qué Webhook y no el `chatTrigger` de langchain.** El `chatTrigger` **no expone los headers** al flujo — su output es `[{ json: bodyData }]`, solo el cuerpo — así que un token en un header nunca llegaría al motor. Además solo soporta `basicAuth`, no tokens. El Webhook común soporta `headerAuth`, que es exactamente un secret token en un header.
>
> Consecuencia: la URL **no lleva el sufijo `/chat`** que agregaba el `chatTrigger`. Es `/webhook/valledata-local` a secas. Y el nodo entrega `{ headers, params, query, body }`, por lo que `motor.js` lee del sub-objeto `body`.

### Ruteo (`motor.js`)

Cuatro casos, evaluados en orden. Cada respuesta se etiqueta con el campo `via`, que sirve para diagnosticar:

| # | Entrada | Destino | `via` |
|---|---|---|---|
| 1 | `__nav__:<id>` | Ese nodo exacto del árbol | `boton` |
| 2 | `2`, `opción 3`, `n° 4` | La opción N del último nodo mostrado | `numero` / `numero-invalido` |
| 3 | Vacío, o un saludo | `menu_principal` | `saludo` |
| 4 | Cualquier otra cosa | Repite el nodo actual con aviso | `no-entendido` |

En uso normal desde el widget **solo se disparan el 1 y el 3**: al abrir el chat manda `chatInput: ""` (caso 3) y después cada clic manda `__nav__:<id>` (caso 1). Los casos 2 y 4 son fallback defensivo por si alguien le pega al webhook directamente.

> **Estado:** el motor guarda el último nodo mostrado en `$getWorkflowStaticData('global')`, que es una variable **global compartida por todos los usuarios** y vive en el proceso de n8n. No afecta la navegación por botones — que es determinista y autocontenida — pero sí los casos 2 y 4. Con más de una instancia de n8n habría que moverlo a Redis o eliminarlo.

---

## El árbol de contenido (`nodes.json`)

Es la fuente de verdad del contenido y **el único archivo que se edita para cambiar lo que dice el bot**. 167 KB, 132 nodos.

### Las 9 ramas

| # | Rama | Nodo raíz | Alcance | Origen |
|---|---|---|---|---|
| 1 | Buscar datos | `buscar_root` | 53 | Manuales de usuario |
| 2 | Descargar o ver un archivo | `descargar_root` | 40 | Manuales de usuario |
| 3 | Entender los datos | `entender_root` | 48 | Manuales de usuario |
| 4 | No encuentro lo que busco | `pedir_root` | 13 | Manuales de usuario |
| 5 | Mi cuenta y acceso | `cuenta_root` | 36 | Manuales de usuario |
| 6 | Publicar datos (soy funcionario) | `publicar_root` | 26 | Manuales de usuario |
| 7 | Cosecha / federación municipal | `harvest_root` | 9 | Manuales de usuario |
| 8 | Accesibilidad del portal | `acces_root` | 8 | Manuales de usuario |
| 9 | Formación y normativa | `formacion_root` | 105 | Temáticas de capacitación |

El "alcance" es el cierre transitivo siguiendo los `next`, no nodos exclusivos: **el árbol es un grafo, no un árbol puro**. 41 nodos tienen más de un padre y varios hubs se reusan mucho (`panel_sistema` desde 11 padres, `contacto` desde 6). Por eso la suma de las ramas supera 132.

La rama 9 está dirigida a funcionarios municipales, no a ciudadanos: responde "cómo gestiono datos abiertos en mi alcaldía", mientras las otras ocho responden "cómo hago X en el portal".

### Anatomía de un nodo

```json
"descargar_archivo": {
  "tipo": "pasos",
  "titulo": "Descargar un archivo",
  "texto": "Podés bajar cualquier recurso a tu equipo.",
  "pasos": ["Abrí el conjunto de datos.", "Elegí el recurso.", "Hacé clic en «Descargar»."],
  "nota": "Si el archivo pesa más de 100 MB, conviene usar la API.",
  "opciones": [
    { "label": "Volver al menú", "next": "menu_principal" }
  ],
  "roles": ["editor"],
  "src": "Guía del Ciudadano §6"
}
```

| Campo | Presencia | Función |
|---|---|---|
| `tipo` | 132/132 | `menu` (18), `respuesta` (65), `pasos` (47), `sistema` (2). Solo cambia si los `pasos` se numeran o van con viñeta. |
| `titulo` | 132/132 | Encabezado en negrita de la burbuja |
| `texto` | 132/132 | Cuerpo. Admite `**negrita**` y tablas markdown |
| `opciones` | 132/132 | Los botones. `label` es lo que se ve, `next` el id destino |
| `src` | 130/132 | Trazabilidad a la sección de origen. Solo faltan los 2 nodos de sistema |
| `nota` | 82/132 | Se renderiza como recuadro destacado. Para la consecuencia práctica, no para repetir el texto |
| `roles` | 76/132 | **Metadato documental — el motor no lo lee.** Sirve para saber a quién aplica |
| `pasos` | 72/132 | Lista. Cada paso es una frase completa |
| `url` | 3/132 | Enlace externo, se muestra bajo el texto |
| `kw` | 75/132 | **Residuo** del clasificador de texto libre eliminado. Ignorar, no agregar a nodos nuevos |

### Reglas al escribir contenido

- **`"Volver al menú"` va siempre como última opción**, apuntando a `menu_principal`. Los 59 nodos sin salida hacia adelante lo tienen. No puede haber callejones sin salida.
- **Español latinoamericano neutro, con tuteo.** "Puedes descargar", "Completa el formulario". Es el registro de los manuales del portal. Nada de voseo rioplatense ("podés", "presioná", "acá") ni de "usted".
- **Terminología del portal, nunca la de CKAN**: se dice **Dependencia** (no "organización") y **Temática** (no "grupo"). Está declarado en `meta.nota_glosario`.
- **Las tablas markdown van solo en `texto`.** En `pasos` y `nota` no funcionan porque el motor le antepone `**n.**`, `• ` o `> ` a cada línea y rompe el formato. Hay un chequeo para esto (ver Validación).
- **Enlazar en vez de duplicar.** Antes de escribir un nodo sobre un tema, buscar si ya existe y referenciarlo. Si no, el bot da dos respuestas distintas según por dónde entró el usuario.
- Largos de referencia: `texto` mediana 162 caracteres (máx. 844); `pasos` mediana 4 ítems (máx. 12); `nota` mediana 164 caracteres; los menús tienen entre 6 y 10 opciones.

---

## Autenticación

El webhook exige el header **`X-API-Key`**. n8n lo valida y responde **403 antes de ejecutar el workflow** — un pedido rechazado no consume ejecución ni escribe en la base (verificado: 30 pedidos rechazados = 0 bytes de crecimiento).

```
.env  (SECRET, gitignoreado)
   │
   └── node cargar-credencial.mjs
             │  importa como credencial httpHeaderAuth id=valledata-token
             ▼
      n8n (cifrado con N8N_ENCRYPTION_KEY)
             │
             ▼  el nodo Webhook la referencia por id
      valida X-API-Key en cada request
```

El token **nunca se escribe en un archivo versionado**. `build-local.mjs` solo referencia la credencial por id; el valor vive en `.env`, que está en `.gitignore`.

> **Un token dentro del widget no es secreto.** El widget corre en el navegador del ciudadano: cualquiera abre las herramientas de desarrollo y lo lee. Sirve para frenar tráfico casual y para poder rotar la clave si abusan, pero **no es una barrera real** contra alguien decidido. Donde el token sí protege es en integraciones **servidor a servidor** — el backend de CKAN u otra aplicación consultando el asistente. Si se necesita una barrera real para el widget público, el camino es que el portal exponga un proxy propio y que ese proxy, del lado servidor, guarde el token.

---

## Estructura del Repositorio

```
valledata-chatbot/
├── nodes.json                      # EL ÁRBOL — 132 nodos. Es lo que se edita para cambiar el contenido
├── motor.js                        # Lógica de ruteo (fuente de verdad, NO se edita en n8n)
├── build-local.mjs                 # Genera el workflow embebiendo nodes.json + motor.js
├── cargar-credencial.mjs           # Sube el SECRET de .env a n8n como credencial
├── workflow-local-solo-arbol.json  # ARTEFACTO GENERADO — no editar a mano
│
├── .env                            # SECRET. Gitignoreado
├── .env.ejemplo                    # Plantilla versionada
│
├── widget/
│   ├── valledata-chat.js           # El widget que se embebe en el portal. Sin dependencias
│   └── prueba-render.html          # Banco de pruebas del renderizado. NO necesita n8n
│
├── prueba-web.html                 # Página que simula el portal, para probar contra un n8n local
│
├── ARBOL.md                        # El árbol en forma visual, con trazabilidad a cada sección
├── CLAUDE.md                       # Guía para agentes de IA que trabajen en el repo
│
├── manuales/                       # Los 7 manuales en texto. Referencia para escribir nodos
├── ingesta/                        # Indexador a Qdrant de la variante RAG. NO se usa
├── motor-n8n-fix.js                # Motor anterior con clasificador por palabras clave. Histórico
└── workflow-valledata-chatbot.json # Variante con RAG (Qdrant + OpenAI + Claude). NO se despliega
```

Los últimos tres **no forman parte del flujo activo**. Corresponden a una versión anterior que interpretaba texto libre con RAG; se conservan como referencia por si en el futuro se retoma esa línea.

---

## Levantar en un servidor

### 1. n8n con Docker

```yaml
# docker-compose.yml
services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    ports: ["5678:5678"]          # en producción, quitar y poner Nginx adelante
    environment:
      - N8N_HOST=asistente.valledata.gov.co
      - WEBHOOK_URL=https://asistente.valledata.gov.co/
      - N8N_PROTOCOL=https
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - GENERIC_TIMEZONE=America/Bogota

      # CRÍTICO — sin esto la base crece sin control, ver Notas Técnicas
      - EXECUTIONS_DATA_SAVE_ON_SUCCESS=none
      - EXECUTIONS_DATA_SAVE_ON_ERROR=all
      - EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=168

      # el editor pide usuario y contraseña
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${N8N_USER}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
    volumes: ["n8n_data:/home/node/.n8n"]

volumes:
  n8n_data:
```

```bash
docker compose up -d
```

> **`N8N_ENCRYPTION_KEY` es la llave con la que n8n cifra las credenciales.** Si se pierde, hay que volver a cargar el token. Si cambia, las credenciales existentes dejan de poder descifrarse.

### 2. Generar y cargar el token

```bash
cp .env.ejemplo .env

# generar un token de 256 bits
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
# pegar el resultado en SECRET= dentro de .env

node cargar-credencial.mjs
docker restart n8n
```

`cargar-credencial.mjs` escribe un archivo temporal con el token en claro, lo copia al contenedor, corre `n8n import:credentials` y borra el temporal de ambos lados. n8n lo cifra al importarlo.

### 3. Generar e importar el workflow

```bash
node build-local.mjs
```

En la interfaz de n8n: **Workflows → ⋯ → Import from File →** `workflow-local-solo-arbol.json`, después el botón **Active**.

Para hacerlo sin interfaz, por línea de comandos, hay que agregarle un `id` al JSON (el CLI lo exige) y reiniciar después:

```bash
# reemplazar <WORKFLOW_ID> por el id que ya tiene el workflow en n8n
node -e "const fs=require('fs');const wf=JSON.parse(fs.readFileSync('workflow-local-solo-arbol.json','utf8'));wf.id='<WORKFLOW_ID>';fs.writeFileSync('_import.json',JSON.stringify(wf));"
docker cp _import.json n8n:/tmp/wf.json && rm -f _import.json
docker exec n8n n8n import:workflow --input=/tmp/wf.json
docker exec n8n n8n update:workflow --id=<WORKFLOW_ID> --active=true
docker restart n8n
```

> **El reinicio no es opcional.** Ver Notas Técnicas → "El webhook devuelve 404 aunque el workflow figure activo".

### 4. Verificar

```bash
SECRET=$(grep '^SECRET=' .env | cut -d= -f2-)
URL=https://asistente.valledata.gov.co/webhook/valledata-local

# sin token → debe rechazar
curl -s -o /dev/null -w "%{http_code}\n" -X POST "$URL" \
  -H "Content-Type: application/json" -d '{"chatInput":""}'
# → 403

# con token → debe devolver el menú principal
curl -s -X POST "$URL" \
  -H "Content-Type: application/json" -H "X-API-Key: $SECRET" \
  -d '{"chatInput":""}'
# → {"titulo":"Menú principal","texto":"...","botones":[...],"nodo":"menu_principal","via":"saludo"}
```

### 5. Poner Nginx adelante (producción)

n8n **no tiene límite de tasa**. Para un endpoint público hace falta un proxy que lo provea, además de HTTPS:

```nginx
limit_req_zone $binary_remote_addr zone=bot:10m rate=30r/m;

server {
    listen 443 ssl http2;
    server_name asistente.valledata.gov.co;

    ssl_certificate     /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;

    # solo el webhook queda expuesto: el editor de n8n no
    location /webhook/valledata-local {
        limit_req zone=bot burst=10 nodelay;
        proxy_pass http://n8n:5678;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / { return 404; }
}
```

Con esto, el editor de n8n solo se alcanza por túnel SSH:

```bash
ssh -L 5678:localhost:5678 usuario@servidor    # después: http://localhost:5678
```

---

## Conectarse

### Como API

Un solo endpoint. Es una función pura: se le manda un id de nodo, devuelve su contenido.

```
POST /webhook/valledata-local
Content-Type: application/json
X-API-Key: <SECRET>

{ "chatInput": "__nav__:calidad_root" }
```

| Entrada (`chatInput`) | Qué devuelve |
|---|---|
| `""` (vacío) | El menú principal. Es como "abrir" la conversación |
| `"__nav__:<id>"` | El nodo con ese id |
| `"hola"`, `"menú"`, `"ayuda"` | El menú principal |

Respuesta:

```json
{
  "titulo": "Preparar un dato para publicar",
  "texto": "Antes de cargar un archivo a ValleDATA hay que limpiarlo...",
  "url": null,
  "botones": [
    { "label": "Anonimizar datos personales", "value": "__nav__:anonimizar_root" },
    { "label": "Qué puedo publicar y qué no",  "value": "__nav__:clasificacion_legal" }
  ],
  "nodo": "calidad_root",
  "via": "boton"
}
```

Cada `botones[].value` se manda tal cual como `chatInput` del siguiente pedido. **No hay sesión**: cada consulta lleva su propio header y se resuelve sola.

El campo `texto` puede traer un subconjunto de markdown: `**negrita**`, líneas que empiezan con `> ` (nota destacada) y tablas. Si el cliente no es el widget, tiene que renderizarlo o mostrarlo en crudo.

### Con el widget

`widget/valledata-chat.js` es autocontenido: sin dependencias, sin build, sin CDN. Se sirve junto con los estáticos del portal.

```html
<script src="/ruta/a/valledata-chat.js"></script>
<script>
  createValledataChat({
    webhookUrl: 'https://asistente.valledata.gov.co/webhook/valledata-local',
    token: 'EL_TOKEN',
    headerToken: 'X-API-Key',
    title: 'Asistente ValleDATA',
    subtitle: 'Te ayudo a encontrar y entender los datos del Valle',
  });
</script>
```

| Opción | Default | Qué hace |
|---|---|---|
| `webhookUrl` | — | Obligatoria. El endpoint |
| `token` | — | El secret. Si falta, el widget muestra el error de autenticación |
| `headerToken` | `X-API-Key` | Nombre del header |
| `title` / `subtitle` | `Asistente` / vacío | Encabezado del panel |

El widget crea una burbuja flotante abajo a la derecha. Al abrirla pide el menú principal automáticamente (`chatInput: ""`). Cada opción se renderiza como un `<button>` real que al hacer clic se deshabilita, para evitar doble envío.

### Probar en local

```bash
npx serve .
```

Abrir `prueba-web.html`. El token **no está escrito en ese archivo** (para no versionar un secreto): se pasa una vez por la barra de direcciones y queda guardado en el navegador.

```
http://localhost:3000/prueba-web.html?token=EL_SECRET_DEL_ENV
```

Para probar solo el renderizado —tablas, escapes, casos límite— sin levantar n8n, abrir `widget/prueba-render.html`: reemplaza `fetch` por una cola de casos de prueba y recorre siete escenarios con clics.

---

## Operación

### Cambiar lo que dice el bot

```bash
# 1. editar nodes.json
# 2. validar
node -e "const d=require('./nodes.json'),n=d.nodos;let b=[];for(const[i,x]of Object.entries(n))for(const o of(x.opciones||[]))if(!n[o.next])b.push(i+'->'+o.next);console.log(b.length?b:'OK')"
# 3. regenerar
node build-local.mjs
# 4. reimportar en n8n + reiniciar
```

### Validación antes de publicar

```bash
# Ningún botón apunta a un nodo inexistente
node -e "const d=require('./nodes.json'),n=d.nodos;let b=[];for(const[i,x]of Object.entries(n))for(const o of(x.opciones||[]))if(!n[o.next])b.push(i+'->'+o.next);console.log(b.length?b:'OK')"

# Ninguna tabla mal ubicada (en pasos o nota, donde se rompe)
node -e "const n=require('./nodes.json').nodos;const m=Object.entries(n).filter(([k,v])=>(v.pasos||[]).some(p=>/^\s*\|/.test(p))||/(^|\n)\s*\|/.test(v.nota||'')).map(([k])=>k);console.log(m.length?m:'OK')"

# Todos los nodos son alcanzables y tienen salida
node -e "const n=require('./nodes.json').nodos;let v=new Set(),c=['menu_principal'];while(c.length){const i=c.shift();if(v.has(i))continue;v.add(i);for(const o of(n[i].opciones||[]))c.push(o.next)}console.log('inalcanzables:',Object.keys(n).filter(k=>!v.has(k)));console.log('sin salida:',Object.entries(n).filter(([k,x])=>!(x.opciones||[]).length).map(([k])=>k))"
```

`_fallback` y `_handoff` aparecen siempre como inalcanzables: es correcto, son nodos de sistema a los que se llega por código, no por un botón.

### Recorrer todo el árbol contra el servidor

Prueba de humo completa: verifica que los 129 nodos navegables responden.

```bash
SECRET=$(grep '^SECRET=' .env | cut -d= -f2-)
URL=https://asistente.valledata.gov.co/webhook/valledata-local

node -e "const n=require('./nodes.json').nodos;require('fs').writeFileSync('_ids.txt',Object.keys(n).filter(k=>k[0]!=='_').join('\n'))"
fallos=0
while read -r id; do
  ok=$(curl -s -X POST "$URL" -H "Content-Type: application/json" -H "X-API-Key: $SECRET" \
       -d "{\"chatInput\":\"__nav__:$id\"}" \
       | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{const j=JSON.parse(d);process.stdout.write(j.nodo==='$id'?'ok':'MAL')}catch(e){process.stdout.write('ERR')}})")
  [ "$ok" != "ok" ] && { echo "FALLA $id"; fallos=$((fallos+1)); }
done < _ids.txt
rm -f _ids.txt
echo "fallos: $fallos"
```

### Rotar el token

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"   # pegar en .env
node cargar-credencial.mjs
docker restart n8n
# actualizar todos los clientes: widget del portal, integraciones
```

No hay período de gracia: apenas se reinicia n8n, el token viejo deja de funcionar.

### Diagnóstico

```bash
# ¿el workflow está activo?
docker exec n8n n8n list:workflow --active=true

# logs
docker logs n8n --since 10m

# tamaño de la base (ver Notas Técnicas si crece rápido)
docker exec n8n du -h /home/node/.n8n/database.sqlite

# ¿qué camino tomó una respuesta? — el campo "via"
curl -s -X POST "$URL" -H "X-API-Key: $SECRET" -H "Content-Type: application/json" \
  -d '{"chatInput":"__nav__:calidad_root"}' | grep -o '"via":"[^"]*"'
```

---

## Cómo Agregar una Rama Nueva

En este ejemplo se agrega una rama "Trámites" al menú principal.

### Paso 1 — Escribir los nodos

En `nodes.json`, dentro del objeto `nodos`, agregar el menú de la rama y sus hojas:

```json
"tramites_root": {
  "tipo": "menu",
  "titulo": "Trámites",
  "texto": "¿Qué necesitás hacer?",
  "opciones": [
    { "label": "Solicitar una certificación", "next": "tramite_certificacion" },
    { "label": "Volver al menú", "next": "menu_principal" }
  ],
  "src": "Manual de Trámites §1"
},
"tramite_certificacion": {
  "tipo": "pasos",
  "titulo": "Solicitar una certificación",
  "texto": "Se hace en línea, no hace falta ir presencialmente.",
  "pasos": [
    "Entrá a «Mi cuenta» y elegí «Solicitudes».",
    "Completá el formulario con el número de radicado.",
    "Descargá el comprobante."
  ],
  "nota": "El trámite demora hasta 15 días hábiles.",
  "opciones": [
    { "label": "Volver al menú", "next": "menu_principal" }
  ],
  "src": "Manual de Trámites §2.1"
}
```

Reglas: `"Volver al menú"` siempre última, sin campo `kw`, y si hace falta una tabla va dentro de `texto`.

### Paso 2 — Colgarla del menú principal

En el nodo `menu_principal`, agregar la opción **antes** de que la lista quede demasiado larga (hoy tiene 9; más de 10 botones no entran bien en el panel de 380 px):

```json
{ "label": "Trámites", "next": "tramites_root" }
```

### Paso 3 — Enlazar con lo que ya existe

Buscar nodos existentes que traten temas relacionados y enlazarlos en ambas direcciones, en lugar de duplicar contenido. Por ejemplo, si `cuenta_root` ya explica cómo entrar a "Mi cuenta", el nodo nuevo debería enlazar ahí en vez de repetir la explicación.

### Paso 4 — Validar, generar y desplegar

```bash
node -e "const d=require('./nodes.json'),n=d.nodos;let b=[];for(const[i,x]of Object.entries(n))for(const o of(x.opciones||[]))if(!n[o.next])b.push(i+'->'+o.next);console.log(b.length?b:'OK')"
node build-local.mjs
# importar en n8n, activar, reiniciar
```

### Paso 5 — Actualizar la documentación

- [`ARBOL.md`](ARBOL.md): agregar la rama al diagrama y a la tabla de cobertura
- Este README: la tabla de las 9 ramas y el conteo de nodos
- [`CLAUDE.md`](CLAUDE.md): el conteo de nodos

---

## Notas Técnicas

### El webhook devuelve 404 aunque el workflow figure activo

Es el problema operativo más frecuente. `n8n list:workflow --active=true` muestra el workflow, pero el webhook responde:

```json
{"code":404,"message":"The requested webhook \"POST valledata-local\" is not registered."}
```

**Causa:** n8n registra las rutas de webhook al arrancar y al activar desde la interfaz. Si se activa por CLI, o se reimporta un workflow que ya estaba activo, la base dice "activo" pero el proceso en memoria no tiene la ruta registrada.

**Solución:** `docker restart n8n`. Siempre, después de cualquier importación por CLI.

### La importación por CLI desactiva el workflow

`n8n import:workflow` imprime `Deactivating workflow "..."` y lo deja inactivo. Hay que reactivarlo explícitamente después de cada importación:

```bash
docker exec n8n n8n update:workflow --id=<ID> --active=true
docker restart n8n
```

### La importación por CLI exige un `id`

`build-local.mjs` genera el JSON sin campo `id`, porque la importación por interfaz no lo necesita. Por CLI falla con `SQLITE_CONSTRAINT: NOT NULL constraint failed: workflow_entity.id`. Hay que agregárselo antes (ver Levantar en un servidor → paso 3). Usar el id que el workflow ya tiene en n8n lo actualiza en lugar de crear un duplicado.

### La base de datos crece ~138 KB por consulta

**Medido:** la base pasó de 2,6 MB a 40,3 MB con unas 240 consultas de prueba.

**Causa:** n8n archiva una copia del workflow completo en cada ejecución, y el árbol de 132 nodos va embebido en el código del nodo. A mil consultas diarias son ~138 MB por día, unos 50 GB al año sobre SQLite.

**Solución:** las variables `EXECUTIONS_DATA_*` del docker-compose. Con `EXECUTIONS_DATA_SAVE_ON_SUCCESS=none` solo se guardan los errores.

**Dato útil:** los pedidos rechazados por token inválido **no cuentan**. Se verificó que 30 pedidos con 403 no hacen crecer la base ni un byte, porque n8n valida el header antes de ejecutar el workflow.

### Git Bash en Windows reescribe las rutas de Docker

`docker exec n8n ... --input=/tmp/wf.json` falla con `ENOENT: no such file or directory, open 'C:/Users/.../tmp/wf.json'`: Git Bash convierte `/tmp/...` a una ruta de Windows. Se desactiva con:

```bash
MSYS_NO_PATHCONV=1 docker exec n8n n8n import:workflow --input=/tmp/wf.json
```

### `docker cp` crea los archivos como root

n8n corre como el usuario `node`, que no puede borrar lo que `docker cp` dejó. El borrado del temporal necesita `-u root`:

```bash
docker exec -u root n8n rm -f /tmp/cred.json
```

`cargar-credencial.mjs` ya lo hace, y avisa si falla en vez de dejar el token en claro adentro del contenedor sin que nadie se entere.

### El widget solo renderiza tablas de 2 columnas cómodamente

El panel mide 380 px de ancho (menos en móvil), lo que deja ~348 px útiles. Con 2 columnas el renderizador usa ancho fijo 38 %/62 % y entra sin scroll. Con 3 o más agrega la clase `vd-tabla-ancha` y el contenedor se vuelve scrolleable en horizontal, en vez de achicar las columnas a 80 px ilegibles.

Para mostrar algo de 3 o 4 columnas conviene reescribirlo como lista o como "fichas" (una por fila, con las etiquetas en negrita).

El renderizador es un markdown-lite propio, no una librería: soporta `**negrita**`, `> cita` y tablas GFM. Escapa el HTML antes de aplicar cualquier patrón, así que el contenido no puede inyectar marcado.

### Por qué un widget propio y no `@n8n/chat`

El widget oficial de n8n solo renderiza texto y markdown: **no tiene soporte para botones generados dinámicamente** desde el JSON que devuelve el workflow. Como toda la navegación de este bot son botones, no servía.

La versión anterior lo resolvía aplanando las opciones a una lista numerada (`1. 2. 3…`) y pidiéndole al usuario que escribiera el número. Se reemplazó por botones reales para eliminar el margen de error al tipear.

### CORS

El nodo Webhook está configurado con `allowedOrigins: '*'`, necesario para que el widget funcione embebido en un dominio distinto al de n8n. Si el portal es el único consumidor, conviene restringirlo al dominio real en `build-local.mjs`.
