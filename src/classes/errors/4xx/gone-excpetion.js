const { getReasonPhrase } = require('http-status-codes');

function GoneException(message) {
    this.name = getReasonPhrase(410);
    this.message = message || "Blank message (it shouldn't be like that)";
    this.stack = new Error().stack;
    this.status = 410;
}

GoneException.prototype = Object.create(Error.prototype);
GoneException.prototype.constructor = GoneException;

module.exports = GoneException;
