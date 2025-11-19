---
sidebar_position: 1
sidebar_label: "Instalacion"
title: "Instalacion"
hide_title: false
---

## Backend (.NET + SQL Server)

### Requisitos
- .NET 8 SDK.
- Instancia de SQL Server (local o Azure) con el esquema `tboh-database.sql` aplicado.
- Variables de entorno: `DbConnectionString` para la API y `DefaultConnection` para los jobs.

### Variables de entorno
| Variable | Servicio | Descripcion |
| --- | --- | --- |
| `DbConnectionString` | API (`tboh-backend`) | Cadena completa de SQL Server usada por Entity Framework. Puede declararse en `appsettings.json` o como variable de ambiente y apunta a la base `tboh-db-*`. |
| `TokenJwtKey` | API | Clave simetrica usada para firmar los JWT entregados en `/api/Login`. Cambiala por una cadena segura y mantenla en secreto. |
| `TokenExpirationMinutes` | API | Minutos que permanecera valido el JWT emitido (ej. `43200` = 30 dias). |
| `BaseRespondentUrl` | API | URL publica base usada para construir enlaces de encuestas para los encuestados. |
| `JobManualUrl` | API | Endpoint del Azure Function `SurveyRulesHttpTrigger` usado cuando se fuerza la republicacion de reglas desde la API. |
| `Twilio:AccountSid` | API | SID de la cuenta Twilio que envia los OTP de recuperacion. |
| `Twilio:AuthToken` | API | Token secreto Twilio para autorizar el envio. |
| `Twilio:ServiceSid` | API | SID del servicio de verificacion/OTP configurado en Twilio. |
| `Twilio:OtpMaxAttempts` | API | Numero maximo de intentos permitidos al validar un OTP. |
| `DefaultConnection` | Jobs (`tboh-jobs`) | Cadena de conexion que consumen las Azure Functions para recalcular estados. Debe apuntar a la misma base que la API. |
| `AzureWebJobsStorage` | Jobs | Storage account usada por Functions (en local puede ser `UseDevelopmentStorage=true`). |
| `FUNCTIONS_WORKER_RUNTIME` | Jobs | Debe permanecer como `dotnet-isolated`. |

### Pasos
1. Clona el repositorio y ubicate en `tboh-backend`.
2. Restaura paquetes y compila:
   ```bash
   dotnet restore
   dotnet build
   ```
3. Configura las variables anteriores como secretos del entorno (o en `appsettings.json` si es dev).
4. Ejecuta las migraciones o aplica el script `tboh-database.sql`.
5. Inicia la API:
   ```bash
   dotnet run
   ```
6. (Opcional) Construye la imagen Docker:
   ```bash
   docker build -t tboh-backend .
   docker run -p 5000:8080 --env DbConnectionString="..." tboh-backend
   ```

### Jobs (Azure Functions)
1. Ve a `tboh-jobs/tboh-jobs`.
2. Ajusta `local.settings.json` con `DefaultConnection`, `AzureWebJobsStorage` y cualquier secreto adicional.
3. Compila y ejecuta localmente:
   ```bash
   func start
   ```
4. Publica en Azure Functions cuando este listo:
   ```bash
   func azure functionapp publish <nombre-funcion>
   ```

## Frontend (Astro + React)

### Requisitos
- Node.js 20+.
- PNPM o npm (el proyecto incluye `pnpm-lock.yaml`).
- Variables `.env` con la URL del backend y claves de Auth (ejemplo en `.env.template`).

### Variables de entorno
| Variable | Descripcion |
| --- | --- |
| `AUTH_SECRET` | Clave utilizada por `auth-astro` para firmar y validar sesiones. Debe ser una cadena aleatoria de al menos 32 caracteres. |
| `AUTH_TRUST_HOST` | Define si se confia en la cabecera `Host` (usa `true` cuando despliegas detras de proxies). |
| `BACKEND_URL` | URL base (https://api.midominio.com) que consume el frontend para llamar a la API .NET. |
| `PUBLIC_EXCEL_TEMPLATE` | URL publica al archivo Excel que sirve como plantilla para cargar encuestados (se usa en el modulo de subida manual). |

### Pasos
1. Entra a `tboh-frontend`.
2. Instala dependencias:
   ```bash
   pnpm install
   # o
   npm install
   ```
3. Copia `.env.template` a `.env` y configura las variables anteriores.
4. Levanta el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
5. Construye y sirve en produccion:
   ```bash
   pnpm build
   pnpm preview
   ```
6. Uso con Docker:
   ```bash
   pnpm run docker:build
   pnpm run docker:run   # expone el puerto 4321
   ```