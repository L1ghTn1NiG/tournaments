const { getReasonPhrase } = require('http-status-codes');

function ConflictException(message) {
    this.name = getReasonPhrase(409);
    this.message = message || "Blank message (it shouldn't be like that)";
    this.stack = new Error().stack;
    this.status = 409;
}

ConflictException.prototype = Object.create(Error.prototype);
ConflictException.prototype.constructor = ConflictException;

module.exports = ConflictException;
