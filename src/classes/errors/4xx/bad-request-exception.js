const { getReasonPhrase } = require('http-status-codes');

function BadRequestException(message) {
    this.name = getReasonPhrase(400);
    this.message = message || "Blank message (it shouldn't be like that)";
    this.stack = new Error().stack;
    this.status = 400;
}

BadRequestException.prototype = Object.create(Error.prototype);
BadRequestException.prototype.constructor = BadRequestException;

module.exports = BadRequestException;
