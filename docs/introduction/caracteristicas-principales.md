---
sidebar_position: 2
sidebar_label: "Características principales"
title: "Características principales"
hide_title: true
---

## Caracteristicas principales de TBOH

- **Portal web moderno (Frontend)**: interfaz construida con Astro + React + Tailwind que entrega dashboards responsivos, autenticacion JWT via uth-astro y middleware con cabeceras de seguridad (CSP, HSTS, COOP/COEP) para proteger rutas sensibles como /dashboard.
- **API empresarial (Backend)**: ASP.NET Core expone endpoints REST para login, catalogos, encuestas y resultados; usa EF Core y un SQLEntityDbContext compartido, DI centralizada (DependencyInjection.cs) y Swagger con esquema Bearer para probar cada operacion.
- **Automatizacion operativa (Jobs)**: Azure Functions temporizadas recalculan el estado de las encuestas (Sin iniciar, En curso, Finalizada, Esperando) y ofrecen triggers HTTP para ejecutar reglas en caliente, garantizando que los paneles muestren KPIs actualizados.
- **Gestor integral de encuestas**: servicios de dominio coordinan creacion de estudios, segmentacion multinivel (niveles 1-7), carga de encuestados y control de accesos (SurveyUserAccessService), alineando a administradores y PMs de cliente.
- **Modulo de resultados accionables**: SurveyResultsService, DownloadSurveyDataService y DonwloadPptResultsService habilitan visualizacion de KPIs, descargas en Excel y generacion de presentaciones ejecutivas para analistas.
- **Flujo seguro de recuperacion**: ForgotPasswordService integra Twilio OTP para resetear credenciales, reforzando la continuidad de acceso sin exponer contrasenas.
- **Preparado para despliegue continuo**: repositorio del frontend incluye scripts Docker (docker:build, docker:run, deploy.sh), backend cuenta con Dockerfile y jobs se ejecutan como Functions aisladas listas para Azure, facilitando pipelines CI/CD.
