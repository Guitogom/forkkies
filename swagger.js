import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Forkkies',
    description: 'Documentación de la API de Forkkies',
  },
  host: 'api.forkkies.live',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js']; // El archivo principal donde están definidas tus rutas

swaggerAutogen()(outputFile, endpointsFiles, doc);