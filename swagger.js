const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE341 Contacts API'
  },
  host: 'cse341-project1-qqjz.onrender.com',
  //host: 'localhost:3000',  
  //schemes: ['http']
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);