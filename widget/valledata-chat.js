/**
 * Widget propio del asistente ValleDATA — sin caja de texto, solo botones.
 *
 * Reemplaza a @n8n/chat: esa librería solo renderiza texto/markdown y no
 * tiene soporte para botones dinámicos generados desde el JSON que devuelve
 * el workflow. Este archivo es autocontenido (sin dependencias, sin build):
 * crea su propio DOM y sus propios estilos, y llama al webhook del nodo
 * "Chat entrante" pasándole { action, sessionId, chatInput }.
 *
 * El usuario nunca escribe: al abrir el chat se pide el menú principal
 * automáticamente (chatInput vacío) y de ahí en más solo hace clic en las
 * opciones. Cada clic manda `botón.value` (que el motor interpreta como
 * "__nav__:<id-del-nodo>") como si fuera un chatInput.
 *
 * Uso:
 *   <script src="valledata-chat.js"></script>
 *   <script>
 *     createValledataChat({
 *       webhookUrl: 'https://asistente.valledata.gov.co/webhook/valledata-local',
 *       title: 'Asistente ValleDATA',
 *       subtitle: 'Te ayudo a encontrar y entender los datos del Valle',
 *     });
 *   </script>
 */
(function () {
  'use strict';

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function formatearLinea(linea) {
    return escapeHtml(linea).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  // ------------------------------------------------------------- tablas
  // Una tabla se reconoce solo si hay DOS líneas seguidas: una fila que
  // arranca con "|" y, justo debajo, la separadora (|---|---|, con ":"
  // opcionales para la alineación). Así una línea suelta que casualmente
  // tenga pipes sigue saliendo como párrafo y no se convierte en tabla.
  //
  // OJO: las tablas solo funcionan en el campo "texto" de nodes.json.
  // En "pasos" y en "nota" no, porque motor.js le antepone "**n.**",
  // "• " o "> " a cada línea y rompe el formato.

  function esFilaTabla(linea) {
    if (typeof linea !== 'string') return false;
    var t = linea.trim();
    return t.charAt(0) === '|' && t.length > 1;
  }

  // Parte una fila en celdas respetando los pipes escapados ("\|").
  function partirFila(linea) {
    var t = linea.trim();
    if (t.charAt(0) === '|') t = t.slice(1);
    if (t.charAt(t.length - 1) === '|' && t.charAt(t.length - 2) !== '\\') {
      t = t.slice(0, -1);
    }
    var celdas = [];
    var actual = '';
    for (var i = 0; i < t.length; i++) {
      var c = t.charAt(i);
      if (c === '\\' && t.charAt(i + 1) === '|') { actual += '|'; i++; continue; }
      if (c === '|') { celdas.push(actual.trim()); actual = ''; continue; }
      actual += c;
    }
    celdas.push(actual.trim());
    return celdas;
  }

  function esSeparadorTabla(linea) {
    if (!esFilaTabla(linea)) return false;
    var celdas = partirFila(linea);
    if (!celdas.length) return false;
    for (var i = 0; i < celdas.length; i++) {
      if (!/^:?-{1,}:?$/.test(celdas[i])) return false;
    }
    return true;
  }

  // Devuelve el atributo class de alineación de una celda separadora.
  // Emitimos clases y no style= para no meter contenido cerca de un atributo.
  function claseAlineacion(celda) {
    var izq = celda.charAt(0) === ':';
    var der = celda.charAt(celda.length - 1) === ':';
    if (izq && der) return ' class="vd-ta-c"';
    if (der) return ' class="vd-ta-r"';
    return ''; // izquierda: es el default, no hace falta clase
  }

  // Ajusta una fila al ancho del encabezado: las cortas se rellenan con
  // celdas vacías y a las largas les pegamos el sobrante en la última
  // celda — preferimos que se vea feo antes que perder texto en silencio.
  function normalizarFila(celdas, n) {
    var out = celdas.slice(0, n);
    while (out.length < n) out.push('');
    if (celdas.length > n && n > 0) out[n - 1] = celdas.slice(n - 1).join(' / ');
    return out;
  }

  // Renderiza la tabla que arranca en lineas[inicio]. Asume que ya se
  // verificó que lineas[inicio + 1] es la separadora.
  function renderTabla(lineas, inicio) {
    var encabezado = partirFila(lineas[inicio]);
    var separador = partirFila(lineas[inicio + 1]);
    var n = encabezado.length;
    if (!n) return null;

    var alineaciones = [];
    var c;
    for (c = 0; c < n; c++) alineaciones.push(claseAlineacion(separador[c] || ''));

    // Cuerpo: hasta la primera línea que ya no sea fila de tabla.
    var fin = inicio + 2;
    while (fin < lineas.length && esFilaTabla(lineas[fin]) && !esSeparadorTabla(lineas[fin])) {
      fin++;
    }

    // Con 3+ columnas no entramos en los ~348px útiles del panel: marcamos
    // la tabla como ancha y el contenedor se vuelve scrolleable a lo ancho.
    var html =
      '<div class="vd-tabla-wrap"><table class="vd-tabla' +
      (n > 2 ? ' vd-tabla-ancha' : '') + '"><thead><tr>';
    for (c = 0; c < n; c++) {
      html += '<th' + alineaciones[c] + '>' + formatearLinea(encabezado[c]) + '</th>';
    }
    html += '</tr></thead><tbody>';
    for (var f = inicio + 2; f < fin; f++) {
      var celdas = normalizarFila(partirFila(lineas[f]), n);
      html += '<tr>';
      for (c = 0; c < n; c++) {
        html += '<td' + alineaciones[c] + '>' + formatearLinea(celdas[c]) + '</td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table></div>';

    return { html: html, fin: fin }; // fin = primera línea NO consumida
  }

  // El texto que arma motor.js usa un subconjunto chico de markdown:
  // **negrita**, líneas que empiezan con "> " (nota / blockquote), tablas
  // estilo GFM y saltos de línea simples. No hace falta un parser completo.
  function renderTexto(texto) {
    var lineas = String(texto || '').split('\n');
    var html = '';
    var enCita = false;

    for (var i = 0; i < lineas.length; i++) {
      var linea = lineas[i];

      if (linea.indexOf('> ') === 0) {
        if (!enCita) {
          html += '<blockquote>';
          enCita = true;
        }
        html += formatearLinea(linea.slice(2)) + '<br>';
        continue;
      }
      if (enCita) {
        html += '</blockquote>';
        enCita = false;
      }

      // Tabla: necesita mirar la línea siguiente para confirmarse. Si no
      // hay separadora, no es tabla y la línea sigue el camino normal.
      if (esFilaTabla(linea) && esSeparadorTabla(lineas[i + 1])) {
        var tabla = renderTabla(lineas, i);
        if (tabla) { html += tabla.html; i = tabla.fin - 1; continue; }
      }

      if (linea.trim() === '') continue;
      html += '<p>' + formatearLinea(linea) + '</p>';
    }
    if (enCita) html += '</blockquote>';
    return html;
  }

  function uuid() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return 'sesion-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  var CSS = `
    .vd-bubble {
      position: fixed; right: 20px; bottom: 20px; z-index: 9999;
      width: 56px; height: 56px; border-radius: 50%; border: none;
      background: #0ea5a5; color: #fff; font-size: 26px; cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,.35);
    }
    .vd-bubble:hover { background: #0c8f8f; }
    .vd-panel {
      position: fixed; right: 20px; bottom: 88px; z-index: 9999;
      width: 380px; max-width: calc(100vw - 40px);
      height: 520px; max-height: calc(100vh - 140px);
      display: flex; flex-direction: column;
      background: #14161c; color: #e8e8e8;
      border-radius: 12px; overflow: hidden;
      box-shadow: 0 12px 32px rgba(0,0,0,.45);
      font-family: system-ui, -apple-system, sans-serif;
    }
    .vd-panel.vd-oculto { display: none; }
    .vd-header {
      background: #1b2340; padding: 16px 18px;
      display: flex; align-items: flex-start; justify-content: space-between;
    }
    .vd-title { font-weight: 700; font-size: 16px; }
    .vd-subtitle { font-size: 13px; opacity: .75; margin-top: 2px; }
    .vd-cerrar {
      background: none; border: none; color: #fff; font-size: 22px;
      line-height: 1; cursor: pointer; padding: 0 0 0 12px; opacity: .8;
    }
    .vd-cerrar:hover { opacity: 1; }
    .vd-mensajes { flex: 1; overflow-y: auto; padding: 16px; }
    .vd-msg { margin-bottom: 16px; }
    .vd-msg-titulo { font-weight: 700; margin-bottom: 6px; }
    .vd-msg p { margin: 0 0 8px; line-height: 1.45; font-size: 14px; }
    .vd-msg p:last-child { margin-bottom: 0; }
    .vd-msg blockquote {
      margin: 8px 0; padding: 8px 12px; border-left: 3px solid #0ea5a5;
      background: #1e2129; font-size: 13px; opacity: .9;
    }
    .vd-link { color: #4fd1d1; word-break: break-all; }
    .vd-botones { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
    .vd-boton {
      text-align: left; background: #1e2129; color: #e8e8e8;
      border: 1px solid #2c2f3a; border-radius: 8px; padding: 10px 12px;
      font-size: 14px; cursor: pointer;
    }
    .vd-boton:hover:not(:disabled) { background: #262a35; border-color: #0ea5a5; }
    .vd-boton:disabled { opacity: .45; cursor: default; }
    .vd-cargando { opacity: .6; font-size: 13px; font-style: italic; }
    .vd-error { color: #ff8080; font-size: 13px; }
    .vd-msg .vd-tabla-wrap {
      margin: 8px 0; overflow-x: auto; -webkit-overflow-scrolling: touch;
      border: 1px solid #2c2f3a; border-radius: 8px;
    }
    .vd-msg .vd-tabla {
      width: 100%; border-collapse: collapse; table-layout: fixed;
      font-size: 13px; line-height: 1.35;
    }
    .vd-msg .vd-tabla th, .vd-msg .vd-tabla td {
      padding: 7px 10px; text-align: left; vertical-align: top;
      border-bottom: 1px solid #2c2f3a;
      overflow-wrap: anywhere; word-break: break-word;
    }
    .vd-msg .vd-tabla th {
      background: #1e2129; font-weight: 700;
      border-bottom: 2px solid #0ea5a5;
    }
    .vd-msg .vd-tabla tbody tr:nth-child(even) { background: rgba(255,255,255,.025); }
    .vd-msg .vd-tabla tbody tr:last-child td { border-bottom: none; }
    /* 2 columnas (el caso previsto): término angosto, definición ancha. */
    .vd-msg .vd-tabla th:first-child, .vd-msg .vd-tabla td:first-child { width: 38%; }
    .vd-msg .vd-tabla td:first-child { font-weight: 600; color: #cfd3dc; }
    /* 3+ columnas: no entran en 348px. Ancho natural + scroll horizontal
       en el contenedor, en vez de columnas de 80px ilegibles. */
    .vd-msg .vd-tabla-ancha { table-layout: auto; min-width: 460px; }
    .vd-msg .vd-tabla-ancha th:first-child,
    .vd-msg .vd-tabla-ancha td:first-child { width: auto; font-weight: 400; color: inherit; }
    .vd-msg .vd-tabla .vd-ta-c { text-align: center; }
    .vd-msg .vd-tabla .vd-ta-r { text-align: right; }
    @media (max-width: 460px) {
      .vd-msg .vd-tabla { font-size: 12px; }
      .vd-msg .vd-tabla th, .vd-msg .vd-tabla td { padding: 6px 8px; }
    }
  `;

  window.createValledataChat = function (opts) {
    opts = opts || {};
    var webhookUrl = opts.webhookUrl;
    if (!webhookUrl) {
      console.error('createValledataChat: falta webhookUrl');
      return;
    }
    var i18n = (opts.i18n && opts.i18n.es) || {};
    var titulo = opts.title || i18n.title || 'Asistente';
    var subtitulo = opts.subtitle || i18n.subtitle || '';
    var sessionId = uuid();

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var bubble = document.createElement('button');
    bubble.className = 'vd-bubble';
    bubble.type = 'button';
    bubble.setAttribute('aria-label', 'Abrir ' + titulo);
    bubble.textContent = '💬';

    var panel = document.createElement('div');
    panel.className = 'vd-panel vd-oculto';
    panel.innerHTML =
      '<div class="vd-header">' +
      '<div><div class="vd-title"></div><div class="vd-subtitle"></div></div>' +
      '<button type="button" class="vd-cerrar" aria-label="Cerrar">×</button>' +
      '</div>' +
      '<div class="vd-mensajes" role="log" aria-live="polite"></div>';
    panel.querySelector('.vd-title').textContent = titulo;
    panel.querySelector('.vd-subtitle').textContent = subtitulo;

    document.body.appendChild(bubble);
    document.body.appendChild(panel);

    var mensajes = panel.querySelector('.vd-mensajes');
    var abierto = false;
    var cargadoUnaVez = false;

    function alternar() {
      abierto = !abierto;
      panel.classList.toggle('vd-oculto', !abierto);
      if (abierto && !cargadoUnaVez) {
        cargadoUnaVez = true;
        enviar('');
      }
    }

    bubble.addEventListener('click', alternar);
    panel.querySelector('.vd-cerrar').addEventListener('click', alternar);

    function agregarCargando() {
      var div = document.createElement('div');
      div.className = 'vd-msg vd-cargando';
      div.textContent = 'Escribiendo…';
      mensajes.appendChild(div);
      mensajes.scrollTop = mensajes.scrollHeight;
      return div;
    }

    function agregarError(motivo) {
      var div = document.createElement('div');
      div.className = 'vd-msg vd-error';
      div.textContent =
        motivo === 'token'
          ? 'El asistente rechazó la consulta: falta el token de acceso o es incorrecto.'
          : 'No pude conectarme con el asistente. Probá de nuevo en un momento.';
      mensajes.appendChild(div);
      mensajes.scrollTop = mensajes.scrollHeight;
    }

    function agregarRespuesta(json) {
      var div = document.createElement('div');
      div.className = 'vd-msg';

      var html = '';
      if (json.titulo) html += '<div class="vd-msg-titulo">' + escapeHtml(json.titulo) + '</div>';
      html += renderTexto(json.texto);
      div.innerHTML = html;

      if (json.url) {
        var p = document.createElement('p');
        var a = document.createElement('a');
        a.className = 'vd-link';
        a.href = json.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = json.url;
        p.appendChild(a);
        div.appendChild(p);
      }

      var botones = json.botones || [];
      if (botones.length) {
        var cont = document.createElement('div');
        cont.className = 'vd-botones';
        botones.forEach(function (b) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'vd-boton';
          btn.textContent = b.label;
          btn.addEventListener('click', function () {
            Array.prototype.forEach.call(cont.querySelectorAll('button'), function (x) {
              x.disabled = true;
            });
            enviar(b.value);
          });
          cont.appendChild(btn);
        });
        div.appendChild(cont);
      }

      mensajes.appendChild(div);
      mensajes.scrollTop = mensajes.scrollHeight;
    }

    function enviar(valor) {
      var cargando = agregarCargando();
      var cabeceras = { 'Content-Type': 'application/json' };
      // El webhook exige un token. OJO: este widget corre en el navegador,
      // así que el token queda a la vista de cualquiera que mire el código.
      // Sirve para frenar tráfico casual y para poder rotar la clave, no
      // como barrera real. Para eso hace falta un proxy del lado servidor.
      if (opts.token) cabeceras[opts.headerToken || 'X-API-Key'] = opts.token;

      fetch(webhookUrl, {
        method: 'POST',
        headers: cabeceras,
        body: JSON.stringify({ action: 'sendMessage', sessionId: sessionId, chatInput: valor }),
      })
        .then(function (res) {
          if (res.status === 401 || res.status === 403) throw new Error('token');
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        })
        .then(function (json) {
          cargando.remove();
          agregarRespuesta(json);
        })
        .catch(function (err) {
          cargando.remove();
          agregarError(err && err.message === 'token' ? 'token' : null);
        });
    }
  };
})();
