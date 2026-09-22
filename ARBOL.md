# Árbol de flujo — Asistente ValleDATA

132 nodos. Los primeros 78 salen de los 7 manuales de usuario; los 54 restantes, de la rama
«Formación y normativa», salen de la Guía Institucional y de las 4 temáticas de capacitación.
Cada hoja cita la sección de la que salió.

## Estructura

```
MENÚ PRINCIPAL
│
├─ 1. Buscar datos ─────────────────── buscar_root
│   ├─ Buscar por palabra clave ...... buscar_palabra        [Ciudadano §3.1-3.2, §4]
│   ├─ Ver qué publicó cada entidad .. buscar_dependencia    [Ciudadano §9.1]
│   ├─ Buscar por tema ............... buscar_tematica       [Ciudadano §3.4, §9.2]
│   ├─ Tableros con gráficas ......... buscar_tablero        [Ciudadano §3.5]
│   ├─ Mi búsqueda no da resultados .. buscar_sin_resultados [Miembro §5 tip]
│   ├─ Ver datos privados ............ buscar_privados       [Miembro §1, §6]  🔒
│   └─ (página del conjunto) ......... ver_conjunto          [Ciudadano §5]
│
├─ 2. Descargar o ver un archivo ───── descargar_root
│   ├─ Descargarlo a mi equipo ....... descargar_archivo     [Ciudadano §6]
│   ├─ Verlo como tabla .............. explorar_tabla        [Ciudadano §7.1]
│   ├─ Descargar solo una parte ...... descargar_filtrado    [Ciudadano §7.1-7.2]  ★
│   ├─ Verlo en un mapa .............. ver_mapa              [Ciudadano §8]
│   ├─ Herramientas de la tabla ...... herramientas_tabla    [Ciudadano §7.2]
│   └─ Conectarme por API ............ api_datos             [Ciudadano §10]
│
├─ 3. Entender los datos ──────────── entender_root
│   ├─ Formatos ...................... formatos              [Ciudadano §11.1]
│   ├─ Qué significa cada columna .... diccionario_datos     [Ciudadano §7.3]
│   │   └─ No veo el diccionario ..... sin_diccionario       [Editor §8.3]
│   ├─ Ficha técnica del dato ........ metadatos             [Ciudadano §5, §11.1]
│   ├─ Qué son los datos abiertos .... datos_abiertos        [Ciudadano §11.1]
│   ├─ Licencias y reuso ............. licencias             [Ciudadano §11.1]
│   ├─ Marco normativo ............... marco_normativo       [Ciudadano §11.1]
│   ├─ Quién responde por cada dato .. quien_publica         [Ciudadano §11.1]
│   └─ Qué es CKAN ................... que_es_ckan           [Ciudadano §11.1]
│
├─ 4. No encuentro lo que busco ───── pedir_root
│   ├─ Pedir un dato que no está ..... disponibilidad_datos  [Ciudadano §3.6]
│   ├─ Contar una iniciativa ......... iniciativas           [Ciudadano §3.6]
│   ├─ Mi empresa usa estos datos .... empresas_reutilizadoras
│   ├─ Comentar o calificar .......... comentar_calificar    [Ciudadano §5]
│   ├─ Contactar al equipo ........... contacto              [Ciudadano §3.6, §12]
│   └─ (Centro de ayuda) ............. centro_ayuda          [Ciudadano §11]
│
├─ 5. Mi cuenta y acceso ──────────── cuenta_root                          🔒
│   ├─ Crear una cuenta .............. crear_cuenta          [Miembro §2]
│   ├─ Iniciar sesión (MFA) .......... iniciar_sesion        [Miembro §3]
│   ├─ Problema con el código ........ mfa_problema          [Admin §12.5]  ★
│   ├─ Olvidé mi contraseña .......... recuperar_contrasena  [Miembro §3.1]
│   ├─ Editar mi perfil .............. perfil_config         [Editor §4.2]
│   ├─ Tokens de API ................. tokens_api            [Editor §4.3]
│   ├─ Cambiar el idioma ............. idioma                [Ciudadano §3.7]
│   └─ Qué puede hacer cada rol ...... roles_explicados      [AdminDep §8.4]
│
├─ 6. Publicar datos ─────────────── publicar_root                        🔒 Editor+
│   ├─ Crear un conjunto ............. crear_dataset         [Editor §7]
│   │   ├─ Paso 1 — Información ...... crear_paso1           [Editor §7.1]
│   │   ├─ Paso 2 — Subir archivo .... crear_paso2           [Editor §7.2]
│   │   └─ Paso 3 — Previsualizar .... crear_paso3           [Editor §7.3]
│   ├─ Editar uno publicado .......... administrar_dataset   [Editor §8.1]
│   ├─ Asociarlo a una Temática ...... asociar_tematica      [Editor §8.2]
│   ├─ Administrar un recurso ........ administrar_recurso   [Editor §8.3]
│   │   └─ DataStore no procesa ...... datastore_problema    [Editor §8.3]  ★
│   ├─ Crear o editar Dependencia .... crear_dependencia     [AdminDep §7-8.1]
│   ├─ Gestionar miembros y roles .... miembros_dependencia  [AdminDep §8.2-8.4]
│   ├─ Crear Temática ................ crear_tematica        [Admin §9]
│   ├─ No veo el botón ............... no_veo_boton          [Editor §1, §7]  ★
│   └─ Panel del Sistema ............. panel_sistema         [Admin §12]     🔒 sysadmin
│       ├─ Administradores ........... administradores_sistema  [Admin §12.1]
│       ├─ Configuración y apariencia  config_sitio             [Admin §12.2]
│       ├─ Papelera y purgar ......... papelera_purgar          [Admin §12.3]
│       ├─ Tablero de Vigencia ....... tablero_vigencia         [Admin §12.4]
│       ├─ Gestión de MFA ............ gestion_mfa              [Admin §12.5]
│       ├─ Auditoría y trazabilidad .. auditoria                [Admin §12.6-12.7]
│       ├─ Estadísticas .............. estadisticas             [Admin §12.9]
│       ├─ Notificaciones por correo . notificaciones_correo    [Admin §12.10]
│       ├─ Editar Centro de ayuda .... centro_ayuda_editar      [Admin §13]
│       └─ Documentación API ......... api_swagger              [Admin §12.8]
│
├─ 7. Cosecha / federación ────────── harvest_root                        🔒
│   ├─ Qué es y cómo funciona ........ que_es_harvester      [AdminHarvest §10]
│   ├─ Crear una fuente .............. crear_fuente          [AdminHarvest §11-12]
│   ├─ Ejecutar cosecha manual ....... cosecha_manual        [AdminHarvest §13-14]
│   ├─ Historial (Jobs) .............. jobs_historial        [AdminHarvest §15]
│   ├─ Editar / pausar / eliminar .... editar_fuente         [AdminHarvest §16, §18]
│   ├─ Verificar importados .......... verificar_importados  [AdminHarvest §17]
│   ├─ Reportes y estadísticas ....... reportes_harvest      [AdminHarvest §6.4]
│   └─ Soy Miembro del ambiente ...... harvest_miembro       [MiembroHarvest §1-9]
│
├─ 8. Accesibilidad ───────────────── acces_root             [presente en los 7 manuales]
│
└─ 9. Formación y normativa ───────── formacion_root
    ├─ Qué es ValleDATA .............. valledata_root        [Guía Institucional]
    │   ├─ Qué es y para qué sirve ... valledata_que_es
    │   ├─ Los 14 municipios ......... valledata_municipios
    │   └─ Federación con datos.gov.co valledata_federacion
    │
    ├─ Cómo abrir datos .............. apertura_root         [Temática 1 §Cap 4]
    │   ├─ Fase 1: plan de apertura .. apertura_fase1
    │   │   ├─ Identificar activos ... apertura_activos      (RAI)
    │   │   ├─ Filtro legal .......... apertura_filtro_legal
    │   │   └─ Priorizar ............. apertura_priorizar
    │   ├─ Fase 2: estructurar ....... apertura_fase2
    │   │   └─ Cómo cargar ........... apertura_cargue       (ETL / manual / federación)
    │   ├─ Fase 3: que lo usen ....... apertura_fase3
    │   ├─ Fase 4: medir impacto ..... apertura_fase4
    │   ├─ Temas prioritarios ........ temas_prioritarios    [6 ejes MinTIC]
    │   └─ Los 6 principios .......... principios_apertura
    │
    ├─ Preparar un dato .............. calidad_root          [Temática 2]  ★
    │   ├─ Anonimizar ................ anonimizar_root
    │   │   └─ Fases 1 a 4 ........... anonimizar_fase1..4
    │   ├─ Qué puedo publicar ........ clasificacion_legal   [Ley 1712]
    │   ├─ Limpiar el archivo ........ limpieza_datos
    │   │   └─ Estándares por tipo ... estandares_tipo_dato  [ISO 8601, coordenadas]
    │   ├─ Metadatos DCAT ............ campos_dcat
    │   ├─ Título y descripción ...... titulo_descripcion
    │   ├─ Errores frecuentes ........ errores_root
    │   │   └─ 5 tipologías .......... errores_estructura, _tipo_dato,
    │   │                              _codificacion, _metadatos, _privacidad
    │   ├─ Rutina de revisión ........ validacion_semanal / validacion_quincenal
    │   ├─ Causas de despublicación .. causas_despublicacion  ★
    │   └─ Los 17 criterios .......... criterios_calidad
    │
    ├─ Usar los datos para decidir ... analitica_root        [Temática 3]
    │   ├─ Tipos de analítica ........ analitica_tipos
    │   ├─ Armar un indicador ........ indicador_hoja_vida / indicador_tipos
    │   ├─ Tablero de control ........ tablero_reglas
    │   ├─ Qué gráfico uso ........... grafico_cual_uso
    │   ├─ Contar con datos .......... historia_datos        [4 actos]
    │   ├─ Roles y RACI .............. roles_gobernanza / flujo_cargue
    │   └─ Ética algorítmica ......... etica_algoritmos
    │
    └─ Proteger la información ....... mspi_root             [Temática 4]
        ├─ Niveles de madurez ........ mspi_madurez
        ├─ La política ............... mspi_politica / mspi_dominios
        ├─ Plan anual (PSPI) ......... mspi_pspi
        └─ Riesgos ................... mspi_amenazas / mspi_riesgo

Nodos de sistema:  _fallback  ·  _handoff
```

