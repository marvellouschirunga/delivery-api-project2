const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Delivery API',
        description: 'Delivery API by Marvellous Chirunga'
    },
    host: 'localHost:3000',            // The hostname and port where the API is hosted
    schemes: ['http', 'https']         // The communication protocols (HTTP and HTTPS) supported by the API
};

const outputFile ='./swagger.json';
const endpointFiles = ['./routes/index.js'];

//generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc);