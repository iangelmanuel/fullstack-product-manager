import swaggerJSDoc from 'swagger-jsdoc'
import type { SwaggerUiOptions } from 'swagger-ui-express'

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Products',
        description: 'API for products in the store'
      }
    ],
    info: {
      title: 'REST API Node.js / Express / TypeScript',
      version: '1.0.0',
      description: 'API Docs for Products'
    }
  },
  apis: ['./src/router/productRoutes.ts']
}

export const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
      .topbar-wrapper .link {
          content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg');
          height: 80px;
          width: auto;
      }
      .swagger-ui .topbar {
        background-color: #2b3b45;
      }
  `,
  customSiteTitle: 'Documentación REST API Express / TypeScript'
}

export const swaggerSpec = swaggerJSDoc(options)
