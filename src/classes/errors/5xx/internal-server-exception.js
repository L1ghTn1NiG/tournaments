const { getReasonPhrase } = require('http-status-codes');

function InternalServerException(message) {
    this.name = getReasonPhrase(500);
    this.message = message || "Blank message (it shouldn't be like that)";
    this.stack = new Error().stack;
    this.status = 500;
}

InternalServerException.prototype = Object.create(Error.prototype);
InternalServerException.prototype.constructor = InternalServerException;

module.exports = InternalServerException;
