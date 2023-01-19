const swaggerAutogen = require('swagger-autogen');
const doc = require('./doc');

const endpointsFiles = ['./src/routes/auth-routes.js'];
const outputFile = './source/swagger/outputFile.json';

swaggerAutogen()(outputFile, endpointsFiles, doc)
    .then(({ success }) => {
        console.log(`Generated: ${success}`);
    })
    .catch((error) => {
        console.log(error);
    });
