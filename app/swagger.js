import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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
  apis: ['./app.js'], // Aquí especificas dónde están las rutas de tu API
};

const specs = swaggerJsdoc(options);

console.log('Swagger Docs generated:', specs);

const swaggerDocs = (app) => {
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerDocs;