🔒 requiere cuenta ★ nodo que resuelve una frustración real, no solo documenta

## Decisiones de diseño

**La raíz pregunta por intención, no por rol.** Los manuales están partidos por rol, pero un
ciudadano no sabe qué "rol" tiene. Las ramas 5, 6 y 7 hacen que el usuario se auto-identifique
sin tener que responder "¿qué sos?" en el primer mensaje.

**Ancho y corto.** 9 ramas raíz. Las 8 primeras tienen máximo 3 niveles hasta la respuesta;
la única excepción vieja es Publicar → Panel del Sistema, que solo ven administradores.
La rama 9 llega a 4 niveles porque agrupa material formativo, no procedimientos del portal.

**La rama 9 es para funcionarios, no para ciudadanos.** Las 8 primeras responden «cómo hago X
en el portal»; la 9 responde «cómo gestiono datos abiertos en mi alcaldía». Por eso sus nodos
llevan roles institucionales (`oficial_datos`, `enlace_tic`, `custodio`, `ciso`) y no los roles
de la plataforma.

**Enlazar en vez de duplicar.** Varios temas de las temáticas ya estaban cubiertos desde los
manuales (`formatos`, `licencias`, `datos_abiertos`, `marco_normativo`, `metadatos`,
`que_es_ckan`, `crear_paso1-3`, `quien_publica`). La rama 9 enlaza a esos nodos en lugar de
crear versiones paralelas, para que el bot no se contradiga según por dónde entre el usuario.

