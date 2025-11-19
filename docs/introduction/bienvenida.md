---
hide_title: true
---
## Introduccion a TBOH

### Objetivo de la aplicacion
TBOH es una plataforma digital para gestionar encuestas de clientes corporativos: permite que los equipos internos configuren estudios, controlen la segmentacion de encuestados y consulten los resultados en un panel web. El objetivo principal es acelerar los ciclos de retroalimentacion convirtiendo los datos capturados en informacion accionable para areas comerciales y de experiencia al cliente.

### Funcionamiento a alto nivel
- **Frontend (tboh-frontend)**: construido en Astro + React + Tailwind, expone un portal tipo dashboard protegido con autenticacion JWT. Gestiona rutas publicas (login/recuperacion) y zonas privadas `/dashboard` con middleware que valida sesiones y aplica cabeceras de seguridad.
- **Backend (tboh-backend)**: API ASP.NET Core que centraliza la logica de negocio. Usa EF Core contra SQL Server, aplica inyeccion de dependencias para repositorios (autenticacion, catalogos, encuestas, resultados) y ofrece endpoints REST para el portal. Incluye Swagger con esquema Bearer para probar los servicios.
- **Jobs (tboh-jobs)**: Azure Functions en proceso aislado que consumen la misma base de datos. Ejecutan tareas programadas, como recalcular el estado de cada encuesta segun segmentacion, asignacion de encuestados, metas y ventanas de tiempo, o exponer un trigger HTTP para forzar ese calculo bajo demanda.
- **Comunicacion**: el frontend invoca endpoints del backend (`/api/Login`, catalogos, encuestas, resultados). El backend persiste cambios en SQL Server y publica informacion que los jobs consumen para mantener los estados operativos coherentes.

### Roles que participan
- **Administrador**: rol con acceso a toda la consola. Gestiona clientes, usuarios internos, catalogos y reglas globales. Puede ingresar a vistas restringidas como `/dashboard/clients` y `/dashboard/users`.
- **Administrador de Cliente / Project Manager**: usuarios asociados a un cliente especifico (`idClient` en los tokens). Configuran encuestas, definen segmentaciones multinivel y monitorean avance de campo. Acceden al modulo de resultados para su organizacion.
- **Analista de Resultados (mismo role cliente)**: perfiles centrados en la consulta y descarga de datos (Excel o PPT). Navegan por los dashboards, filtran por segmentos y exportan insumos para reportes ejecutivos.
- **Encuestado / Respondente**: no ingresa al portal, pero recibe accesos gestionados desde el backend (SurveyAccess) para responder los formularios externos; su progreso impacta los estados calculados por los jobs.

### Opciones y acciones disponibles
1. **Autenticacion y recuperacion**: iniciar sesion con credenciales corporativas, mantener sesion via JWT y restaurar acceso mediante flujo OTP/SMS (ForgotPasswordService).
2. **Administracion de clientes y usuarios**: crear/editar clientes, asignar responsables, gestionar catalogos y roles internos.
3. **Gestion de encuestas**: crear encuestas, definir metas (`QttyGoal`), calendarios (`InitDate`/`EndDate`), segmentacion multinivel (pais, departamento, gerencia, etc.) y carga de listados de encuestados.
4. **Control de accesos y reglas**: otorgar acceso a encuestados, configurar reglas automaticas mediante `SurveyRulesJobService` y forzar recalculados via endpoint HTTP cuando se requiera.
5. **Resultados y analitica**: consultar paneles en `/dashboard/results`, ver KPIs de avance, revisar respuestas individuales, descargar datos en Excel (`DownloadSurveyDataService`) o generar presentaciones ejecutivas (`DonwloadPptResultsService`).
6. **Monitoreo automatizado**: apoyarse en los jobs programados para mantener el estado de cada encuesta (Sin iniciar, En curso, Finalizada, Esperando fecha) sin intervencion manual, asegurando alertas y priorizacion correcta en la consola.

Este resumen sirve como punto de partida para nuevos miembros del equipo, detallando que resuelve TBOH, como se reparte la logica entre los componentes y que capacidades ofrece a cada rol involucrado.
