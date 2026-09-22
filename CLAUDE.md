# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

Chatbot del portal de datos abiertos ValleDATA (Gobernación del Valle del Cauca), implementado
como un workflow de n8n. Funciona como un IVR: el usuario ve un menú y elige una opción haciendo
clic en un botón — no hay caja de texto. **Sin IA, sin texto libre, sin credenciales.** La
versión en producción es la del árbol puro; la variante RAG existe pero no es la que se despliega.

El contenido del proyecto está en español (código, comentarios, docs) — mantené ese idioma.

## Comandos

```bash
node build-local.mjs        # regenera workflow-local-solo-arbol.json desde nodes.json + motor.js
node cargar-credencial.mjs  # carga el SECRET de .env a n8n como credencial httpHeaderAuth
```

Validar el árbol antes de publicar (que ningún `next` apunte a un nodo inexistente):

```bash
node -e "const d=require('./nodes.json'),n=d.nodos;let b=[];for(const[i,x]of Object.entries(n))for(const o of(x.opciones||[]))if(!n[o.next])b.push(i+'->'+o.next);console.log(b.length?b:'OK')"
```

Chequear que no haya tablas mal ubicadas (rompen el render):

```bash
node -e "const n=require('./nodes.json').nodos;const m=Object.entries(n).filter(([k,v])=>(v.pasos||[]).some(p=>/^\s*\|/.test(p))||/(^|\n)\s*\|/.test(v.nota||'')).map(([k])=>k);console.log(m.length?m:'OK')"
```

Probar el renderizado (tablas, escapes, regresión) sin levantar n8n: abrir
`widget/prueba-render.html` con `npx serve .` y recorrer los 7 casos.

No hay `package.json`, ni test runner, ni linter. `build-local.mjs` hace la única verificación
automática que existe: compila ambos bloques de código con `new Function(...)` y aborta si el
árbol no se pudo embeber. Probar el flujo real requiere n8n (importar el JSON generado) y abrir
`prueba-web.html` (con el `webhookUrl` del script apuntando a ese n8n) contra el widget propio
en `widget/valledata-chat.js`.

## Arquitectura

El pipeline de build es el punto clave: **el workflow de n8n es un artefacto generado, no una
fuente**. Nunca editar `workflow-local-solo-arbol.json` a mano ni pegar código en la UI de n8n —
se pierde en el siguiente build.

```
nodes.json  (contenido: 132 nodos del árbol)
motor.js    (lógica de ruteo)
     │
     └─ build-local.mjs ──► workflow-local-solo-arbol.json  (3 nodos n8n)

widget/valledata-chat.js   (widget propio embebido en el portal, o cargado por prueba-web.html)
widget/prueba-render.html  (banco de pruebas del renderizado — no necesita n8n)
```

