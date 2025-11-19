---
sidebar_position: 3
sidebar_label: "Casos de uso"
title: "Casos de uso"
hide_title: true
---

## Caso 1. Inicio de sesion seguro

### Proposito
Permitir que los usuarios corporativos accedan al portal con autenticacion basada en credenciales y tokens JWT.

### Flujo
1. Usuario ingresa correo y contrasena en `/login`.
2. Frontend envia las credenciales al backend (`/api/Login`).
3. `LoginService` valida en la base de datos y devuelve token firmado con rol y `idClient`.
4. `auth-astro` guarda el token en la sesion y el middleware redirige a `/dashboard`.

## Caso 2. Configuracion de encuesta

### Proposito
Habilitar a administradores y PMs de cliente para crear encuestas con segmentacion avanzada.

### Flujo
1. Usuario crea una nueva encuesta definiendo fechas, meta (`QttyGoal`) y tipo.
2. Usa los modulos de segmentacion (`SurveySegmentService`) para cargar niveles 1-7 segun la estructura del cliente.
3. Registra encuestados o integra accesos (`SurveyUserAccessService`).
4. Guarda la encuesta; el backend persiste en SQL Server y queda lista para monitoreo.

## Caso 3. Observacion de estado automatico

### Proposito
Mantener actualizados los estados de las encuestas sin intervencion manual.

### Flujo
1. `ActualizarEstadosEncuestasFunction` corre cada dos horas en horario laboral.
2. `ClientSurveyRepository` reune segmentaciones, accesos y respuestas actuales.
3. Calcula el estado (Sin iniciar, En curso, Finalizada, Esperando) y actualiza la tabla `ClientSurveys`.
4. El frontend lee los nuevos estados y los muestra en el dashboard de avance.

## Caso 4. Recuperacion de acceso

### Proposito
Restaurar la cuenta de un usuario con MFA cuando olvida su contrasena.

### Flujo
1. Usuario solicita "Olvide mi contrasena".
2. Backend genera un OTP via `ForgotPasswordService` (Twilio) y lo envia por SMS.
3. Usuario ingresa el codigo, el servicio valida y permite definir una nueva contrasena.
4. El usuario vuelve al login y entra con sus nuevas credenciales.

## Caso 5. Consulta y descarga de resultados

### Proposito
Entregar a analistas reportes descargables con la ultima informacion de campo.

### Flujo
1. Analista navega a `/dashboard/results` y aplica filtros por segmento o fecha.
2. Frontend consulta al backend (`SurveyResultsService`) para graficos y KPIs.
3. Si necesita datos crudos, activa `DownloadSurveyDataService` para exportar a Excel.
4. Para presentaciones ejecutivas, usa `DonwloadPptResultsService` y descarga un PPT con insights clave.

## Caso 6. Recoleccion anonima mediante enlace compartido

### Proposito
Permitir campanas abiertas donde cualquier colaborador complete la encuesta sin identificarse.

### Flujo
1. Al crear la encuesta el administrador elige el tipo `anonymous` en el modal de configuracion (`survey-create-modal.tsx`).
2. El backend marca `surveyTypeId = 2`; al consultar el detalle (`survey-detail-page-cards.tsx`) `isAnon` queda en verdadero.
3. El dashboard muestra la carta "Compartir encuesta" con un unico `surveyRespondants.url`; el usuario copia el enlace con `SurveyCopyLink`.
4. Los encuestados acceden al enlace publico, llenan el formulario y las respuestas se registran sin asociarlas a individuos; los jobs siguen calculando el progreso total.

## Caso 7. Recoleccion nombrada con gestion de encuestados

### Proposito
Controlar campanas donde cada invitado es identificado y se rastrea su estado individual.

### Flujo
1. El administrador define la encuesta como `named` (`surveyTypeId = 1`) o la convierte desde el detalle con `SurveyTypeModal`.
2. En el dashboard aparece la carta "Gestionar encuestados"; desde ahi se cargan/editar registros asociados a `SurveyUserAccessService` y `SurveyAccess`.
3. Cada respondente recibe instrucciones personalizadas (correo/SMS) y su avance se refleja en el backend, lo que permite pausar o reenviar invitaciones.
4. Los KPIs (recibidas vs esperadas) muestran progreso comparando `surveyAnswerCount` con `qttyGoal`; los jobs utilizan los datos para mantener estados precisos.

## Caso 8. Formularios personalizados para Ingenio

### Proposito
Adaptar los labels y jerarquias del formulario inicial cuando el cliente utiliza la variacion "Ingenio San Antonio".

### Flujo
1. En la edicion de cliente (`client-edit-modal.tsx`) se selecciona la variacion "Ingenio San Antonio".
2. Cuando un encuestado abre la encuesta, `GeneralDataStep` carga el store `$surveyQuestions` y pasa el `variationName` a los pasos `Welcome` y `DataForm`.
3. Dentro de `DataForm` se ejecuta `transformBackendDataToFields`: si `variationName === 'Preguntas Predeterminadas'` se aplica `LEVEL_CONFIG_NOMBRADA` (labels Pais, Departamento, Gerencias, etc.); en cualquier otro caso se activa `LEVEL_CONFIG_INGENIO`, cambiando nombres y placeholders (Sedes o gerencias, Responsables, Auxiliares).
4. Las validaciones de `react-hook-form` se alimentan con el arreglo dinamico generado; asi se asegura que los campos obligatorios para Ingenio coincidan con su jerarquia real sin romper la estructura enviada al backend.
5. El usuario completa la informacion con la nomenclatura personalizada; los datos se envian al backend con las mismas llaves internas, permitiendo reportes consistentes aun cuando los labels visuales sean distintos.
