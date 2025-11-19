---
sidebar_position: 3
sidebar_label: "Endpoints"
title: "Catalogo de Endpoints"
hide_title: false
---

> Base URL: `/api`. Todos los endpoints retornan un envoltorio `ResponseDTO` con `status`, `message` y `data`, salvo cuando se devuelven archivos binarios. Cuando un controlador usa `[ValidateToken]`, debe enviarse `Authorization: Bearer <JWT>` emitido por el endpoint de login.

## Autenticacion

### `POST /api/Login`
- **Body (JSON)** `LoginRequestDto`:
  ```json
  { "email": "usuario@dominio.com", "password": "string" }
  ```
- **Respuesta**: `LoginResponseDTO` con token JWT y datos de rol/cliente.

### `POST /api/Login/EncryptPassword`
- **Body**: cadena `password` (texto plano) para obtener la version cifrada (uso interno).

### `POST /api/ForgotPassword/SendOtp`
- **Body** `ForgotPasswordRequestDto`:
  ```json
  { "email": "usuario@dominio.com" }
  ```
- Envia OTP via Twilio al correo/usuario.

### `POST /api/ForgotPassword/ValidateOtp`
- **Body** `ValidateOtpRequestDto`:
  ```json
  { "email": "usuario@dominio.com", "otp": "123456" }
  ```
- Devuelve token temporal de recuperacion si el OTP coincide.

### `POST /api/ForgotPassword/UpdatePassword`
- **Auth**: requiere token de recuperacion (`ValidateToken("Recovery")`).
- **Body**: cadena `password` con la nueva contrasena.

## Usuarios y roles

### `POST /api/users/CreateUser`
- **Auth**: `Administrador`.
- **Body** `UserCreateDto`:
  ```json
  {
    "name": "Nombre",
    "lastName": "Apellido",
    "email": "mail@dominio.com",
    "password": "Temporal123",
    "idClient": 10,          // opcional para rol Cliente
    "idRole": 1              // Id del catalogo de roles
  }
  ```

### `GET /api/users/GetUsers`
- **Auth**: `Administrador`.
- Listado completo (`UserListDto`).

### `PUT /api/users/updateUser/{id}`
- **Auth**: `Administrador`.
- **Body** `UpdateUserDto` (nombre, idClient, password opcional, idRole, status).

### `GET /api/UserCatalog/roles`
- **Auth**: `Administrador`.
- Devuelve catalogo de roles.

### `GET /api/UserCatalog/clients`
- **Auth**: `Administrador`.
- Catalogo compacto de clientes disponibles para asignar a usuarios.

## Administracion de clientes

### `GET /api/ClientInformation/GetClients`
- **Auth**: `Administrador`.
- Lista extendida de clientes (`GetAllClientsDto`).

### `GET /api/ClientInformation/GetActiveClientsCatalog`
- **Auth**: `Administrador` o `Cliente`.
- Solo clientes activos (Id y variacion de textos).

### `GET /api/ClientInformation/GetClientById/{clientId}`
- **Auth**: `Administrador` o `Cliente`.

### `POST /api/ClientInformation/CreateClient`
- **Auth**: `Administrador`.
- **Body** `ClientDto` (nombre, `surveysAvailable`, `idClientLabelVariation`).

### `PUT /api/ClientInformation/UpdateClient/{id}`
- **Auth**: `Administrador`.
- **Body** `ClientDto` (mismos campos, actualiza cliente existente).

### `PUT /api/ClientInformation/toggle-status/{id}`
- **Auth**: `Administrador`.
- Cambia `Status` del cliente (activo/inactivo).

### `DELETE /api/ClientInformation/DeleteClient/{idClient}`
- **Auth**: `Administrador`.

### `GET /api/ClientCatalog/client-variations`
- **Auth**: `Administrador`.
- Catalogo de textos/variaciones (ej. default vs Ingenio).

## Encuestas (SurveyController)

### `GET /api/Survey/access/{accessIdEncrypted}`
- Devuelve estructura completa de la encuesta para el encuestado identificado por el `accessIdEncrypted` (GUID cifrado). Si la encuesta es nombrada, valida que no se haya llenado antes.

### `GET /api/Survey/GetSurveys/{idClient}`
- **Auth**: `Administrador` o `Cliente`.
- Lista resumida de encuestas del cliente.