`build-local.mjs` embebe el árbol reemplazando **literalmente** la línea
`const arbol   = $input.first().json;` de [motor.js](motor.js#L11) por el JSON serializado. Si esa
línea cambia (espaciado incluido), el build lanza error a propósito. El nodo "Respuesta al widget"
vive como string dentro de `build-local.mjs`, no como archivo aparte.

### Autenticación

El trigger es un nodo **`n8n-nodes-base.webhook` con `authentication: 'headerAuth'`**, no el
`chatTrigger` de langchain. La razón es doble: el `chatTrigger` **no expone los headers** al
flujo (su output es `[{ json: bodyData }]`, solo el cuerpo), y además solo soporta `basicAuth`.
Con el Webhook común, n8n valida el header `X-API-Key` y responde **403 antes de ejecutar el
workflow** — verificado: 30 pedidos rechazados no hacen crecer la base ni un byte.

Consecuencias de ese cambio, si tocás esto:
- La URL **no lleva el sufijo `/chat`**: es `/webhook/valledata-local` a secas.
- El nodo entrega `{ headers, params, query, body }`, así que `motor.js` lee de `.body`
  (con fallback al objeto plano, por si se reimporta un workflow viejo).
- El token vive en `.env` (`SECRET`) y se carga con `node cargar-credencial.mjs`, que lo
  importa como credencial `httpHeaderAuth` con id `valledata-token`. **Nunca hardcodearlo** en
  `build-local.mjs` ni en archivos versionados.

### Ruteo (motor.js)

Cuatro casos, en orden, cada uno etiqueta la salida con un campo `via`. En uso normal desde el
widget solo se disparan el 1 y el 3 — no hay caja de texto, así que nadie puede escribir un
número ni texto libre. Los casos 2 y 4 son fallback defensivo por si algo le pega al webhook
directamente.

1. `__nav__:<id>` → clic de botón (`via: boton`)
2. `^\d{1,2}$` (con prefijos "opción", "n°") → índice contra las opciones del último nodo (`numero` / `numero-invalido`)
3. saludo o mensaje vacío → `menu_principal` (`saludo`) — así arranca el widget al abrirse, mandando `chatInput: ''`
4. cualquier otra cosa → repite el nodo actual con aviso (`no-entendido`)

El estado de sesión es sólo `memoria.ultimoNodo` en `$getWorkflowStaticData('global')`. Vive en
el proceso de n8n: **con más de una instancia habría que moverlo a Redis/DB**. Además es global,
no por sesión — un único `ultimoNodo` compartido.

El nodo "Respuesta al widget" no aplana nada: devuelve `{ titulo, texto, url, botones, nodo, via }`
tal cual. `widget/valledata-chat.js` (vanilla JS, sin dependencias, sin build) es el que renderiza
`botones[]` como `<button>` reales — reemplaza a `@n8n/chat`, que solo sabe mostrar texto/markdown
y no tiene soporte para botones dinámicos. Al abrirse manda `chatInput: ''` para pedir el menú
principal en vivo; cada clic manda el `value` del botón (`__nav__:<id>`) como si fuera un mensaje.

### nodes.json

Fuente de verdad del contenido. Cada nodo:

```json
"descargar_archivo": {
  "titulo": "…", "texto": "…",
  "pasos": ["…"],            // "tipo": "pasos" los numera; si no, viñetas
  "nota": "…",               // se renderiza como blockquote
  "opciones": [{ "label": "…", "next": "otro_nodo" }],
  "roles": ["editor"],       // metadato documental — el motor NO lo lee
  "src": "Guía del Ciudadano §6"   // trazabilidad al manual
}
```

Agregar una rama = agregar el nodo y referenciarlo desde el `next` de una opción existente.
El campo `kw` (palabras clave) es residuo del clasificador de texto libre eliminado; ignorarlo
y **no agregarlo a nodos nuevos**. Debe existir siempre un `_fallback` y un `menu_principal`.
`"Volver al menú"` va siempre como **última** opción.

**Las tablas markdown van sólo en `texto`.** En `pasos` y `nota` no funcionan: `motor.js` les
antepone `**n.**`, `• ` o `> ` a cada línea. El widget renderiza bien las de 2 columnas; con 3
o más agrega scroll horizontal. Preferir 2 columnas con encabezados cortos (~20 caracteres en
la primera). Hay un chequeo para esto en la sección de comandos.

**Enlazar en vez de duplicar.** El árbol es un grafo: muchos nodos tienen varios padres. Antes
de escribir un nodo sobre un tema, buscar si ya existe (p. ej. `formatos`, `licencias`,
`marco_normativo`, `metadatos`) y enlazarlo, para que el bot no dé dos respuestas distintas
según por dónde entró el usuario.

`meta.nota_glosario` marca una regla de terminología del portal que el texto de los nodos debe
respetar: se dice **Dependencia** (no "organización") y **Temática** (no "grupo").

### Registro del idioma

**Español latinoamericano neutro, con tuteo.** "Puedes descargar", "Completa el formulario",
"Si necesitas ayuda". Es el registro que usan los 7 manuales del portal (222 formas de tuteo
contra 64 de usted, casi todas impersonales), así que el bot habla como el portal.

**No usar voseo rioplatense.** Hasta septiembre de 2026 el árbol entero estaba escrito así
("querés", "presioná", "revisala", "acá") — 91 nodos, unos 360 reemplazos para corregirlo. Es
un error de localización: el destinatario es la Gobernación del Valle del Cauca, Colombia.

Formas prohibidas y su equivalente:

| No | Sí |
|---|---|
| podés, tenés, querés, necesitás | puedes, tienes, quieres, necesitas |
| presioná, elegí, abrí, hacé | presiona, elige, abre, haz |
| revisala, elegilo, fijate | revísala, elígelo, fíjate |
| acá, allá | aquí, allí |
| prolijo, plata (dinero) | ordenado, recursos |

Ojo con los enclíticos: al pasar a tuteo **llevan tilde** (revisala → revísala). Y con los
irregulares: hacé → **haz** (no "hace"), andá → **ve**, mostrá → **muestra**.

### Archivos que no forman parte del flujo activo

- `motor-n8n-fix.js` — motor anterior con clasificador por palabras clave y umbral de similitud. Histórico.
- `workflow-valledata-chatbot.json` — variante con RAG (Qdrant + embeddings OpenAI + Claude). Requiere credenciales; no se genera desde el build.
- `ingesta/ingesta.mjs` — indexa `manuales/` en Qdrant para esa variante RAG (`OPENAI_API_KEY`, `QDRANT_URL`).
- `manuales/` — los 7 manuales en texto, referencia para escribir nodos. Ya no se indexan en el flujo activo.
- `ARBOL.md` — vista del árbol con la sección de manual de cada hoja, más 8 inconsistencias detectadas en los `.docx` originales. Actualizarlo cuando cambie la estructura de `nodes.json`.