**Todo nodo vuelve al menú.** No hay callejones sin salida.

**Cinco nodos existen para problemas, no para documentar features.** `no_veo_boton`,
`mfa_problema`, `datastore_problema`, `sin_diccionario` y `buscar_sin_resultados` son los que
más tráfico van a recibir, porque son los momentos en que alguien se frustra y abre el chat.
Ninguno sale de un capítulo propio del manual: los armé cruzando notas dispersas.

## Cobertura frente a los manuales

| Manual | Secciones | Cubierto en el árbol |
|---|---|---|
| Guía del Ciudadano | 12 | Completo |
| Manual del Miembro | 11 | Completo |
| Manual del Editor | 11 | Completo |
| Admin. de Dependencia | 13 | Completo |
| Manual del Administrador | 14 | Completo |
| Administrador — Cosecha | 19 | Completo |
| Miembro — Cosecha | 9 | Completo |

Lo que **no** está en el árbol: detalles de capturas de pantalla, numeraciones internas de los
manuales, y las secciones duplicadas entre manuales (el Centro de ayuda aparece idéntico en
los 7 — está una sola vez).

## Cobertura frente a las temáticas de capacitación

Acá el criterio fue distinto: entra **solo lo accionable**, lo que un funcionario necesita para
hacer algo. La teoría queda fuera a propósito.