### `POST /api/Survey/CreateSurvey`
- **Auth**: `Administrador` o `Cliente`.
- **Body** `CreateSurveyDto`:
  ```json
  {
    "idClient": 10,
    "name": "Diagnostico Q1",
    "qttyGoal": 500,
    "initDate": "2025-01-15T00:00:00Z",
    "endDate": "2025-02-28T00:00:00Z",
    "surveyTypeId": 1,
    "idSurveySections": [1,2,3]
  }
  ```

### `GET /api/Survey/GetSurveyDetailsById/{idClientSurveys}`
- **Auth**: `Administrador` o `Cliente`.
- Devuelve `SurveyDetailDto` con secciones, segmentaciones y reglas activas.

### `POST /api/Survey/SaveSurveyAnswers/{accessIdEncrypted}`
- **Body** `SaveSurveyAnswersDto`:
  ```json
  {
    "clientSurveyId": 12,
    "personalData": {
      "genderId": 1,
      "workseniorityId": 2,
      "ageRangeId": 3,
      "countryId": 5,
      "departmentId": 9,
      "managementId": 21,
      "level4Id": 33
    },
    "survey": [
      {
        "clientSurveySectionsId": 7,
        "questions": [
          { "questionId": 101, "optionAnswerId": 3 },
          { "questionId": 102, "openAnswer": "Comentario" }
        ]
      }
    ]
  }
  ```
- Marca como respondida si la encuesta es nombrada.

### `DELETE /api/Survey/DeleteSurvey/{idSurvey}`
- **Auth**: `Administrador` o `Cliente`.

### Actualizaciones parciales
- **PUT `/api/Survey/UpdateSurveyName/{id}`** — cuerpo `UpdateSurveyNameDTO { name, idCurrentSurveyStatus }`.
- **PUT `/api/Survey/UpdateSurveyDates/{id}`** — `UpdateSurveyDatesDTO { initDate, endDate, idCurrentSurveyStatus }`.
- **PUT `/api/Survey/UpdateSurveySections/{id}`** — `UpdateSurveySectionsDTO { idSections[], idCurrentSurveyStatus }`.
- **PUT `/api/Survey/UpdateSurveyQttyGoal/{id}`** — `UpdateSurveyQttyGoalDTO { qttyGoal }`.
- **PUT `/api/Survey/UpdateSurveyType/{id}`** — `UpdateSuveyTypeDTO { idSurveyType, idCurrentSurveyStatus }`.

## Segmentacion organizacional

Los endpoints viven en `SurveySegmentationController` y requieren token (`Administrador` o `Cliente`). Todos devuelven `ResponseDTO` con la entidad creada/actualizada.

### Creacion (`POST`)
| Ruta | Body | Descripcion |
| --- | --- | --- |
| `/api/SurveySegmentation/country` | `CountryRequestDto { idClientSurvey, name }` | Nivel 1 (pais). |
| `/department` | `DepartmentRequestDto { idClientSurvey, name, idCountry }` | Nivel 2. |
| `/management` | `ManagementRequestDto { idClientSurvey, name, idDepartment }` | Nivel 3. |
| `/chief` | `ChiefRequestDto { idClientSurvey, name, idManagement }` | Nivel 4. |
| `/responsible` | `ResponsibleRequestDto { idClientSurvey, name, idChief }` | Nivel 5. |
| `/supervisor` | `SupervisorRequestDto { idClientSurvey, name, idResponsible }` | Nivel 6. |
| `/auxiliary` | `AuxiliaryRequestDto { idClientSurvey, name, idSupervisor }` | Nivel 7. |

### Lectura (`GET`)
- `/api/SurveySegmentation/countries/{idClientSurvey}` (similar para `departments`, `managements`, `chiefs`, `responsibles`, `supervisors`, `auxiliaries`) devuelven las jerarquias existentes.

### Actualizacion (`PUT`)
- `/api/SurveySegmentation/actualizacion/segmentacion/{level}/{id}` recibe un JSON `UpdateSegmentDto { name }` (el controlador valida el campo `Name`) y dispara el job para recalcular reglas.

### Eliminacion (`DELETE`)
- `/api/SurveySegmentation/{level}/{id}` borra el nodo indicado (country, department, management, chief, responsible, supervisor, auxiliary).

## Gestion de encuestados (SurveyUserAccessController)

