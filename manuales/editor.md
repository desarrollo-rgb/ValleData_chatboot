GOBERNACIÓN DEL VALLE DEL CAUCA
ValleDATA — Portal de Datos Abiertos
MANUAL DE USUARIO
Rol: Editor
# Tabla de Contenido
1. ¿Qué puede hacer un Editor?
2. Cómo obtener acceso a la plataforma
3. Cómo iniciar sesión (con verificación en dos pasos)
4. Tu perfil de usuario
5. Cómo buscar y explorar conjuntos de datos
6. Cómo descargar y consultar recursos
7. Cómo crear un conjunto de datos
8. Cómo administrar un conjunto de datos que ya publicaste
9. Lo que el Editor no puede hacer
10. Ayuda y accesibilidad
11. Centro de ayuda
# 1. ¿Qué puede hacer un Editor?
Dentro de una Dependencia, la plataforma define tres roles. El rol Editor permite:
- Editor: puede agregar y editar conjuntos de datos, pero no puede administrar a los miembros de la Dependencia.
Para ubicarlo frente a los otros dos roles de la misma Dependencia:
- Administrador: puede agregar, editar y eliminar conjuntos de datos, y además administrar a los miembros de la Dependencia.
- Miembro: puede ver los conjuntos de datos privados de la Dependencia, pero no puede agregar ni editar conjuntos de datos.
En otras palabras: como Editor, tu trabajo principal es crear, editar y mantener actualizados los conjuntos de datos de tu Dependencia, pero la gestión de la Dependencia en sí (sus datos generales, sus miembros y sus roles) está a cargo de quien tenga el rol Administrador.
Nota: el rol Editor se asigna por Dependencia, no de forma general en la plataforma. Solo podrás crear o editar conjuntos de datos en las Dependencias donde tengas específicamente el rol Editor (o Administrador). Si perteneces a varias Dependencias, es posible que en unas seas Editor y en otras no tengas ningún rol; en esas últimas no podrás crear conjuntos de datos.
# 2. Cómo obtener acceso a la plataforma
Existen dos formas de tener una cuenta con rol Editor:
- Registro propio: creas tu cuenta desde la pantalla de inicio de sesión, y luego un Administrador de tu Dependencia te asigna el rol Editor.
- Invitación por correo electrónico: un Administrador de tu Dependencia te invita directamente escribiendo tu correo electrónico y asignándote el rol Editor. Recibirás un correo para completar la creación de tu cuenta.
## 2.1 Registro propio
Paso 1: Entra a la página de "Iniciar sesión" del portal.
Paso 2: En el cuadro "¿Necesita una cuenta?", presiona el botón "Crear una Cuenta".
Paso 3: Completa el formulario "Regístrese para una Cuenta": nombre de usuario, nombre completo, correo electrónico, contraseña y confirmar contraseña. De forma opcional puedes subir una imagen de perfil ("Upload") o enlazar una ("Link").
Paso 4: Presiona el botón "Crear una Cuenta" para finalizar.
## 2.2 Invitación por correo electrónico
Si un Administrador te agrega como miembro de su Dependencia usando tu correo electrónico y te asigna el rol Editor, recibirás una invitación por correo para crear tu cuenta. Al aceptarla, quedas vinculado automáticamente a esa Dependencia con permisos de Editor, sin pasos adicionales de tu parte.
# 3. Cómo iniciar sesión (con verificación en dos pasos)
Paso 1: En la pantalla "Iniciar sesión", escribe tu nombre de usuario o correo electrónico y tu contraseña.
Paso 2: Presiona el botón "Siguiente".
Inicio de sesión con usuario y contraseña.
Paso 3: La primera vez que ingresas, el sistema te pide configurar la verificación en dos pasos (MFA): escanea el código QR con la aplicación Google Authenticator, o usa la "Llave manual" si no puedes escanear, y escribe el código de 6 dígitos que te genera la aplicación.
Paso 4: Presiona "Verificar y activar".
Configuración de la verificación en dos pasos (MFA) con código QR.
Tip: Si aún no tienes Google Authenticator instalada, descárgala desde la tienda de aplicaciones de tu celular (Google Play o App Store) antes de este paso.
## 3.1 Recuperación de contraseña
Si olvidas tu contraseña, usa la opción "¿Olvidaste tu contraseña?" desde la misma pantalla de inicio de sesión. Donde debes colocar el correo del usuario al cual quieres recuperar la contraseña y es el mismo al que llegará el correo de recuperación de contraseña.
# 4. Tu perfil de usuario
## 4.1 Tu página de perfil
Al iniciar sesión, llegas a tu página de perfil, con pestañas para Conjuntos de datos, Dependencias, Grupo y Tokens de API, junto con un botón "Administrador".
Página de perfil de una cuenta con rol Editor, ya con un conjunto de datos publicado.
Nota: el botón "Administrador" aparece porque este usuario tiene permisos de Editor (o Administrador) en al menos una Dependencia — en este caso, Secretaria del Deporte. No es exclusivo de quienes tienen permisos de Administrador del sistema.
Al hacer clic en tu nombre, en la esquina superior derecha, se despliega un menú con las opciones: Ver perfil, Panel, Configuración del perfil y Finalizar la sesión. A diferencia de un usuario con permisos de Administrador del sistema, aquí no aparece la opción "Administrador(a)" en ese menú desplegable, ya que el Editor no administra el sistema en general.
La opción "Ver perfil" del menú lleva a la página de perfil.
## 4.2 Configuración del perfil
Desde el menú desplegable de tu usuario, la opción "Configuración del perfil" te lleva a la página donde puedes actualizar tus datos personales: nombre de usuario, Nombre completo, Dirección de correo electrónico, una breve descripción ("Acerca de") y tu Imagen del perfil.
Configuración del perfil: datos de la cuenta.
Más abajo, en la misma página, puedes cambiar tu contraseña ingresando la contraseña anterior, la nueva contraseña y su confirmación. Al terminar, presiona "Actualizar Perfil".
Cambio de contraseña, en la misma página de configuración del perfil.
## 4.3 Tokens de API
La pestaña "Tokens de API" de tu perfil te permite crear tokens para conectar tus propios sistemas al API de ValleDATA, sin usar tu usuario y contraseña directamente.
Paso 1: Escribe un nombre para identificar el token, en el campo "Name".
Paso 2: Presiona "Crear Token de API".
Nota: el token completo solo se muestra una vez, en el momento de crearlo. Cópialo y guárdalo en un lugar seguro; si lo pierdes, tendrás que crear uno nuevo.
Token de API recién creado, y la lista de tokens existentes.
En la tabla de abajo puedes ver los tokens ya creados, cuándo fue su último acceso, y eliminarlos con el botón rojo (X) si ya no los necesitas.
## 4.4 Cambiar el idioma del portal
En la esquina superior derecha de cualquier página, junto a tu usuario, hay un botón que alterna el idioma del portal entre español ("ES") e inglés ("EN").
El portal en español, con el botón "EN" para cambiar a inglés.
Al presionarlo, toda la interfaz cambia de idioma, incluyendo los formularios que usas para crear y editar conjuntos de datos. Para volver a español, presiona el mismo botón, que ahora mostrará "ES".
El portal se muestra en inglés, con el botón "ES" para volver a español.
# 5. Cómo buscar y explorar conjuntos de datos
Como cualquier otro rol, el Editor puede buscar y explorar los conjuntos de datos publicados en el portal, de la misma forma que un ciudadano. Este flujo está descrito en detalle en la Guía del Ciudadano; aquí se resume lo esencial.
Paso 1: Entra a la opción "Conjuntos de datos" del menú superior.
Paso 2: Escribe una palabra clave en el buscador y presiona "Buscar", o usa los filtros del panel izquierdo (Dependencias, Grupo, Etiquetas, Formatos).
Listado de Conjuntos de datos, con filtros a la izquierda y el botón "Agrega conjunto de datos".
Al entrar a un conjunto de datos ("Explorar conjunto"), puedes calificarlo, leer o dejar comentarios, y ver la lista de recursos disponibles en "Datos y Recursos".
Detalle del conjunto de datos: calificación, comentarios y recursos.
# 6. Cómo descargar y consultar recursos
Desde la página de un recurso puedes descargarlo directamente con el botón "Descargas", o consultarlo en línea si es una tabla de datos, con búsqueda avanzada y paginación.
Botón "Descargas" para bajar el archivo, y "API de datos" para acceso técnico.
Tabla de datos con filtros y paginación.
Todos los recursos del conjunto de estos llevan consigo un diccionario de datos con el fin de que el usuario pueda informarse sobre cada una de las columnas del archivo o sobre qué información está digitada en el conjunto de datos.
diccionario de datos
Si el recurso incluye información geográfica (formato GeoJSON), puedes verla directamente sobre un mapa, con un punto por cada registro.
Al pasar el cursor sobre un punto, se muestra el detalle de ese registro. Vista en mapa de un conjunto de datos con información geográfica (GeoJSON).
Nota: el detalle completo de estas funciones (diccionario de datos, herramientas de la tabla, mapa) está en la sección correspondiente de la Guía del Ciudadano.
# 7. Cómo crear un conjunto de datos
Crear un conjunto de datos es un proceso de tres pasos: Crear conjuntos de datos, Agregar datos y Previsualizar datos. Este proceso es igual para los roles Editor y Administrador.
Nota: el botón "Agrega conjunto de datos" solo aparece en la página de las Dependencias donde tienes rol Editor o Administrador. Si entras a una Dependencia donde no tienes ninguno de esos dos roles, el botón simplemente no aparece. También se encuentra visible dentro de la pantalla principal de “Conjuntos de Datos"
En una Dependencia donde el usuario es Editor, el botón "Agrega conjunto de datos" sí aparece.
En una Dependencia donde el usuario no tiene rol Editor ni Administrador, el botón no aparece.
## 7.1 Paso 1: Información general del conjunto de datos
Completa los campos principales: Título, Descripción, Etiquetas, Licencia y Dependencia.
- Título: el nombre descriptivo del conjunto de datos. La URL se genera automáticamente a partir del título.
- Descripción: notas útiles sobre los datos (admite formato Markdown).
- Etiquetas: palabras clave relacionadas, por ejemplo economía, salud mental, gobierno.
- Licencia: la licencia bajo la cual se publican los datos.
- Dependencia: la entidad responsable del conjunto de datos.
Nota: el campo Dependencia sólo muestra las Dependencias donde tienes rol Editor o Administrador. Si solo eres Editor de una Dependencia, esa será la única opción disponible en la lista.
El campo Dependencia solo lista las Dependencias donde el usuario tiene permisos (en este caso, únicamente "Secretaria del Deporte").
Más abajo, en el mismo formulario, completa Visibilidad (Privado o Público), Fuente, Versión, Autor y Mantenedor (con sus correos electrónicos), Categoría, Frecuencia, Departamento, Ciudad, y los Campos Personalizados (pares Clave/Valor) que necesites. Al terminar, presiona "Siguiente: Agregar Datos".
Nota: los campos marcados con asterisco (*) son obligatorios.
## 7.2 Paso 2: Agregar datos (subir el recurso)
En este paso subes el archivo, o el enlace, que contiene la información:
- Datos: usa "Volver a subir" para cargar un archivo desde tu computador, o "Enlace" para vincular un archivo externo.
- Formato: se detecta automáticamente desde el archivo. Formatos permitidos: JSON, CSV, XLS, XLSX, PDF, GeoJSON, SHP, XML.
- Nombre y Descripción: del recurso que estás agregando
Paso 2: subir o enlazar el archivo de datos.
## 7.3 Paso 3: Previsualizar datos
Antes de guardar, el sistema muestra una previsualización del contenido del archivo: nombre, formato, y una muestra de los registros, indicando cuántos tiene en total.
Previsualización del archivo antes de publicarlo.
Si el sistema detecta posibles anomalías en el archivo, se abre la ventana "Posibles anomalías detectadas en el archivo" con el detalle. Estas observaciones no impiden publicar el recurso, pero conviene revisarlas. Pueden ser, por ejemplo:
- Anomalías por fila: filas con más o menos columnas de las esperadas (suele indicar una coma de más o un campo sin comillas en el archivo original).
- Anomalías por columna: una columna mayormente completa pero con algunas celdas vacías, o con valores inusualmente largos comparados con el resto de la columna.
Aviso de anomalías por columna: celdas vacías y valores inusualmente largos.
Revisa el detalle y presiona "Confirmar" para continuar y publicar el recurso, o "Cancelar" para corregir el archivo antes de subirlo de nuevo.
# 8. Cómo administrar un conjunto de datos que ya publicaste
Una vez creado, el conjunto de datos queda disponible con sus pestañas habituales y, además, el botón "Administrador" en la esquina superior derecha, desde donde gestionas su información y sus recursos.
El botón "Administrador" del conjunto de datos da acceso a su gestión.
## 8.1 Editar metadatos, reordenar recursos y valoraciones
Al presionar "Administrador" dentro del conjunto de datos, encuentras tres pestañas:
- Editar metadatos: para modificar título, descripción, etiquetas, licencia y demás información capturada en el paso 1 de la creación.
- Reordenar recursos: para cambiar el orden en que se muestran los archivos del conjunto de datos.
- Valoraciones: para ver las calificaciones que los ciudadanos le han dado al conjunto de datos.
Pestaña "Editar metadatos" de un conjunto de datos.
## 8.2 Asociar un conjunto de datos a una temática o grupo
Para asociar un conjunto de datos ya creado a una temática, entra al conjunto de datos y abre la pestaña "Grupo" (junto a "Conjunto de Datos").
La pestaña "Grupo" de un conjunto de datos, junto a "Conjunto de Datos".
Selecciona la temática en la lista desplegable y presiona "Añadir al grupo".
Selección de la temática y botón "Añadir al grupo".
Nota: solo puedes asociar el conjunto de datos a una temática de la que seas miembro. Si no perteneces a esa temática, no aparecerá disponible para agregarla desde aquí.
## 8.3 Administrar un recurso (archivo)
Desde la página de un recurso, ves los botones "Ver Recurso", "Vistas", "Descargas" y "API de datos".
Botones disponibles en la página de un recurso.
Al entrar en modo edición del recurso ("Ver Recurso"), encuentras las pestañas Ver Recurso, DataStore y Vistas, desde donde puedes reemplazar el archivo ("Volver a subir" o "Enlace") y editar su formato, nombre y descripción.
Edición de un recurso: archivo, formato, nombre y descripción.
- DataStore: muestra si el archivo fue procesado e indexado ("Estado: Completado"), cuándo fue la última actualización, y un "Log de subida" con el detalle técnico del procesamiento. Desde aquí también puedes "Subir a DataStore" o "Eliminar de DataStore".
Pestaña DataStore, con el estado del procesamiento y el log de subida.
- Diccionario de datos: aparece una vez el archivo fue procesado en DataStore, y lista automáticamente cada columna detectada junto con su tipo (numérico o texto). Es el mismo diccionario que ve el ciudadano en la página del recurso.
- Vistas: para configurar cómo se visualiza el recurso (tablas, gráficas, mapas, entre otros).
9. Centro de ayuda
En el menú superior del portal vas a encontrar la opción “Centro de ayuda”, pensada para resolver tus dudas sobre cómo usar ValleDATA.
## 9.1 Conoce el portal
Al entrar, encuentras información para entender, consultar y reutilizar los datos abiertos del portal:
- ¿Qué es CKAN?: explica qué es CKAN, la plataforma en la que está construido ValleDATA, y cómo se organiza la información en conjuntos de datos, recursos, Dependencias y temáticas.
- Formatos de datos que vas a encontrar: explica los formatos disponibles: CSV y Excel, JSON y XML, GeoJSON y PDF.
- Metadatos: la “ficha técnica” de cada dato: explica qué información trae cada conjunto de datos sobre sí mismo: quién lo publicó, cuándo se actualizó y bajo qué licencia se puede usar.
- ¿Qué son los datos abiertos?: explica qué son los datos abiertos y cómo se pueden reutilizar libremente.
- Marco normativo colombiano: resume las normas que respaldan la publicación de datos abiertos en Colombia: Ley 1712 de 2014, Decreto 1008 de 2018, CONPES 3920 de 2018, Resolución 1519 de 2020 y Ley 594 de 2000.
- ¿Para qué sirven los datos abiertos?: explica para qué te sirven: transparencia, participación y control social, investigación y periodismo, e innovación y emprendimiento.
- ¿Quién publica los datos y bajo qué responsabilidad?: explica que cada entidad es responsable de sus propios datos, y cómo pedir uno que no encuentres.
Centro de ayuda: la tarjeta “¿Qué es CKAN?”, con cómo se organiza la información en CKAN.
Tarjetas de formatos de datos, metadatos, y qué son los datos abiertos.
Tarjetas de marco normativo colombiano, para qué sirven los datos abiertos, y quién los publica.
## 9.2 Documentos y manuales
También encuentras la sección “Documentos y manuales”, con guías y material de apoyo disponibles para descargar (como esta misma guía). Por ejemplo, ahí puedes descargar el documento “Datos abiertos en Colombia” (PDF), que explica qué son los datos abiertos, por qué existen y cómo ValleDATA se conecta con la estrategia nacional. Cada documento muestra su formato, la fecha de publicación, una breve descripción y un botón “Descargas” para bajarlo a tu equipo.
Sección “Documentos y manuales” con un documento disponible para descargar.
# 10. Ayuda y accesibilidad
En el lado derecho de todas las páginas vas a ver una barra flotante con varios íconos que te ayudan a adaptar el portal a tus necesidades:
- Cambiar el contraste de colores.
- Cambiar el tamaño del texto (más grande o más pequeño).
- Hablar con el asistente virtual (ícono de chat) si tienes una pregunta rápida.
- Ver documentos de ayuda.
- Contactar al equipo del portal.
- Ver los atajos de teclado disponibles.
Barra flotante de accesibilidad, visible en el costado derecho de todas las páginas.
Puedes cerrar esta barra en cualquier momento con la X.
# 11. Lo que el Editor no puede hacer
Como Editor, tu alcance se limita a crear, editar y gestionar conjuntos de datos dentro de las Dependencias donde tienes ese rol:
- No puedes crear Dependencias nuevas.
- No puedes crear temáticas (grupos) nuevas; solo puedes asociar tus conjuntos de datos a temáticas que ya existan y de las que seas miembro.
- No puedes editar la información general de tu Dependencia (nombre, descripción, logotipo); esa acción está reservada a quien tenga el rol Administrador en ella.
- No puedes agregar, quitar ni cambiar el rol de los miembros de tu Dependencia; esas acciones también están reservadas al rol Administrador.
Para cualquiera de estas acciones, debes solicitarlas a quien tenga el rol Administrador en tu Dependencia.
