---
sidebar_position: 4
sidebar_label: "Requisitos previos"
title: "Requisitos previos"
hide_title: true
---

## Acceso administrativo inicial

### Superusuario de plataforma
- Contar con un usuario administrador creado en `Users` (backend) o provisionado via seed, con rol `Administrador` para poder ingresar al panel (`/dashboard`).
- Este usuario debe tener una contrasena valida o haber pasado por el flujo OTP de `ForgotPasswordService` para garantizar acceso seguro.

```mermaid
flowchart LR
    A[Seed o registro en Users] --> B{Rol asignado?}
    B -->|Si| C[Administrador]
    C --> D[OTP habilitado]
    D --> E[Acceso a /dashboard]
    B -->|No| F[Revisar permisos]
```

### Configuracion de clientes
- Crear al menos un registro en `CtgClients` (o desde `/dashboard/clients`) que incluya `ClientName`, `SurveysAvailable` y `IdClientTextVariation`.
- Asignar el administrador inicial como responsable del cliente para ver sus encuestas y KPIs.

```mermaid
flowchart LR
    Admin[Administrador] --> Create[Crear registro en CtgClients]
    Create --> Variation[Asignar IdClientTextVariation]
    Variation --> AssignUser[Vincular usuario cliente]
    AssignUser --> Ready[Cliente listo para operar]
```

## Gestion de usuarios y roles

### Administradores
- Solo el rol `Administrador` puede crear y editar clientes, asignar variaciones de textos y dar de alta usuarios finales desde `/dashboard/clients` o los endpoints del backend.
- Debe garantizar la existencia de al menos un usuario cliente por cada organizacion y mantener habilitado el flujo OTP para recuperaciones.

### Usuarios cliente
- Registrar usuarios con rol `Cliente` vinculandolos a su `IdClient`. Ellos pueden iniciar sesion, crear encuestas, gestionar segmentaciones y revisar KPIs, pero no tienen permisos para crear otros usuarios ni nuevos clientes.
- Validar que el token JWT incluya `idClient` y `role=Cliente` para que el middleware permita acceso a `/dashboard` unicamente a su organizacion.

```mermaid
graph TD
    AdminPerms[Administrador] -->|Crea clientes y usuarios| ClientUser[Usuario Cliente]
    ClientUser -->|Puede| OPS[Crear encuestas / ver KPIs]
    ClientUser -.->|No puede| CreateClients[Crear clientes]
    ClientUser -.->|No puede| CreateUsers[Crear usuarios]
```

## Variaciones de textos y catalogos base

### Variaciones de cliente
- Definir las variaciones en `CtgClientTextVariation` (p.ej. "Preguntas Predeterminadas", "Ingenio San Antonio").
- Asociar cada cliente a la variacion correcta (`CtgClients.IdClientTextVariation`). Si no hay personalizacion, usar la opcion predeterminada.

```mermaid
flowchart LR
    Variations[CtgClientTextVariation] -->|Seleccionar| Client(CtgClients)
    Client -->|Asignar Id| Frontend[Frontend]
    Frontend -->|Renderiza| Labels[Textos personalizados]
```

### Catalogos de preguntas y opciones
- Asegurar que existan registros en `CtgSurveySection`, `SurveyQuestions`, `CtgQuestionOptionTextVariation` y `CtgSurveyQuestionTextVariation` para cada variacion. Esto permite que el front-end renderice el formulario con los labels correctos.
- Revisar que las tablas de segmentacion (`SvSegmentLevel1Country`...`SvSegmentLevel7`) tengan datos iniciales si la encuesta requiere jerarquias predeterminadas.

```mermaid
flowchart LR
    Sections[CtgSurveySection] --> SectionQuestions[SurveySectionQuestions]
    SectionQuestions --> Questions[SurveyQuestions]
    Questions --> Texts[CtgQuestionOptionTextVariation / CtgSurveyQuestionTextVariation]
    Texts --> UI[Formulario en frontend]
    Segments[SvSegmentLevel1-7] --> UI
```

## Preparacion de encuestas

### Plantillas y secciones
- Disponer de secciones y preguntas listas en la base (tablas `ClientSurveySections`, `SurveySectionQuestions`) para que el usuario solo seleccione la configuracion desde el UI.
- Configurar metas (`QttyGoal`), fechas (`InitDate`, `EndDate`) y tipo (`IdSurveyType`) antes de lanzar la campana.

```mermaid
sequenceDiagram
    participant Admin
    participant DB
    participant UI
    Admin->>DB: Define ClientSurveySections / SurveySectionQuestions
    Admin->>UI: Ajusta QttyGoal, fechas, tipo
    UI->>DB: Guarda configuracion
```

### Segmentacion y encuestados
- Si la encuesta sera nombrada, cargar datos en `SurveyAccess` (o usar el modulo "Gestionar encuestados") para asociar correos/nombres.
- Si sera anonima, verificar que exista al menos un enlace en `SurveyRespondants` o que los jobs puedan generarlo.

```mermaid
flowchart LR
    Start[Tipo de encuesta] -->|Named| Access[SurveyAccess con correos]
    Start -->|Anonymous| Links[SurveyRespondants con enlaces]
    Access --> Dashboard[Modulo Gestionar encuestados]
    Links --> Dashboard
```

## Infraestructura y servicios externos

### Base de datos y strings de conexion
- Definir `DefaultConnection` (jobs) y `DbConnectionString` (backend) apuntando a la instancia SQL con todas las tablas creadas (`tboh-database.sql`).

```mermaid
flowchart LR
    Secrets[Variables de entorno] --> Backend[Backend .NET]
    Secrets --> Jobs[Azure Functions]
    Backend --> SQL[(SQL Server)]
    Jobs --> SQL
```

### Servicios de terceros
- Configurar credenciales para Twilio OTP (`IForgotPasswordService`), almacenamiento de archivos (si se usan exportaciones) y cualquier API de autenticacion necesaria.

```mermaid
flowchart LR
    OTP[Twilio OTP] --> Backend
    Storage[Storage/Export] --> Backend
    Backend --> Users[Usuarios]
```

## Automatizaciones y jobs

### Azure Functions
- Implementar `tboh-jobs` en Azure Functions o entorno compatible para ejecutar `ActualizarEstadosEncuestasFunction` y `SurveyRulesHttpTrigger`.
- Asegurar variables de entorno (connection strings, Application Insights) para que los jobs puedan conectar a la misma base.

```mermaid
flowchart LR
    Timer[TimerTrigger 0 0 8-19/2 * * 1-5] --> Jobs[ActualizarEstadosEncuestas]
    Http[SurveyRulesHttpTrigger] --> Jobs
    Jobs --> SQL[(SQL Server)]
    SQL --> Dashboard
```

### Monitoreo
- Tener habilitado logging y alertas para detectar fallos en recalculo de estados, envios de OTP o errores de autenticacion.

```mermaid
flowchart LR
    Logs[Application Insights / Logging] --> Alerts[Alertas]
    Alerts --> Equipo[Equipo Operaciones]
    Equipo --> Acciones[Corregir incidencias]
```
