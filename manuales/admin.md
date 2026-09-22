GOBERNACIÓN DEL VALLE DEL CAUCA
ValleDATA — Portal de Datos Abiertos
MANUAL DE USUARIO
Rol: Administrador
Versión 5.0
# Tabla de Contenido
1. ¿Qué puede hacer un Administrador?
2. Cómo obtener acceso a la plataforma
3. Cómo iniciar sesión (con verificación en dos pasos)
4. Tu perfil y el menú de usuario
5. Cómo buscar y explorar conjuntos de datos
6. Cómo descargar y consultar recursos
7. Cómo crear una Dependencia
8. Cómo administrar una Dependencia y sus miembros
9. Cómo crear una temática (grupo)
10. Cómo crear un conjunto de datos
11. Cómo administrar un conjunto de datos ya publicado
12. Panel de Administración del Sistema
13. Gestión del Centro de Ayuda
14. Ayuda y accesibilidad
Nota: este manual sigue la estructura estándar definida para los manuales de ValleDATA. Algunas secciones (como la asociación de conjuntos de datos a una temática) aún están pendientes de capturas reales, y quedan señaladas explícitamente en el texto.
# 1. ¿Qué puede hacer un Administrador?
El rol Administrador es el nivel de acceso más alto dentro de ValleDATA. Además de todo lo que puede hacer un Miembro o un Editor (consultar, crear y publicar conjuntos de datos), el Administrador puede:
- Gestionar quién más tiene permisos de Administrador del sistema.
- Configurar la apariencia y los datos generales del portal.
- Purgar de forma permanente los conjuntos de datos, Dependencias o grupos eliminados.
- Supervisar la vigencia y actualización de los conjuntos de datos publicados.
Existen dos formas de que una persona obtenga una cuenta en la plataforma: registrándose ella misma desde la pantalla de inicio de sesión, o siendo invitada por correo electrónico por alguien con permisos para hacerlo.
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
Si olvidas tu contraseña, usa la opción "¿Olvidaste tu contraseña?" desde la misma pantalla de inicio de sesión. Donde debes colocar el correo del usuario al cual quieres recuperar la contraseña y es el mismo al que llegara el correo de recuperación de contraseña.
.
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
El portal se muestra en inglés.
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
## 7.1 Ver las Dependencias Existentes
Antes de crear una nueva Dependencia, revisa cuáles ya existen desde el menú superior, en la opción "Dependencias". Ahí ves cuántas Dependencias hay, cuántos conjuntos de datos y miembros tiene cada una, y puedes buscarlas u ordenarlas por nombre. Si la Dependencia de tu entidad ya existe, puedes saltar directamente a la sección 8.
Directorio de Dependencias existentes en el portal.
## 7.2 Crear una nueva Dependencia
Paso 1: Entra a tu Panel (desde el menú desplegable de tu usuario, opción "Panel"), y abre la pestaña "Mis Dependencias".
Paso 2: Presiona el botón "Adicionar Dependencia".
Pestaña "Mis Dependencias" del Panel, con el botón "Adicionar Dependencia".
Paso 3: Completa el formulario "Crear una Dependencia": Nombre (la URL se genera automáticamente, y puedes ajustarla con el botón "Edit"), Descripción, e Imagen del logo (con "Upload" o "Link").
Paso 4: Presiona "Crear Dependencia".
Formulario para crear una nueva Dependencia.
Una vez creada, la Dependencia tiene su propia página, con las pestañas Conjuntos de datos, Miembros y Acerca de, el botón "Administrador" para configurarla, y el botón "Agrega conjunto de datos" para empezar a publicar información.
Página de una Dependencia ya creada, lista para agregar conjuntos de datos.
# 8. Cómo administrar una Dependencia y sus miembros
## 8.1 Editar la información de la Dependencia
Desde la página de una Dependencia, presiona el botón "Administrador" (disponible para quienes tengan el rol de Administrador en esa Dependencia).
El botón "Administrador" da acceso a la gestión de la Dependencia.
En la pestaña "Editar" puedes modificar el Nombre, la Descripción, la "URL de la imagen" (con la opción de quitarla con "Remove") y agregar Campos Personalizados adicionales.
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
# 9. Cómo crear una temática
## 9.1 Crear una temática
Además de las Dependencias, la plataforma permite agrupar conjuntos de datos por Temática (llamadas "Grupos" en la configuración interna). A diferencia de la Dependencia —que identifica a la entidad que publica el dato—, una temática agrupa conjuntos de datos de una o varias Dependencias bajo un mismo tema, por ejemplo Salud, Educación o Medio Ambiente.
Paso 1: Entra a la opción "Temáticas" del menú superior.
Paso 2: Presiona el botón "Adicionar Grupo".
Directorio de Temáticas (Grupos), con el botón "Adicionar Grupo".
Paso 3: Completa el formulario "Crear un Grupo": Nombre (la URL se genera automáticamente), Descripción, e Imagen (con "Upload" o "Link").
Paso 4: Presiona "Crear Grupo".
Formulario para crear una nueva temática (grupo).
## 9.2 Editar la información de la temática
Desde la página de una temática, presiona el botón "Administrador" (disponible para quienes tengan el rol de Administrador en esa temática).
El botón "Administrador" da acceso a la gestión de la temática.
En la pestaña "Editar" puedes modificar el Nombre, la Descripción, la "URL de la imagen" (con la opción de quitarla con "Remove") y agregar Campos Personalizados adicionales.
Edición de la información general de la temática.
## 9.3 Ver y gestionar los miembros de la temática
En la pestaña "Miembros" ves la lista de personas que pertenecen a la temática junto con su rol. Desde ahí puedes editar el rol de alguien (ícono de llave) o quitarlo de la temática (ícono rojo X). El botón "CSV" exporta el listado de miembros, y el botón "Agregar Miembro" abre el formulario para sumar a alguien nuevo.
Lista de miembros de una temática, con su rol.
## 9.4 Cómo agregar un miembro o invitar a una persona por correo electrónico
Al presionar "Agregar Miembro" hay dos formas de sumar a alguien a la temática:
- Usuario existente: si la persona ya tiene una cuenta en la plataforma, búscala por su nombre de usuario en el campo correspondiente.
- Usuario nuevo (invitación por correo electrónico): si la persona todavía no tiene cuenta, escribe su correo electrónico. El sistema le envía una invitación para crear su cuenta y unirse directamente a esta temática .
En ambos casos, elige el Rol que va a tener la persona dentro de la temática y presiona "Agregar Miembro".
Formulario para agregar un miembro existente o invitar a uno nuevo por correo electrónico.
## 9.5 Los dos roles dentro de una temática
Al elegir el rol, la plataforma explica claramente qué puede hacer cada uno:
- Administrador: puede agregar y asociar la temática al conjunto de datos y además administrar a los miembros de la temática (agregarlos, quitarlos o cambiar su rol).
- Miembro: puede agregar y asociar la temática al conjunto de datos
Los dos roles disponibles al agregar un miembro a una temática.
# 10. Cómo crear un conjunto de datos
Crear un conjunto de datos es un proceso de tres pasos: Crear conjuntos de datos, Agregar datos y Previsualizar datos.
Formulario para crear una nueva temática (grupo).
El Administrador puede realizar conjuntos de datos dentro de cualquier Dependencia
## 10.1 Paso 1: Información general del conjunto de datos
Desde la página de la Dependencia, presiona el botón "Agrega conjunto de datos", y completa los campos principales:
- Título: el nombre descriptivo del conjunto de datos. La URL se genera automáticamente a partir del título.
- Descripción: notas útiles sobre los datos (admite formato Markdown).
- Etiquetas: palabras clave relacionadas, por ejemplo economía, salud mental, gobierno.
- Licencia: la licencia bajo la cual se publican los datos.
- Dependencia: la entidad responsable del conjunto de datos.
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
## 10.2 Paso 2: Agregar datos (subir el recurso)
En este paso subes el archivo, o el enlace, que contiene la información:
- Datos: usa "Volver a subir" para cargar un archivo desde tu computador, o "Enlace" para vincular un archivo externo.
- Formato: se detecta automáticamente desde el archivo. Formatos permitidos: JSON, CSV, XLS, XLSX, PDF, GeoJSON, SHP, XML.
- Nombre y Descripción: del recurso que estás agregando.
Paso 2: subir o enlazar el archivo de datos.
## 10.3 Paso 3: Previsualizar datos
Antes de guardar, el sistema muestra una previsualización del contenido del archivo: nombre, formato, y una muestra de los registros, indicando cuántos tiene en total.
Previsualización del archivo antes de publicarlo.
Si el sistema detecta posibles anomalías en el archivo, se abre la ventana "Posibles anomalías detectadas en el archivo" con el detalle. Estas observaciones no impiden publicar el recurso, pero conviene revisarlas. Pueden ser, por ejemplo:
- Anomalías por fila: filas con más o menos columnas de las esperadas (suele indicar una coma de más o un campo sin comillas en el archivo original).
- Anomalías por columna: una columna mayormente completa pero con algunas celdas vacías, o con valores inusualmente largos comparados con el resto de la columna.
Aviso de anomalías por fila: columnas de más o de menos frente al encabezado.
Aviso de anomalías por columna: celdas vacías y valores inusualmente largos.
Revisa el detalle y presiona "Confirmar" para continuar y publicar el recurso, o "Cancelar" para corregir el archivo antes de subirlo de nuevo.
# 11. Cómo administrar un conjunto de datos ya publicado
Una vez creado, el conjunto de datos queda disponible con sus pestañas habituales y, además, el botón "Administrador" en la esquina superior derecha, desde donde se gestiona toda su información y sus recursos.
Conjunto de datos ya publicado, con calificación, comentarios y recursos.
El botón "Administrador" da acceso a la gestión del conjunto de datos.
## 11.1 Editar metadatos, reordenar recursos y valoraciones
Al presionar "Administrador" dentro del conjunto de datos, encuentras tres pestañas:
- Editar metadatos: para modificar título, descripción, etiquetas, licencia y demás información capturada en el paso 1 de la creación.
- Reordenar recursos: para cambiar el orden en que se muestran los archivos del conjunto de datos.
- Valoraciones: para ver las calificaciones que los ciudadanos le han dado al conjunto de datos.
Pestaña "Editar metadatos" de un conjunto de datos.
## 11.2 Asociar un conjunto de datos a una temática o grupo
Para asociar un conjunto de datos ya creado a una temática, entra al conjunto de datos y abre la pestaña "Grupo" (junto a "Conjunto de Datos").
La pestaña "Grupo" de un conjunto de datos, junto a "Conjunto de Datos".
Selecciona la temática en la lista desplegable y presiona "Añadir al grupo".
Selección de la temática y botón "Añadir al grupo".
Nota: solo puedes asociar el conjunto de datos a una temática de la que seas miembro. Si no perteneces a esa temática, no aparecerá disponible para agregarla desde aquí.
## 11.3 Administrar un recurso (archivo)
Desde la página de un recurso, ves los botones "Ver Recurso", "Vistas", "Descargas" y "API de datos".
Botones disponibles en la página de un recurso.
Al entrar en modo edición del recurso, encuentras cuatro pestañas:
- Ver Recurso: para reemplazar el archivo ("Volver a subir" o "Enlace"), y editar su formato, nombre y descripción.
Edición de un recurso: archivo, formato, nombre y descripción.
- DataStore: muestra si el archivo fue procesado e indexado ("Estado: Completado"), cuándo fue la última actualización, y un "Log de subida" con el detalle técnico del procesamiento, incluyendo los encabezados y tipos de datos detectados en cada columna. Desde aquí también puedes "Subir a DataStore" o "Eliminar de DataStore".
Pestaña DataStore, con el estado del procesamiento y el log de subida.
- Diccionario de datos: lista automáticamente cada columna detectada en el archivo, junto con su tipo (numérico o texto). Es el mismo diccionario que ve el ciudadano en la página del recurso.
- Vistas: para configurar cómo se visualiza el recurso (tablas, gráficas, mapas, entre otros).
# 12. Panel de Administración del Sistema
Este panel solo está disponible para usuarios con rol Administrador, y se accede desde el botón "Administrador" del perfil o desde la opción "Administrador(a)" del menú desplegable. Tiene cuatro pestañas: Administrador(a), configuración, Papelera y Tablero de Vigencia.
## 12.1 Administradores del sistema
En la pestaña "Administrador(a)" ves la lista de "Administradores del Sistema Actuales", y puedes quitarle el permiso de Administrador a cualquiera de ellos con el botón rojo (X) junto a su nombre.
Lista de Administradores del Sistema Actuales.
Nota: como Administrador tienes control total sobre la plataforma. Actúa con cuidado antes de quitarle el rol a alguien.
Más abajo, en la sección "Promocionar usuario a Administrador del Sistema", puedes darle este mismo permiso a otro usuario que ya tenga una cuenta en la plataforma.
Paso 1: Escribe o selecciona su nombre de usuario en el campo "Username".
Paso 2: Presiona el botón "Promocionar".
Sección "Promocionar usuario a Administrador del Sistema", dentro de la pestaña Administrador(a).
Nota: promocionar a alguien a Administrador del Sistema le da control total sobre toda la plataforma, no solo sobre una Dependencia específica. Actúa con el mismo cuidado que al quitarle el rol a alguien.
## 12.2 Configuración del sitio
En la pestaña "configuración" defines la identidad general del portal: Nombre del Sitio, Hoja de estilos personalizada, Lema del sitio, Logotipo del sitio (con opción de quitarlo con el botón "Remove") y el texto de "Acerca de", que aparece en la página "Acerca de" del portal. “Texto de Introducción” que se refleja en la página principal del sitio
Configuración general del sitio: nombre, lema, logotipo y texto de "Acerca de".
Más abajo, en la misma pestaña, puedes personalizar el CSS del sitio, elegir el color de la barra superior (entre las opciones aprobadas), tipografía del sitio, color secundario del sitio (entre las opciones aprobadas) y subir la imagen de fondo de la portada ("Imagen del hero").
Personalización visual: CSS, color de la barra superior e imagen de portada.
Además encontrarás la sección del edición de pie de página , donde permite editar directamente los datos que se encuentran al final de la pagina y estan los datos de la alcaldía, contactos, dirección, horarios de atención, correos electrónicos disponible, incluidas también las redes sociales.
## 12.3 Papelera
En la pestaña "Papelera" ves los conjuntos de datos, Dependencias o grupos que han sido eliminados, y puedes purgarlos de forma permanente e irreversible con el botón "Purgar todos".
Papelera con los conjuntos de datos eliminados, pendientes de purgar.
Tip: purgar un elemento lo borra para siempre, sin posibilidad de recuperarlo. Antes de purgar, confirma que realmente ya no se necesita.
## 12.4 Tablero de Vigencia de Datos
En la pestaña "Tablero de Vigencia" supervisas qué tan actualizados están los conjuntos de datos publicados: el número total de conjuntos, y los porcentajes Actualizados, Desactualizados y Por Vencer, además de una tabla con cada conjunto de datos, su dependencia, tema, fecha de creación y frecuencia de actualización esperada.
Tablero de Vigencia de Datos, con métricas de cumplimiento por color.
El estado de cada conjunto se identifica con un color:
- Verde: al día según el periodo definido.
- Amarillo: el margen de tolerancia se está agotando.
- Rojo: el conjunto de datos requiere actualización inmediata.
## 12.5 Gestión de Doble Autenticación (MFA)
En la misma sección del Panel de Administración del Sistema, la pestaña "Gestión de MFA" te permite supervisar qué usuarios tienen activa la verificación en dos pasos (MFA) y restablecer su acceso si pierden el token de Google Authenticator.
La pantalla muestra un buscador ("Buscar usuario por nombre...") con los botones "Filtrar" y "Limpiar", y una tabla con:
- Usuario y Nombre Completo: el nombre de la cuenta y el nombre registrado de la persona.
- Correo Electrónico: la dirección asociada a la cuenta.
- Estado MFA: indica si el usuario tiene la verificación en dos pasos Activada.
- Acciones Disponibles: el botón "Desactivar MFA", que restablece la verificación en dos pasos de ese usuario.
Gestión MFA: Gestión de la doble autenticación en la plataforma
Usa "Desactivar MFA" cuando un usuario perdió el acceso a su aplicación de autenticación (por ejemplo, cambió de teléfono y no tiene cómo generar el código de 6 dígitos): al desactivarlo, la persona puede iniciar sesión solo con su usuario y contraseña, y configurar el MFA de nuevo desde cero en su siguiente ingreso.
## 12.6 Seguimientos de conjuntos de datos y recursosEsta pestaña brinda acceso al historial unificado de trazabilidad y gobierno del portal de datos, con monitoreo detallado del ciclo de vida de los activos de información:
## Control de Identidad: registro cronológico de las acciones asociadas al usuario responsable (actor) de cada cambio.
## Mapeo operativo: clasificación de eventos críticos como creación, actualización y eliminación de metadatos.
## Trazabilidad DCAT: almacenamiento de las estructuras y payloads transferidos a la API del ecosistema, siguiendo el estándar DCAT.
## La tabla "Portal Audit History" muestra, para cada evento registrado:
## Date (UTC): fecha y hora exacta del evento.
## Nombre de usuario: quién realizó la acción.
## Acciones: el tipo de operación (por ejemplo, package_update para la actualización de un conjunto de datos, o package_delete para su eliminación).
## Affected Object: el objeto específico afectado, identificado por su ID único.
## Details (Payload): botón "Previsualizar datos" para ver el detalle técnico completo del cambio.
Puedes filtrar el historial por Acciones (tipo de evento), Usuario (Actor), y un rango de fechas (Desde/Hasta), y ejecutar la búsqueda con el botón "Archivo".
Al presionar "Previsualizar datos" en cualquier fila, se abre una ventana con el payload completo en formato JSON: el detalle exacto de los metadatos del conjunto de datos en el momento de ese evento (autor, correo del autor, categoría, ciudad, departamento, y campos adicionales bajo "extras"). La ventana se cierra con el botón "OK"
## 12.7 Seguimientos de conjuntos de datos y recursos
Esta pestaña del Panel de Administración del Sistema proporciona un historial detallado del control de acceso, la autenticación de usuarios y las operaciones de seguridad de identidad dentro del portal de datos.
Puedes filtrar por Acción (el tipo de evento), Usuario (Actor), y un rango de fechas (Desde / Hasta), con los botones "Filtrar" y "Limpiar". El resultado se puede exportar con el botón "Exportar a Excel".
La tabla muestra:
- ID: identificador del evento.
- Usuario (Actor): el identificador interno de la cuenta.
- Nombre de Usuario (Texto): el nombre de usuario legible.
- Tipo de Evento: por ejemplo, login (inicio de sesión exitoso), errorlogin (usuario o contraseña incorrectos) o LOGOUT (cierre de sesión).
- Mensaje: el detalle del evento.
- Dirección IP: la IP desde la que se hizo el intento.
- Fecha y Hora (Timestamp): cuándo ocurrió el evento.
Úsala para investigar accesos sospechosos: varios errorlogin seguidos desde la misma IP, en poco tiempo, pueden indicar un intento de adivinar la contraseña de una cuenta.
## 12.8 API SWAGGER
En la misma sección del Panel de Administración del Sistema, la pestaña "API SWAGGER" muestra la documentación interactiva (Swagger/OpenAPI) de las API personalizadas de ValleDATA, agrupadas por bloques:
- Acceso directo a la API (data.json): consultas de solo lectura: estadísticas del panel (dashboard_stats), datasets huérfanos (dataset_huerfanos), información de un dataset o recurso en JSON (package.json, resource.json), integración con Power BI (powerBI.json), conversión a tabla de datos, y el archivo general data.json.
- CRUD de Conjuntos de Datos y Recursos: endpoints para crear, consultar, actualizar y eliminar conjuntos de datos y recursos de forma programática: package_create, package_show, package_update, package_delete, resource_create, resource_show, resource_update y resource_delete.
- Protocolo OData (Proxy CKAN): consulta los datos de un recurso en formato OData a través de un proxy (ckan-proxy).
- Ingesta de archivos shapefile/GIS: conversión de archivos shapefile a formato GeoJSON (shp_to_geojson).
Nota: para usar cualquiera de estos métodos necesitas un Token de API generado desde tu perfil (ver sección 4.3). El token se envía en cada solicitud para autenticar la operación.
API documentada en swagger
## 12.9 Estadísticas
En la pestaña "Estadísticas" Muestra las vistas y descargas históricas acumuladas de las interacciones con los recursos según la dependencia de los mismos. Los datos se registran en tiempo real cuando los usuarios visitan o descargan recursos.
Usa el botón Exportar Excel para descargar una hoja de cálculo con tres pestañas: Resumen, por Organización y por Conjunto de datos.
Usa Descargar PDF para imprimir o guardar el panel como PDF desde tu navegador.
Dashboard de torta de vista y descargas, además de unas gráficas de barras haciendo el comparativo vistas y descargas por dependencia
## 12.10 Notificaciones por correo electrónico
Esta pestaña te permite configurar los correos automáticos que el portal envía cuando ocurren eventos sobre conjuntos de datos, recursos, dependencias y temáticas.
Activar notificaciones por correo
Un interruptor maestro (casilla "Activar notificaciones por correo") activa o desactiva todos los correos de eventos de una sola vez. Si está desactivado, no se envía ningún correo sin importar las opciones marcadas abajo. La alerta de vencimiento de conjuntos de datos es independiente de este panel: sigue funcionando aunque este interruptor esté apagado.
Enviar un correo cuando…
Marca por separado en qué eventos quieres recibir aviso, agrupados por tipo:
- Conjuntos de datos: Creación, Edición o Eliminación de conjunto de datos.
- Recursos: Nuevo recurso, Edición de recurso, o Eliminación de recurso.
- Dependencias: Creación, Edición o Eliminación de dependencia.
- Temáticas: Creación, Edición o Eliminación de temática.
Cambios de rol de administrador
Dos opciones adicionales, independientes de la lista de destinatarios:
- Avisar al usuario cuando es promovido a administrador.
- Avisar al usuario cuando le revocan el rol de administrador.
Estos dos correos se envían directamente al usuario afectado, no a la lista de destinatarios que se configura más abajo.
Destinatarios (administradores del sitio)
Aquí eliges qué administradores reciben los correos de eventos (los de "Enviar un correo cuando…"). Usa el campo "Filtrar por nombre o correo..." para buscar, y marca la casilla de cada administrador que deba recibirlos.
# 13. Gestión del centro de ayuda
Como Administrador del Sistema, puedes editar el contenido de la página pública “Centro de ayuda” desde el botón “Editar página”, visible en la esquina superior derecha de esa página. Este botón te lleva al panel “Configuración del Administrador del Sistema”, con tres partes: Introducción, Secciones de la página y Documentos y manuales.
Botón “Editar página” en la esquina superior derecha del Centro de ayuda.
En “Introducción” escribes el texto que aparece debajo del título de la página. Si lo dejas vacío, se usa el texto por defecto. También puedes agregar una traducción al inglés de ese texto.
Panel de introducción del Centro de ayuda.
En “Secciones de la página” administras las tarjetas informativas (como “¿Qué es CKAN?”). Puedes agregar una nueva con el botón “Agregar sección”, o editar cualquiera existente cambiando su título y contenido en el editor de texto (con negrita, cursiva, subrayado, listas y enlaces). Los cambios se guardan con “Guardar cambios”, o se eliminan con “Eliminar”.
Edición de una sección (tarjeta) del Centro de ayuda.
Cada sección tiene su propia traducción opcional al inglés, con la opción de “Regenerar traducción automática al guardar” si prefieres que se traduzca automáticamente en vez de escribirla tú mismo.
Traducción al inglés de una sección.
En “Documentos y manuales” agregas un documento con el botón “Agregar documento”. Por cada uno defines su nombre, una descripción breve, y su visibilidad:
- Público — todos: cualquier persona puede verlo, sin necesidad de iniciar sesión.
- Usuarios autenticados: solo lo ven las personas que inician sesión en el portal.
- Solo administradores: solo lo ven los administradores del sistema.
Niveles de visibilidad disponibles para un documento.
# También puedes traducir el nombre y la descripción del documento al inglés, y reemplazar el archivo cuando lo necesites, sin tener que borrarlo y volver a crearlo.
# 14. Ayuda y accesibilidad
En el lado derecho de todas las páginas vas a ver una barra flotante con varios íconos que te ayudan a adaptar el portal a tus necesidades:
- Cambiar el contraste de colores.
- Cambiar el tamaño del texto (más grande o más pequeño).
- Hablar con el asistente virtual (ícono de chat) si tienes una pregunta rápida.
- Ver documentos de ayuda.
- Contactar al equipo del portal.
- Ver los atajos de teclado disponibles.
Puedes cerrar esta barra en cualquier momento con la X.
