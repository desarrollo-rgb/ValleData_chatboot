GOBERNACIÓN DEL VALLE DEL CAUCA
ValleDATA — Ambiente de Cosecha de Datos (Harvest)
MANUAL DEL ADMINISTRADOR
Ambiente de Cosecha de Datos (Harvest)
# ¿Qué vas a encontrar en esta guía?
1. ¿Qué puede hacer un Administrador en este ambiente?
2. Cómo registrarte o crear tu cuenta
3. Cómo iniciar sesión (con verificación en dos pasos)
4. Tu perfil de usuario
5. Cómo invitar a un nuevo usuario
6. Panel de administración del sistema
7. Dependencia - Administración
8. Temáticas (Grupo)
9. Buscar, explorar y descargar conjuntos de datos de los municipios
10. ¿Qué es Harvester y para qué sirve?
11. Antes de crear una fuente: información que debes tener lista
12. Crear una fuente de cosecha
13. El panel de control de una fuente
14. Ejecutar una cosecha manual
15. Revisar el historial de ejecuciones (Jobs)
16. Editar una fuente de cosecha
17. Verificar los datos importados en el portal público
18.. Pausar o eliminar una fuente de cosecha
19. Ayuda y accesibilidad
# 1. ¿Qué puede hacer un Administrador en este ambiente?
Como Administrador en el ambiente de federación de ValleDATA, tienes control total sobre esta instancia. Puedes:
- Administrar los usuarios del sistema, la configuración general del sitio, y purgar elementos eliminados (dependencias, grupos o conjuntos de datos).
- Crear dependencias, una por cada municipio o entidad federada.
- Temáticas para clasificar por el municipio de una manera rápida desde el home
- Buscar, explorar y descargar todos los conjuntos de datos de los municipios federados, sin restricciones.
- Crear, configurar, ejecutar y supervisar fuentes de cosecha (Harvest Sources) para traer automáticamente los catálogos de los municipios y otras fuentes externas.
# 2. Cómo registrarte o crear tu cuenta
Si todavía no tienes una cuenta en este ambiente, puedes crearla tú mismo:
Paso 1: Entra a la página de "Iniciar sesión" del portal.
Paso 2: En el cuadro "¿Necesita una cuenta?", presiona el botón "Crear una Cuenta".
Paso 3: Completa el formulario con tu nombre de usuario, nombre completo, correo electrónico y una contraseña.
Paso 4: Presiona "Crear una Cuenta".
Formulario de registro para crear una cuenta nueva.
Nota: después de crear tu cuenta, otro Administrador debe promocionarte a Administrador del Sistema (ver sección 6.1) para que tengas acceso completo a este ambiente.|
# 3. Cómo iniciar sesión (con verificación en dos pasos)
Cada vez que entres al portal necesitas iniciar sesión con tu usuario y contraseña, y un código adicional de verificación en dos pasos (MFA).
Paso 1: En la pantalla "Iniciar sesión", escribe tu nombre de usuario o correo electrónico y tu contraseña.
Paso 2: Presiona el botón "Siguiente".
Pantalla de inicio de sesión.
Paso 3: Si es la primera vez, el sistema te pide configurar la verificación en dos pasos: escanea el código QR con la aplicación Google Authenticator (o similar) e ingresa el código de 6 dígitos que te genera.
Configuración de la autenticación de dos pasos (MFA) con código QR.
Paso 4: En cada inicio de sesión posterior, ingresa el código temporal de 6 dígitos que te muestra la aplicación, y presiona "Verificar e iniciar sesión".
Verificación en dos pasos en cada inicio de sesión.
## 3.1 Recuperación de contraseña
Si olvidas tu contraseña, usa la opción "¿Olvidaste tu contraseña?" desde la misma pantalla de inicio de sesión. Donde debes colocar el correo del usuario al cual quieres recuperar la contraseña y es el mismo al que llegará el correo de recuperación de contraseña.
.
# 4. Tu perfil de usuario
## 4.1 Tu página de perfil
Al iniciar sesión, llegas a tu página de perfil, con pestañas para Conjuntos de datos, Dependencias, Grupo y Tokens de API.
Página de perfil, con sus pestañas.
Al hacer clic en tu nombre, en la esquina superior derecha, se despliega un menú con las opciones: Ver perfil, Panel, Configuración del perfil y Finalizar la sesión.
Menú desplegable del usuario.
## 4.2 Configuración del perfil
Desde el menú desplegable de tu usuario, la opción "Configuración del perfil" te lleva a la página donde puedes actualizar tus datos personales: nombre de usuario, Nombre completo, Dirección de correo electrónico, una breve descripción ("Acerca de") y tu Imagen del perfil.
Configuración del perfil: datos de la cuenta, en este ambiente.
Más abajo, en la misma página, puedes cambiar tu contraseña ingresando la Contraseña anterior, la nueva Contraseña y su confirmación. Al terminar, presiona "Actualizar Perfil".
Imagen del perfil y cambio de contraseña, con los botones Borrar y Actualizar Perfil.
## 4.3 Tokens de API
La pestaña "Tokens de API" de tu perfil te permite crear tokens para conectar tus propios sistemas al portal, sin usar tu usuario y contraseña directamente. Si no programas, no necesitas esto.
Paso 1: Escribe un nombre para identificar el token, en el campo "Name".
Paso 2: Presiona "Crear Token de API".
Token de API recién creado, y la lista de tokens existentes.
Nota: el token completo solo se muestra una vez, en el momento de crearlo. Cópialo y guárdalo en un lugar seguro; si lo pierdes, tendrás que crear uno nuevo.
En la tabla de abajo puedes ver los tokens ya creados, cuándo fue su último acceso, y eliminarlos con el botón rojo (X) si ya no los necesitas.
## 4.4 Cambiar el idioma del portal
En la esquina superior derecha de cualquier página, junto a tu usuario, hay un botón que alterna el idioma del portal entre español ("ES") e inglés ("EN").
El portal en español, con el botón "EN" para cambiar a inglés.
Al presionarlo, toda la interfaz cambia de idioma. Para volver a español, presiona el mismo botón, que ahora mostrará "ES".
El portal mostrado en inglés, con el botón "ES" para volver a español.
# 5. Cómo invitar a un nuevo usuario
Como Administrador, puedes agregar personas usando su correo electrónico, sin que se registren primero:
Paso 1: Ve a la dependencia correspondiente y entra a la pestaña "Miembros".
Paso 2: Presiona "Agregar Miembro".
Paso 3: En el campo "Usuario nuevo", escribe el correo electrónico de la persona (o búscala por nombre de usuario en "Usuario existente" si ya tiene cuenta).
Paso 4: Elige el Rol que va a tener dentro de la dependencia (Administrador o Miembro).
Paso 5: Presiona "Agregar Miembro". El sistema le envía una invitación por correo para que complete la creación de su cuenta.
Formulario para agregar un miembro existente o invitar a uno nuevo por correo electrónico.
# 6. Panel de administración del sistema
Al hacer clic en el ícono de llave inglesa, en la esquina superior derecha, entras al panel de administración del sistema, con cuatro pestañas: Administradores, Configuración, Papelera y Cosecha (Harvest).
## 6.1 Administradores del sistema
En esta pestaña puedes:
- Ver la lista de Administradores del Sistema actuales.
- Promocionar: un usuario existente a Administrador del Sistema, escribiendo su nombre de usuario en el campo correspondiente y presionando Promocionar.
- Remover: los permisos de administrador a cualquier usuario de la lista, con el botón rojo (✕) junto a su nombre.
|
Administradores del Sistema actuales en este ambiente.
## 6.2 Configuración del sitio
En la pestaña "Configuración" defines la identidad general de este ambiente:
- Nombre del Sitio.
- Hoja de estilos personalizada.
- Lema del sitio.
- Logotipo del sitio: con opción de quitarlo con el botón "Remove".
- Texto de "Acerca de": el que aparece en la página "Acerca de" del portal.
Configuración general del sitio de este ambiente: Nombre del Sitio, hoja de estilos, lema, logotipo y Acerca de.
- Texto de introducción: el mensaje de bienvenida que aparece en la página principal del portal.
- CSS Personalizado: un bloque de estilos que se inserta en la cabecera de cada página, para ajustes visuales adicionales.
Al terminar, presiona "Actualizar Configuración" para guardar los cambios, o "Reiniciar" para descartarlos.
Texto de introducción, CSS personalizado, y los botones Reiniciar / Actualizar Configuración.
## 6.3 Papelera
La pestaña "Papelera" te permite purgar (eliminar para siempre y de forma irreversible) los conjuntos de datos, dependencias o grupos que ya fueron borrados:
- Conjuntos de datos eliminados: lista los datasets borrados, con un botón "Purgar" para cada uno.
- Dependencias eliminadas y Grupos eliminados: funcionan igual, cada uno en su propio bloque.
- Purgar todos: elimina de forma permanente todo lo que está en la papelera, de una sola vez.
Papelera: conjuntos de datos, dependencias y grupos eliminados, listos para purgar.
Nota: purgar es una acción irreversible: a diferencia de borrar (que solo oculta el elemento y permite recuperarlo), purgar lo elimina definitivamente de la base de datos.
## 6.4 Reportes
La pestaña “Reportes” te lleva a los paneles de seguimiento del portal: Reportes de Seguimiento y Estadísticas Generales. Ambos se generan automáticamente a partir de la actividad de los municipios federados y se pueden exportar en Excel y PDF.
Pestaña Reportes, con el botón Reportes de Seguimiento.
## 6.4.1 Reportes de Seguimiento
Este reporte muestra estadísticas de uso del portal: número de visitas, descargas por conjunto de datos, los datasets más consultados por periodo, y un comparativo entre entidades. El panel se actualiza diariamente.
- Filtro por Municipios: Municipios: selecciona uno, varios o todos los municipios que quieres incluir en el reporte (botones Todos / Ninguno).
- Filtro por fecha: Desde y Hasta: acotan el reporte a un rango de fechas.
- Botones de exportación: Exportar a Excel y Descargar PDF: generan una copia descargable del reporte con los filtros aplicados.
Filtros del Dashboard de Reportes de Seguimiento.
El bloque “Portal Federado de Datos Abiertos” resume el estado general: municipios federados, organizaciones, temáticas, conjuntos de datos, recursos publicados, total de vistas y total de descargas.
Debajo, la tabla “Comparativo por Municipio” desglosa, para cada municipio, su número de conjuntos de datos, recursos, vistas y descargas.
Resumen general de estadísticas de uso y comparativo por municipio.
Las tablas de “Ranking de Municipios más Consultados” y “Ranking de Municipios con más Descargas” ordenan a los municipios según sus vistas o sus descargas, respectivamente, para identificar rápidamente cuáles concentran el mayor interés del público.
Ranking de municipios más consultados y con más descargas.
De forma similar, “Clasificación de los municipios con mayor número de conjuntos de datos” y “Clasificación de los municipios con más recursos” ordenan a los municipios según cuánto contenido han publicado.
Clasificación de municipios por conjuntos de datos y por recursos publicados.
La sección “Análisis de Interacción por Municipio (Vistas y Descargas)” contrasta, para cada municipio priorizado, sus vistas (alcance) frente a sus descargas (interés profundo o apropiación de los contenidos), con un diagrama de barras agrupadas por municipio y un gráfico circular con la distribución global entre vistas y descargas.
Análisis de interacción por municipio: comportamiento local y distribución global.
Finalmente, la tabla “Top Datasets Más Consultados (Vistas)” lista los conjuntos de datos individuales con más tráfico, indicando su municipio, organización, recursos, vistas y descargas, con un acceso directo (ícono de acción) a cada dataset.
Top de datasets más consultados por vistas.
## 6.4.2 Estadísticas Generales
Este reporte consolida mensualmente el avance de cada municipio en la publicación y actualización de sus datos abiertos. Permite monitorear el número de conjuntos de datos publicados, el porcentaje de actualización oportuna y el estado del plan de apertura de datos. El reporte se genera automáticamente y también puede exportarse en Excel y PDF.
Usa los mismos filtros de Municipios y de fecha (Desde / Hasta) que el reporte de Seguimiento para acotar la información.
- Al día: conjuntos de datos actualizados dentro del plazo esperado.
- Vencen pronto: conjuntos de datos cuya actualización está por vencer.
- Desactualizados: conjuntos de datos que ya superaron su plazo de actualización.
- Total conjuntos: el total de conjuntos de datos evaluados.
Estadísticas Generales: filtros del dashboard y resumen del estado de actualización.
La tabla “Estado del Semáforo de Recursos por Municipio” detalla, para cada municipio, sus organizaciones, datasets publicados, datasets desactualizados, y el conteo de recursos en cada color del semáforo: Actualizados (verde), Por vencer (amarillo) y Vencidos (rojo).
Estado del semáforo de recursos por municipio.
El bloque “Consolidado Global de Formatos” muestra cuántos recursos existen en cada formato (CSV, JSON, GeoJSON, XLSX, entre otros) en todo el portal, junto con un gráfico de dona con la proporción de cada uno. Debajo, “Comparativa de Formatos por Municipio” desglosa esos mismos formatos en un gráfico de barras por municipio.
Consolidado global de formatos y comparativa de formatos por municipio.
Por último, la tabla “Detalle de Formatos e Infraestructura” lista, para cada municipio, la URL de su portal territorial, los formatos disponibles con su cantidad, y el total de recursos publicados.
Detalle de formatos e infraestructura por municipio.
## 6.5 Cosecha
La pestaña "" te lleva directamente al listado de fuentes de cosecha. El resto de este manual, desde la sección 10 en adelante, explica en detalle cómo crear y administrar esas fuentes.
# 7. Crear una Dependencia
Cada municipio o entidad federada necesita su propia Dependencia dentro del portal, para que sus datos cosechados queden agrupados bajo su nombre:
Paso 1: Ve a la pestaña Dependencia en el menú superior.
Paso 2: Presiona Agregar Dependencia.
Paso 3: Escribe el nombre del municipio o entidad (por ejemplo, Municipio de Alcalá) y guarda.
# 7.1. Administrar Dependencia
Una vez estemos en una dependencia podremos administrar, dando clic al botón de “Administrar”, aquí podremos editar información de la dependencia además de poder agregar miembros.
Al entrar a la dependencia si se tiene el rol de administrador de la dependencia saldrá el botón de Administrar.
## 7.2 Editar la información de la dependencia
Desde la ventana de editar podremos editar el nombre de la dependencia, su descripción y si se requiere igual su imagen.
## 7.3 Ver y gestionar los miembros de la dependencia
En la pestaña "Miembros" ves la lista de personas que pertenecen a la dependencia junto con su rol. Desde ahí puedes editar el rol de alguien (ícono de llave) o quitarlo de la dependencia (ícono rojo X). El botón "CSV" exporta el listado de miembros, y el botón "Agregar Miembro" abre el formulario para sumar a alguien nuevo.
Desde la pestaña "Miembros" de tu Dependencia puedes:
- Ver la lista de personas que pertenecen a tu Dependencia y el rol que tiene cada una.
- Remover: a una persona de tu Dependencia cuando ya no deba tener acceso.
## 7.4 Cómo agregar un miembro o invitar a una persona por correo electrónico
Al presionar "Agregar Miembro" hay dos formas de sumar a alguien a la dependencia:
- Usuario existente: si la persona ya tiene una cuenta en la plataforma, búscala por su nombre de usuario en el campo correspondiente.
- Usuario nuevo (invitación por correo electrónico): si la persona todavía no tiene cuenta, escribe su correo electrónico. El sistema le envía una invitación para crear su cuenta y unirse directamente a esta dependencia.
En ambos casos, elige el Rol (Miembro) que va a tener la persona dentro de la dependencia y presiona "Agregar Miembro".
Pestaña Miembros de la Dependencia, con el formulario para agregar o invitar.
# 8. Cómo crear una temática
## 8.1 Crear una temática
Además de las Dependencias, la plataforma permite agrupar conjuntos de datos por Temática (llamadas "Grupos" en la configuración interna). A diferencia de la Dependencia —que identifica a la entidad que publica el dato—, una temática agrupa conjuntos de datos de una o varias Dependencias bajo un mismo tema, por ejemplo Salud, Educación o Medio Ambiente.
Paso 1: Entra a la opción "Temáticas" del menú superior.
Paso 2: Presiona el botón "Adicionar Grupo".
Directorio de Temáticas (Grupos), con el botón "Adicionar Grupo".
Paso 3: Completa el formulario "Crear un Grupo": Nombre (la URL se genera automáticamente), Descripción, e Imagen (con "Upload" o "Link").
Paso 4: Presiona "Crear Grupo".
Formulario para crear una nueva temática (grupo).
## 8.2 Editar la información de la temática
Desde la página de una temática, presiona el botón "Administrador" (disponible para quienes tengan el rol de Administrador en esa temática).
El botón "Administrador" da acceso a la gestión de la temática.
En la pestaña "Editar" puedes modificar el Nombre, la Descripción, la "URL de la imagen" (con la opción de quitarla con "Remove") y agregar Campos Personalizados adicionales.
Edición de la información general de la temática.
## 8.3 Ver y gestionar los miembros de la temática
En la pestaña "Miembros" ves la lista de personas que pertenecen a la temática junto con su rol. Desde ahí puedes editar el rol de alguien (ícono de llave) o quitarlo de la temática (ícono rojo X). El botón "CSV" exporta el listado de miembros, y el botón "Agregar Miembro" abre el formulario para sumar a alguien nuevo.
Lista de miembros de una temática, con su rol.
## 8.3 Cómo agregar un miembro o invitar a una persona por correo electrónico
Al presionar "Agregar Miembro" hay dos formas de sumar a alguien a la temática:
- Usuario existente: si la persona ya tiene una cuenta en la plataforma, búscala por su nombre de usuario en el campo correspondiente.
- Usuario nuevo (invitación por correo electrónico): si la persona todavía no tiene cuenta, escribe su correo electrónico. El sistema le envía una invitación para crear su cuenta y unirse directamente a esta temática .
En ambos casos, elige el Rol que va a tener la persona dentro de la temática y presiona "Agregar Miembro".
Formulario para agregar un miembro existente o invitar a uno nuevo por correo electrónico.
## 8.4 Los dos roles dentro de una temática
Al elegir el rol, la plataforma explica claramente qué puede hacer cada uno:
- Administrador: puede agregar y asociar la temática al conjunto de datos y además administrar a los miembros de la temática (agregarlos, quitarlos o cambiar su rol).
- Miembro: puede agregar y asociar la temática al conjunto de datos
Los dos roles disponibles al agregar un miembro a una temática.
# 9. Buscar, explorar y descargar conjuntos de datos de los municipios
Como Administrador, tienes acceso a todos los conjuntos de datos importados de los municipios federados, sin restricciones de dependencia.
- Usa la pestaña Conjunto de Datos o la barra de búsqueda para encontrar información por municipio, tema o palabra clave.
- Cada conjunto de datos muestra sus recursos disponibles (XLSX, CSV, GeoJSON, PDF, entre otros), listos para explorar o descargar.
Recursos disponibles (XLSX, GeoJSON) de un conjunto de datos cosechado.
Listado de conjuntos de datos dentro de una fuente de cosecha.
Listado de archivos del conjunto de datos
# 10. ¿Qué es Harvester y para qué sirve?
Harvester (Cosechador) es el módulo que conecta automáticamente el portal con los catálogos de datos de otras fuentes externas —como los portales de los municipios— y copia sus metadatos (títulos, descripciones, etiquetas y enlaces de descarga) sin que tengas que subir cada archivo manualmente.
Cómo funciona: el sistema busca en la fuente externa → copia la información del catálogo → crea o actualiza los conjuntos de datos en el portal.
## Qué sí puede hacer
- Sincronizar portales: conectarse a otras instancias CKAN para replicar sus catálogos.
- Leer formatos estándar: importar catálogos en XML, JSON, RDF o RSS/Atom.
- Programar tareas: actualizarse solo cada día, semana o mes, sin intervención humana.
- Detectar cambios: actualizar un conjunto de datos si el municipio corrige algo en su fuente original.
- Mantener la propiedad: asignar los datos importados a la dependencia correspondiente.
# 11. Antes de crear una fuente: información que debes tener lista
Antes de registrar una nueva fuente de cosecha, reúne estos datos:
- URL del catálogo (Endpoint): la dirección web desde donde se van a extraer los metadatos. Por ejemplo, https://datosabiertos-alcala.enigmadev.co/catalog.rdf para un municipio, o su archivo data.json si es de otro tipo de portal.
- Tipo de cosechador: CKAN (si el origen es otra instancia CKAN), DCAT (si expone metadatos en RDF/XML) o WMS/CSW (si es un catálogo geográfico).
- Credenciales de acceso (si aplica): solo si el catálogo de origen no es público, en formato JSON, con la clave de acceso del origen. Si es público, se deja vacío.
# 12. Crear una fuente de cosecha (Harvest Source)
Paso 1: Inicia sesión y entra a las opciones de administración.
Paso 2: En el menú superior, haz clic en Cosechar (Harvest).
Paso 3: En la esquina superior derecha, presiona el botón verde Añadir fuente de cosecha
Botón para añadir una nueva fuente de cosecha.
Paso 4: Completa el formulario de registro:
Formulario de registro: URL, Título y Descripción.
- URL: la dirección exacta del catálogo externo, acompañada de /catalog.rdf
- Título: un nombre claro para identificar la fuente (ejemplo: Cosecha Municipio de Alcalá).
- Descripción: qué datos se están importando y quién es el proveedor.
Tipo de fuente, frecuencia de actualización y dependencia responsable.
- Tipo de fuente (Source type): CKAN, Generic DCAT RDF Harvester, entre otros, según el estándar que use el municipio de origen.
- Frecuencia de actualización (Update frequency): Manual, Diaria, Semanal o Mensual.
- Configuración (Configuration): opcional, en formato JSON, solo si necesitas credenciales de acceso o filtros avanzados. Si la fuente es pública, se deja en blanco.
- Dependencia: el municipio o entidad que va a quedar como responsable de los datos importados. Solo los miembros de esa dependencia podrán editar o eliminar esta fuente más adelante.
Paso 5: Presiona Save (Guardar). La fuente queda registrada y aparece en el listado.
Listado de fuentes de cosecha registradas en este ambiente.
# 13. El panel de control de una fuente
Después de guardar, cada fuente tiene su propio panel de control, con tres pestañas: Panel, Jobs y Editar.
El botón Administrador, en la esquina superior derecha, es el acceso exclusivo para iniciar cosechas manuales, editar la fuente o pausarla.
Botón Administrador, acceso a las acciones de gestión de la fuente.
La pestaña Panel muestra el resultado de la última cosecha (Last Harvest Job): errores, agregados (added), actualizados (updated) y eliminados (deleted).
Panel de una fuente: nombre, descripción y total de conjuntos de datos cosechados.
# 14. Ejecutar una cosecha manual (Harvest Now)
La primera vez que registras una fuente, el sistema no trae los datos de inmediato: debes iniciar el primer ciclo de forma manual.
Paso 1: Entra a Cosechar y haz clic sobre el título de la fuente.
Paso 2: Presiona el botón Administrador en la esquina superior derecha.
Paso 3: Busca y haz clic en el botón Recosecha
El estado cambia a En progreso mientras el sistema lee la fuente externa.
# 15. Revisar el historial de ejecuciones
Cada vez que se ejecuta una cosecha (manual o programada) se genera un trabajo. En la pestaña Jobs puedes ver el historial completo:
Historial de ejecuciones (Harvest Jobs).
- 🟢 Nuevos (added): conjuntos de datos que no existían y fueron creados desde cero.
- 🟡 Actualizados (updated): conjuntos de datos que ya existían y cambiaron en la fuente externa.
- 🔴 Errores (errors): registros que fallaron durante el proceso de copia.
Cada Job tiene un ID único, y las horas de inicio (Started) y fin (Finished), útiles para detectar patrones — por ejemplo, si un job falla siempre el mismo día o a la misma hora.
# 16. Editar una fuente de cosecha
Desde la pestaña Editar puedes ajustar los parámetros de una fuente sin borrarla y volver a crearla:
Pestaña Editar de una fuente de cosecha.
- Cambiar la URL si el municipio migró su catálogo a otra dirección.
- Cambiar la Dependencia responsable.
- Cambiar el Tipo de fuente si necesitas mejorar la calidad de los metadatos importados.
- Ajustar la Configuración (JSON) para filtrar qué se importa, o cambiar el horario de ejecución.
Nota: los cambios afectan las próximas ejecuciones, pero no modifican los datos que ya fueron importados con éxito, a menos que hagas una limpieza y re-cosecha (ver sección 19).
# 17. Verificar los datos importados en el portal público
Cuando un Job termina en estado Completado (Finished), los datos quedan publicados de inmediato. Para confirmar que todo se ve bien:
Paso 1: Ve a Dependencias y entra a la dependencia que asignaste al crear la fuente.
Paso 2: Verifica que los nuevos conjuntos de datos aparezcan en el listado público.
Paso 3: Abre uno de los datasets importados y confirma que se vean el título, la descripción y los recursos (enlaces de descarga).
Al final de la página vas a ver una leyenda automática indicando que ese conjunto de datos fue importado desde la fuente original.
Conjunto de datos ya importado, visible en el portal público, con su fuente de origen.
# 18. Pausar o eliminar una fuente de cosecha
- Pausar: si solo quieres detener la sincronización automática por un tiempo, ve a Administrador → Editar → cambia la Frecuencia a Manual → Guardar. La fuente queda congelada hasta que la actives de nuevo a mano. (Disponible sólo visible cuando se está ejecutando la cosecha)
- Eliminar: si el convenio con el municipio terminó o la fuente ya no existe, ve a Administrador y presiona el botón rojo Eliminar (Delete).
# 19. Ayuda y accesibilidad
En el lado derecho de todas las páginas vas a ver una barra flotante con varios íconos que te ayudan a adaptar el portal a tus necesidades:
- Cambiar el contraste de colores.
- Cambiar el tamaño del texto (más grande o más pequeño).
- Hablar con el asistente virtual (ícono de chat) si tienes una pregunta rápida.
- Ver documentos de ayuda.
- Contactar al equipo del portal.
- Ver los atajos de teclado disponibles.
Puedes cerrar esta barra en cualquier momento con la X.
