const fs = require('fs');
const swaggerFile = JSON.parse(
    fs.readFileSync('./src/swagger/outputFile.json'),
);
module.exports = swaggerFile;
