import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/tboh-doc/blog',
    component: ComponentCreator('/tboh-doc/blog', 'a56'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/archive',
    component: ComponentCreator('/tboh-doc/blog/archive', '5da'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/authors',
    component: ComponentCreator('/tboh-doc/blog/authors', 'a28'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/tboh-doc/blog/authors/all-sebastien-lorber-articles', '265'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/authors/yangshun',
    component: ComponentCreator('/tboh-doc/blog/authors/yangshun', '0b0'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/first-blog-post',
    component: ComponentCreator('/tboh-doc/blog/first-blog-post', 'c7e'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/long-blog-post',
    component: ComponentCreator('/tboh-doc/blog/long-blog-post', '221'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/mdx-blog-post',
    component: ComponentCreator('/tboh-doc/blog/mdx-blog-post', '09f'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/tags',
    component: ComponentCreator('/tboh-doc/blog/tags', '2ff'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/tags/docusaurus',
    component: ComponentCreator('/tboh-doc/blog/tags/docusaurus', '141'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/tags/facebook',
    component: ComponentCreator('/tboh-doc/blog/tags/facebook', '4fb'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/tags/hello',
    component: ComponentCreator('/tboh-doc/blog/tags/hello', 'f23'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/tags/hola',
    component: ComponentCreator('/tboh-doc/blog/tags/hola', '0dc'),
    exact: true
  },
  {
    path: '/tboh-doc/blog/welcome',
    component: ComponentCreator('/tboh-doc/blog/welcome', '49d'),
    exact: true
  },
  {
    path: '/tboh-doc/markdown-page',
    component: ComponentCreator('/tboh-doc/markdown-page', 'c90'),
    exact: true
  },
  {
    path: '/tboh-doc/docs',
    component: ComponentCreator('/tboh-doc/docs', 'c31'),
    routes: [
      {
        path: '/tboh-doc/docs',
        component: ComponentCreator('/tboh-doc/docs', 'ec9'),
        routes: [
          {
            path: '/tboh-doc/docs',
            component: ComponentCreator('/tboh-doc/docs', 'fd7'),
            routes: [
              {
                path: '/tboh-doc/docs/api/autenticacion',
                component: ComponentCreator('/tboh-doc/docs/api/autenticacion', '8f9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/api/codigos-de-error',
                component: ComponentCreator('/tboh-doc/docs/api/codigos-de-error', 'a8a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/api/ejemplos-de-uso',
                component: ComponentCreator('/tboh-doc/docs/api/ejemplos-de-uso', 'fe6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/api/endpoints',
                component: ComponentCreator('/tboh-doc/docs/api/endpoints', '2fb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/api/introduccion-api',
                component: ComponentCreator('/tboh-doc/docs/api/introduccion-api', 'fa9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/arquitectura/estructura-del-proyecto',
                component: ComponentCreator('/tboh-doc/docs/arquitectura/estructura-del-proyecto', '89f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/arquitectura/stack-tecnologico',
                component: ComponentCreator('/tboh-doc/docs/arquitectura/stack-tecnologico', '97c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/arquitectura/vista-general',
                component: ComponentCreator('/tboh-doc/docs/arquitectura/vista-general', 'c4c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/base-de-datos/esquema',
                component: ComponentCreator('/tboh-doc/docs/base-de-datos/esquema', '5fd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/changelog/version-actual',
                component: ComponentCreator('/tboh-doc/docs/changelog/version-actual', 'b59'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/configuracion/configuracion-de-servicios',
                component: ComponentCreator('/tboh-doc/docs/configuracion/configuracion-de-servicios', '5af'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/configuracion/integraciones-externas',
                component: ComponentCreator('/tboh-doc/docs/configuracion/integraciones-externas', 'fcb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/configuracion/variables-de-entorno',
                component: ComponentCreator('/tboh-doc/docs/configuracion/variables-de-entorno', 'c53'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/despliegue/ambientes',
                component: ComponentCreator('/tboh-doc/docs/despliegue/ambientes', 'ff9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/despliegue/configuracion-de-servidores',
                component: ComponentCreator('/tboh-doc/docs/despliegue/configuracion-de-servidores', '34b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/despliegue/docker',
                component: ComponentCreator('/tboh-doc/docs/despliegue/docker', '95b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/despliegue/monitoreo-alertas',
                component: ComponentCreator('/tboh-doc/docs/despliegue/monitoreo-alertas', '53d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/despliegue/pipeline-ci-cd',
                component: ComponentCreator('/tboh-doc/docs/despliegue/pipeline-ci-cd', 'ade'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/faq/preguntas-frecuentes',
                component: ComponentCreator('/tboh-doc/docs/faq/preguntas-frecuentes', 'c83'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/guia-inicio/configuracion-inicial',
                component: ComponentCreator('/tboh-doc/docs/guia-inicio/configuracion-inicial', 'b31'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/guia-inicio/instalacion',
                component: ComponentCreator('/tboh-doc/docs/guia-inicio/instalacion', 'c3f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/guias/gestion-de-campanas',
                component: ComponentCreator('/tboh-doc/docs/guias/gestion-de-campanas', '4f8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/guias/gestion-de-clientes',
                component: ComponentCreator('/tboh-doc/docs/guias/gestion-de-clientes', 'd07'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/guias/gestion-de-usuarios',
                component: ComponentCreator('/tboh-doc/docs/guias/gestion-de-usuarios', 'd9c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/guias/operaciones-comunes',
                component: ComponentCreator('/tboh-doc/docs/guias/operaciones-comunes', '7b3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/intro',
                component: ComponentCreator('/tboh-doc/docs/intro', '23c'),
                exact: true
              },
              {
                path: '/tboh-doc/docs/introduction/bienvenida',
                component: ComponentCreator('/tboh-doc/docs/introduction/bienvenida', 'f85'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/introduction/caracteristicas-principales',
                component: ComponentCreator('/tboh-doc/docs/introduction/caracteristicas-principales', '2dc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/introduction/casos-de-uso',
                component: ComponentCreator('/tboh-doc/docs/introduction/casos-de-uso', 'bb5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/introduction/requisitos-previos',
                component: ComponentCreator('/tboh-doc/docs/introduction/requisitos-previos', 'dff'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/inventario/ambientes/desarrollo',
                component: ComponentCreator('/tboh-doc/docs/inventario/ambientes/desarrollo', '5b3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/inventario/ambientes/produccion',
                component: ComponentCreator('/tboh-doc/docs/inventario/ambientes/produccion', 'a0b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/inventario/ambientes/staging',
                component: ComponentCreator('/tboh-doc/docs/inventario/ambientes/staging', 'd4a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/inventario/servicios-externos/apis-integradas',
                component: ComponentCreator('/tboh-doc/docs/inventario/servicios-externos/apis-integradas', '6d0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/inventario/servicios-externos/base-de-datos',
                component: ComponentCreator('/tboh-doc/docs/inventario/servicios-externos/base-de-datos', '0b8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/inventario/servicios-externos/servicios-cloud',
                component: ComponentCreator('/tboh-doc/docs/inventario/servicios-externos/servicios-cloud', '50d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/mermaid/mermaid-test',
                component: ComponentCreator('/tboh-doc/docs/mermaid/mermaid-test', 'cf8'),
                exact: true
              },
              {
                path: '/tboh-doc/docs/seguridad/autenticacion-autorizacion',
                component: ComponentCreator('/tboh-doc/docs/seguridad/autenticacion-autorizacion', 'cb8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/seguridad/mejores-practicas',
                component: ComponentCreator('/tboh-doc/docs/seguridad/mejores-practicas', 'f4f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/soporte/involucrados',
                component: ComponentCreator('/tboh-doc/docs/soporte/involucrados', 'f76'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/soporte/reportar-bug',
                component: ComponentCreator('/tboh-doc/docs/soporte/reportar-bug', '96e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/tboh-doc/docs/tutorial-basics/congratulations', '239'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/tboh-doc/docs/tutorial-basics/create-a-blog-post', '285'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/tboh-doc/docs/tutorial-basics/create-a-document', 'ca6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/tboh-doc/docs/tutorial-basics/create-a-page', '07d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/tboh-doc/docs/tutorial-basics/deploy-your-site', '2d1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/tboh-doc/docs/tutorial-basics/markdown-features', '0b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/tboh-doc/docs/tutorial-extras/manage-docs-versions', 'd7a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tboh-doc/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/tboh-doc/docs/tutorial-extras/translate-your-site', '9d9'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/tboh-doc/',
    component: ComponentCreator('/tboh-doc/', '10c'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
