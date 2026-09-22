GOBERNACIÓN DEL VALLE DEL CAUCA
ValleDATA — Portal de Datos Abiertos
MANUAL DE USUARIO
Rol: Administrador de la Dependencia
# Tabla de Contenido
1. ¿Qué puede hacer un Administrador de la Dependencia?
2. Cómo obtener acceso a la plataforma
3. Cómo iniciar sesión (con verificación en dos pasos)
4. Tu perfil y el menú de usuario
5. Cómo buscar y explorar conjuntos de datos
6. Cómo descargar y consultar recursos
7. Cómo crear una Dependencia
8. Cómo administrar una Dependencia y sus miembros
10. Cómo crear un conjunto de datos
11. Cómo administrar un conjunto de datos ya publicado
12. Ayuda y accesibilidad
13. Centro de ayuda
# 1. ¿Qué puede hacer un Administrador de la Dependencia?
El rol Administrador es el nivel de acceso más alto dentro de una Dependencia (por ejemplo, una secretaría o dependencia ). Además de todo lo que puede hacer un Miembro o un Editor de esa misma Dependencia (consultar, crear y publicar conjuntos de datos), el Administrador de la Dependencia puede:
- Editar la información general de su Dependencia (nombre, descripción, logotipo).
- Crear Dependencias dentro de la plataforma
- Agregar, quitar o cambiar el rol de los miembros de su Dependencia.
- Crear y administrar conjuntos de datos.
Existen dos formas de que una persona obtenga una cuenta en la plataforma: registrándose ella misma desde la pantalla de inicio de sesión, o siendo invitada por correo electrónico por alguien con permisos para hacerlo.
Nota: este rol se asigna por Dependencia y es distinto del Administrador del Sistema (sysadmin). El Administrador de la Dependencia gestiona todo lo relacionado con la o las Dependencias donde tiene ese rol —su información, sus miembros, sus conjuntos de datos.
# 2. Cómo obtener acceso a la plataforma
Existen dos formas de tener una cuenta en ValleDATA:
- Registro propio: te registras tú mismo desde la pantalla de inicio de sesión.
- Invitación por correo electrónico: un Administrador te agrega directamente a una Dependencia usando tu correo electrónico y asignándote un rol.
## 2.1 Registro propio
Paso 1: Entra a la página de "Iniciar sesión" del portal.
Paso 2: En el cuadro "¿Necesita una cuenta?", presiona el botón "Crear una Cuenta".
Pantalla de inicio de sesión: el cuadro "¿Necesita una cuenta?" tiene el botón "Crear una Cuenta".
Paso 3: Completa el formulario "Regístrese para una Cuenta": nombre de usuario, nombre completo, correo electrónico, contraseña y confirmar contraseña. De forma opcional puedes subir una imagen de perfil ("Upload") o enlazar una ("Link").
Paso 4: Presiona el botón "Crear una Cuenta" para finalizar.
Formulario de registro de una cuenta nueva.
## 2.2 Invitación por correo electrónico
Como Administrador, puedes agregar personas a tu Dependencia usando su correo electrónico, sin que se registren primero: desde la pestaña "Miembros" de la Dependencia, usa el campo "Usuario nuevo" con el correo electrónico de la persona y asígnale un rol (ver sección 8.3 para el detalle completo). El sistema le envía una invitación para que complete la creación de su cuenta.
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
# 4. Tu perfil y el menú de usuario
## 4.1 Tu página de perfil
Al iniciar sesión, llegas a tu página de perfil, con pestañas para Conjuntos de datos, Dependencias, Grupo y Tokens de API. Si tu cuenta tiene permisos de Administrador, también verás el botón "Administrador" en la esquina superior derecha.
Página de perfil de usuario, con el botón "Administrador" disponible.
Al hacer clic en tu nombre, en la esquina superior derecha, se despliega un menú con las opciones: Administrador(a), Ver perfil, Panel, Configuración del perfil y Finalizar la sesión.
Menú desplegable del usuario.
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
El botón "EN" cambia el portal a inglés.
Al presionarlo, toda la interfaz cambia de idioma —incluyendo los menús, botones y paneles internos que usas como Administrador. Para volver a español, presiona el mismo botón, que ahora mostrará "ES".
El portal mostrado en inglés.
La sección de Conjuntos de datos, con sus filtros y el botón "Add Dataset", también en inglés.
# 5. Cómo buscar y explorar conjuntos de datos
Como cualquier otro rol, el Administrador puede buscar y explorar los conjuntos de datos publicados en el portal, de la misma forma que un ciudadano. Este flujo está descrito en detalle en la Guía del Ciudadano; aquí se resume lo esencial.
Paso 1: Entra a la opción "Conjuntos de datos" del menú superior.
Paso 2: Escribe una palabra clave en el buscador y presiona "Buscar", o usa los filtros del panel izquierdo (Dependencias, Grupo, Etiquetas, Formatos).
Página de búsqueda: escribe una palabra clave o usa los filtros de la izquierda.
Al entrar a un conjunto de datos ("Explorar conjunto"), puedes calificarlo, leer o dejar comentarios, y ver la lista de recursos disponibles en "Datos y Recursos".
Detalle del conjunto de datos: calificación, comentarios y recursos.
# 6. Cómo descargar y consultar recursos
Desde la página de un recurso puedes descargarlo directamente con el botón "Descargas", o consultarlo en línea si es una tabla de datos, con búsqueda avanzada y paginación.
Botón "Descargas" para bajar el archivo, y "API de datos" para acceso técnico.
Tabla de datos con filtros y paginación.
Todos los recursos del conjunto de estos llevan consigo un diccionario de datos con el fin de que el usuario pueda informarse sobre cada una de las columnas del archivo o sobre qué información está digitada en el conjunto de datos.
diccionario de datos
Si el recurso incluye información geográfica (formato GeoJSON), puedes verla directamente sobre un mapa, con un punto por cada registro.
Vista en mapa de un conjunto de datos con información geográfica (GeoJSON).
Nota: el detalle completo de estas funciones (diccionario de datos, herramientas de la tabla, mapa) está en la sección correspondiente de la Guía del Ciudadano.
# 7. Cómo crear una Dependencia
## 7.1 Ver las Dependencias existentes
Antes de crear una nueva Dependencia, revisa cuáles ya existen desde el menú superior, en la opción "Dependencias". Ahí ves cuántas Dependencias hay, cuántos conjuntos de datos y miembros tiene cada una, y puedes buscarlas u ordenarlas por nombre. Si la Dependencia de tu entidad ya existe, puedes saltar directamente a la sección 8.
Directorio de Dependencias existentes en el portal.
## 7.2 Crear una nueva Dependencia
Paso 1: Entra a tu Panel (desde el menú desplegable de tu usuario, opción "Panel"), y abre la pestaña "Mis Dependencias".
Paso 2: Presiona el botón "Adicionar Dependencia".
Pestaña "Mis Dependencias" del Panel, con el botón "Adicionar Dependencia".
Paso 3: Completa el formulario "Crear una Dependencia": Nombre (la URL se genera automáticamente, y puedes ajustarla con el botón "Edit"), Descripción, e Imagen del logo (con "Upload" o "Link").
Paso 4: Presiona "Crear Dependencia".
Formulario para crear una nueva Dependencia.
Una vez creada, la Dependencia tiene su propia página, con las pestañas Conjuntos de datos, Miembros y Acerca de, el botón "Administrador" para configurarla, y el botón "Agrega conjunto de datos" para empezar a publicar información. Solo podrás crear conjuntos de datos en la Dependencia creada por ti o donde seas administrador o editor
Página de una Dependencia ya creada, lista para agregar conjuntos de datos.
# 8. Cómo administrar una Dependencia y sus miembros
## 8.1 Editar la información de la Dependencia
Desde la página de una Dependencia, presiona el botón "Administrador" (disponible para quienes tengan el rol de Administrador en esa Dependencia). Solo podrás administrar la Dependencia de la cual eres administrador
El botón "Administrador" da acceso a la gestión de la Dependencia.
En la pestaña "Editar" puedes modificar el Nombre, la Descripción, la "URL de la imagen" (con la opción de quitarla con "Remover") y agregar Campos Personalizados adicionales.
Edición de la información general de la Dependencia.
## 8.2 Ver y gestionar los miembros de la Dependencia
En la pestaña "Miembros" ves la lista de personas que pertenecen a la Dependencia junto con su rol. Desde ahí puedes editar el rol de alguien (ícono de llave) o quitarlo de la Dependencia (ícono rojo X). El botón "CSV" exporta el listado de miembros, y el botón "Agregar Miembro" abre el formulario para sumar a alguien nuevo.
Lista de miembros de una Dependencia, con su rol.
## 8.3 Cómo agregar un miembro o invitar a una persona por correo electrónico
Al presionar "Agregar Miembro" hay dos formas de sumar a alguien a la Dependencia:
- Usuario existente: si la persona ya tiene una cuenta en la plataforma, búscala por su nombre de usuario en el campo correspondiente.
- Usuario nuevo (invitación por correo electrónico): si la persona todavía no tiene cuenta, escribe su correo electrónico. El sistema le envía una invitación para crear su cuenta y unirse directamente a esta Dependencia.
En ambos casos, elige el Rol que va a tener la persona dentro de la Dependencia y presiona "Agregar Miembro".
Formulario para agregar un miembro existente o invitar a uno nuevo por correo electrónico.
## 8.4 Los tres roles dentro de una Dependencia
Al elegir el rol, la plataforma explica claramente qué puede hacer cada uno:
- Administrador: puede agregar, editar y eliminar conjuntos de datos, y además administrar a los miembros de la Dependencia (agregarlos, quitarlos o cambiar su rol).
- Editor: puede agregar y editar conjuntos de datos, pero no puede administrar a los miembros de la Dependencia.
- Miembro: puede ver los conjuntos de datos privados de la Dependencia, pero no puede agregar ni editar conjuntos de datos.
Los tres roles disponibles al agregar un miembro a una Dependencia.
Nota: el rol se asigna por Dependencia. Una misma persona puede tener, por ejemplo, rol de Editor en una Dependencia y rol de Miembro en otra, si pertenece a ambas.
# 9. Cómo crear un conjunto de datos
Crear un conjunto de datos es un proceso de tres pasos: Crear conjuntos de datos, Agregar datos y Previsualizar datos.
Nota: el botón "Agrega conjunto de datos" solo aparece en la página de las Dependencias donde el usuario tiene rol Editor o Administrador. Si se entra a una Dependencia donde no se tiene ninguno de esos dos roles, el botón simplemente no aparece.
En una Dependencia donde el usuario tiene rol Editor o Administrador, el botón "Agrega conjunto de datos" sí aparece.
En una Dependencia donde el usuario no tiene ese rol, el botón no aparece.
## 9.1 Paso 1: Información general del conjunto de datos
Desde la página de la Dependencia, presiona el botón "Agrega conjunto de datos", y completa los campos principales:
- Título: el nombre descriptivo del conjunto de datos. La URL se genera automáticamente a partir del título.
- Descripción: notas útiles sobre los datos (admite formato Markdown).
- Etiquetas: palabras clave relacionadas, por ejemplo economía, salud mental, gobierno.
- Licencia: la licencia bajo la cual se publican los datos.
- Dependencia: la entidad responsable del conjunto de datos. Solo estarán disponibles en las Dependencias donde tengas el rol.
Paso 1: información general — título, descripción, etiquetas, licencia y Dependencia.
Más abajo, en el mismo formulario, completa:
- Visibilidad: Privado o Público.
- Fuente: enlace a la fuente original de los datos, si aplica.
- Versión, Autor y Mantenedor: junto con sus correos electrónicos de contacto.
Visibilidad, fuente, versión, autor y mantenedor del conjunto de datos.
- Categoría y Frecuencia: con qué periodicidad se actualiza el dato.
- Departamento y Ciudad: ubicación a la que corresponde la información.
- Campos Personalizados: pares Clave/Valor para agregar metadatos adicionales que no estén contemplados arriba.
Al terminar, presiona "Siguiente: Agregar Datos".
Categoría, frecuencia, ubicación, campos personalizados y el botón para continuar.
Nota: los campos marcados con asterisco (*) son obligatorios.
## 9.2 Paso 2: Agregar datos (subir el recurso)
En este paso subes el archivo, o el enlace, que contiene la información:
- Datos: usa "Volver a subir" para cargar un archivo desde tu computador, o "Enlace" para vincular un archivo externo.
- Formato: se detecta automáticamente desde el archivo. Formatos permitidos: JSON, CSV, XLS, XLSX, PDF, GeoJSON, SHP, XML.
- Nombre y Descripción: del recurso que estás agregando.
Paso 2: subir o enlazar el archivo de datos.
## 9.3 Paso 3: Previsualizar datos
Antes de guardar, el sistema muestra una previsualización del contenido del archivo: nombre, formato, y una muestra de los registros, indicando cuántos tiene en total.
Previsualización del archivo antes de publicarlo.
Si el sistema detecta posibles anomalías en el archivo, se abre la ventana "Posibles anomalías detectadas en el archivo" con el detalle. Estas observaciones no impiden publicar el recurso, pero conviene revisarlas. Pueden ser, por ejemplo:
- Anomalías por fila: filas con más o menos columnas de las esperadas (suele indicar una coma de más o un campo sin comillas en el archivo original).
- Anomalías por columna: una columna mayormente completa pero con algunas celdas vacías, o con valores inusualmente largos comparados con el resto de la columna.
# 10. Cómo administrar un conjunto de datos ya publicado
Una vez creado, el conjunto de datos queda disponible con sus pestañas habituales y, además, el botón "Administrador" en la esquina superior derecha, desde donde se gestiona toda su información y sus recursos.
Conjunto de datos ya publicado, con calificación, comentarios y recursos.
El botón "Administrador" da acceso a la gestión del conjunto de datos.
Para asociar un conjunto de datos ya creado a una temática, entra al conjunto de datos y abre la pestaña "Grupo" (junto a "Conjunto de Datos").
La pestaña "Grupo" de un conjunto de datos, junto a "Conjunto de Datos".
Selecciona la temática en la lista desplegable y presiona "Añadir al grupo".
Selección de la temática y botón "Añadir al grupo".
Nota: solo puedes asociar el conjunto de datos a una temática de la que seas miembro. Si no perteneces a esa temática, no aparecerá disponible para agregarla desde aquí.
## 10.1 Editar metadatos, reordenar recursos y valoraciones
Al presionar "Administrador" dentro del conjunto de datos, encuentras tres pestañas:
- Editar metadatos: para modificar título, descripción, etiquetas, licencia y demás información capturada en el paso 1 de la creación.
- Reordenar recursos: para cambiar el orden en que se muestran los archivos del conjunto de datos.
- Valoraciones: para ver las calificaciones que los ciudadanos le han dado al conjunto de datos.
Pestaña "Editar metadatos" de un conjunto de datos.
## 10.2 Administrar un recurso (archivo)
Desde la página de un recurso, ves los botones "Ver Recurso", "Vistas", "Descargas" y "API de datos".
Botones disponibles en la página de un recurso.
Al entrar en modo edición del recurso, encuentras cuatro pestañas:
- Ver Recurso: para reemplazar el archivo ("Volver a subir" o "Enlace"), y editar su formato, nombre y descripción.
Edición de un recurso: archivo, formato, nombre y descripción.
- DataStore: muestra si el archivo fue procesado e indexado ("Estado: Completado"), cuándo fue la última actualización, y un "Log de subida" con el detalle técnico del procesamiento, incluyendo los encabezados y tipos de datos detectados en cada columna. Desde aquí también puedes "Subir a DataStore" o "Eliminar de DataStore".
Pestaña DataStore, con el estado del procesamiento y el log de subida.
- Diccionario de datos: lista automáticamente cada columna detectada en el archivo, junto con su tipo (numeric o texto). Es el mismo diccionario que ve el ciudadano en la página del recurso.
Diccionario de datos generado automáticamente a partir del archivo.
# 11. Centro de ayuda
En el menú superior del portal vas a encontrar la opción “Centro de ayuda”, pensada para resolver tus dudas sobre cómo usar ValleDATA.
## 11.1 Conoce el portal
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
## 11.2 Documentos y manuales
También encuentras la sección “Documentos y manuales”, con guías y material de apoyo disponibles para descargar (como esta misma guía). Por ejemplo, ahí puedes descargar el documento “Datos abiertos en Colombia” (PDF), que explica qué son los datos abiertos, por qué existen y cómo ValleDATA se conecta con la estrategia nacional. Cada documento muestra su formato, la fecha de publicación, una breve descripción y un botón “Descargas” para bajarlo a tu equipo.
Sección “Documentos y manuales” con un documento disponible para descargar.
# 12. Ayuda y accesibilidad
En el lado derecho de todas las páginas vas a ver una barra flotante con varios íconos que te ayudan a adaptar el portal a tus necesidades:
- Cambiar el contraste de colores.
- Cambiar el tamaño del texto (más grande o más pequeño).
- Hablar con el asistente virtual (ícono de chat) si tienes una pregunta rápida.
- Ver documentos de ayuda.
- Contactar al equipo del portal.
- Ver los atajos de teclado disponibles.
Puedes cerrar esta barra en cualquier momento con la X.