### `DELETE /api/SurveyUserAccess/delete?userId={guid}`
- **Auth**: `Administrador` o `Cliente`.
- Elimina al encuestado y recalcula reglas.

### `POST /api/SurveyUserAccess/upload-excel`
- **Auth**: `Administrador` o `Cliente`.
- **Content-Type**: `multipart/form-data`.
- Campos: `file` (xlsx con columnas esperadas) y `idClientSurveys`.

### `POST /api/SurveyUserAccess/add-manual`
- **Body** `SurveyUserAccessManualDto { name, lastName, email, idClientSurveys }`.

### `GET /api/SurveyUserAccess/get-respondants`
- Query params: `idClientSurveys`, `pageIndex`, `pageSize`, `searchTerm`, `sortOrder`.

### `GET /api/SurveyUserAccess/export-excel?idClientSurveys={id}`
- Descarga Excel con los encuestados cargados.

## Resultados y analitica (`SurveyResultsController`)

Todos los endpoints requieren token (`Administrador` o `Cliente`) salvo donde se especifique.

### Indicadores (POST + filtros)
Cada endpoint recibe `SurveyFilterDto` en el body (listas de IDs para genero, edad, seniority y niveles 1-7).
| Ruta | Descripcion |
| --- | --- |
| `POST /api/survey-results/LQAResults/{clientSurveyId}` | Indice Life Quality. |
| `POST /api/survey-results/ENPSResults/{clientSurveyId}` | ENPS. |
| `POST /api/survey-results/experience-analysis-results/{clientSurveyId}` | Analisis de experiencia. |
| `POST /api/survey-results/EmotionAnalisysResults/{clientSurveyId}?textVariationId=x&questionId=y` | Analisis de emociones por variacion textual (permite filtrar pregunta). |
| `POST /api/survey-results/happiness-results/{clientSurveyId}` | Indicador de felicidad. |

### Descargas/consultas auxiliares
- `GET /api/survey-results/DownloadEmotionAnalisysDataExcel/{clientSurveyId}?clientTextVariationId=&clientName=` (solo `Administrador`).
- `GET /api/survey-results/DownloadDemographicDataExcel/{clientSurveyId}`.
- `GET /api/survey-results/GetEmotionAnalisysQuestions?textVariationId=` devuelve catalogo de preguntas abiertas de emociones.
- `GET /api/survey-results/download-Survey-Data-excel?idClientSurvey=&idTextVariation=` exporta respuestas completas.
- `GET /api/survey-results/GetSurveyOpenAnswerQuestionsExcel/{clientSurveyId}?textVariationId=` descarga solo preguntas abiertas.
- `GET /api/survey-results/downloadPptx/{clientSurveyId}?clientTextVariation=&surveyName=` genera la presentacion ejecutiva (solo `Administrador`).

## Resultados (descarga de datos brutos)

### `GET /api/survey-results/GetEmotionAnalisysQuestions`
- **Query** `textVariationId`.
- Util para poblar selectores en el frontend antes de pedir resultados de emociones.

### `GET /api/survey-results/download-Survey-Data-excel`
- **Query** `idClientSurvey`, `idTextVariation`.
- Exporta todas las respuestas (incluye alias “Usuario anonimo” para encuestas anonimas).

## Catalogos y filtros miscelaneos

- `GET /api/ClientCatalog/client-variations` → variaciones de textos.
- `GET /api/UserCatalog/roles` y `GET /api/UserCatalog/clients` → catalogos para formularios.

## Buenas practicas para consumir la API

- Incluya `Authorization: Bearer <token>` siempre que un endpoint utilice `[ValidateToken]`. Para saber que roles acepta, revise la lista de parametros del atributo (ej. `"Administrador", "Cliente"`).
- Todos los metodos devuelven codigos HTTP semanticos (`200`, `400`, `401`, `403`, `404`, `500`). Verifique `response.status` y `response.message` antes de procesar `data`.
- Los endpoints que disparan recalculos (`SurveySegmentation`, `SurveyUserAccess`) invocan internamente `SurveyRulesJobService`. Tras una operacion masiva, espere unos segundos antes de consultar KPIs para asegurar que el job termino.

Con esta referencia puedes automatizar la integracion del frontend, crear scripts de mantenimiento o probar los servicios en herramientas como Postman/Insomnia respetando el contrato original del backend.
