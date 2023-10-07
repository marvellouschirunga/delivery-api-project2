const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Delivery API',
        description: 'Delivery API'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile ='./swagger.json';
const endpointFiles = ['./routes/index.js'];

//generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc);