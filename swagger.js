const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API for CSE341'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);