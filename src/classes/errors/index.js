const xx4Exceptions = require('./4xx');
const xx5Exceptions = require('./5xx');

module.exports = { ...xx4Exceptions, ...xx5Exceptions };