| Documento | Cubierto | Qué quedó afuera |
|---|---|---|
| Guía Institucional | Lo esencial | Arquitectura técnica (GCP, Kubernetes), cifras de impacto |
| Temática 1 — Fundamentos | Ciclo de vida completo | Evolución histórica, ecosistema de actores, incentivos |
| Temática 2 — Calidad | Casi completo | Los 17 criterios uno por uno y sus fórmulas de puntaje |
| Temática 3 — Analítica | Lo operativo | MIPG/FURAG, Big Data, tipos de modelo predictivo |
| Temática 4 — MSPI | Completo | — |

Los 17 criterios de calidad están resumidos en un solo nodo (`criterios_calidad`) en vez de uno
por criterio: las fórmulas de puntaje las calcula el portal, no el funcionario, y lo que sí
depende de él ya está cubierto en los nodos de limpieza, metadatos y anonimización.

Las tablas de 3 y 4 columnas de los documentos (taxonomía de analítica, principios de
visualización) se reescribieron como listas, porque el widget solo muestra bien tablas de
2 columnas en 380px de ancho.

## Inconsistencias detectadas en los manuales

Las anoto porque conviene corregirlas en los documentos, no en el bot:

1. **`Dependenciaes` / `Dependenciasy`** — errores de tipeo por buscar-y-reemplazar de
   "Organización" → "Dependencia". Aparecen en la Guía del Ciudadano §3.1, §3.3, §4 y §9.
2. **Guía del Ciudadano §1** — "ValleDATA es la página web las alcaldías municipales
   publican": falta "donde". Además omite a la Gobernación, que sí aparece en el Manual del Miembro.
3. **Manual del Miembro** — tiene dos secciones numeradas "4. Tu perfil", y el índice lista
   "9. Lo que no puedes hacer" pero en el cuerpo es la 11.
4. **Manual del Administrador de Dependencia** — el índice salta del 8 al 10.
5. **Manual del Administrador §12.6 y §12.7** — ambas se titulan "Seguimientos de conjuntos de
   datos y recursos", pero son cosas distintas: una es auditoría de datos (DCAT) y la otra es
   log de accesos. En el árbol las separé dentro de `auditoria`.
6. **Admin. Harvest §6.5** — «La pestaña "" te lleva…»: falta el nombre de la pestaña.
7. **Admin. Harvest §18** — el texto remite a "ver sección 19" para la re-cosecha, pero la 19
   es Ayuda y accesibilidad.
8. **Editor §1** — describe el rol Editor con una viñeta suelta que arranca "Editor:", como si
   fuera parte de una lista de tres, pero solo lista uno.

Ninguna impide construir el bot: el árbol ya está escrito con las correcciones aplicadas. Pero
conviene arreglarlas en los `.docx` originales, para no arrastrar el error a otros usos de esos
manuales.
