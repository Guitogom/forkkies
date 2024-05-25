// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Forkkies API',
      version: '1.0.0',
      description: 'API documentation for Forkkies',
    },
    servers: [
      {
        url: 'https://api.forkkies.live',
        description: 'Production server',
      },
    ],
  },
  apis: ['./app.js'], // Rutas de tu API
};

const specs = swaggerJsdoc(options);

// swagger.js (continuación)
console.log('Swagger Specs:', specs); // Para verificar las especificaciones generadas

// swagger.js (continuación)
import swaggerUi from 'swagger-ui-express';

const swaggerDocsMiddleware = swaggerUi.setup(specs);
