const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE341 Contacts API',
  },

  host: process.env.RENDER_EXTERNAL_HOSTNAME
    ? process.env.RENDER_EXTERNAL_HOSTNAME
    : 'localhost:3000',

  schemes: process.env.RENDER_EXTERNAL_HOSTNAME
    ? ['https']
    : ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);