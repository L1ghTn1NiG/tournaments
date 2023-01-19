const { getReasonPhrase } = require('http-status-codes');

function UnprocessableEntityException(message) {
    this.name = getReasonPhrase(422);
    this.message = message || "Blank message (it shouldn't be like that)";
    this.stack = new Error().stack;
    this.status = 422;
}

UnprocessableEntityException.prototype = Object.create(Error.prototype);
UnprocessableEntityException.prototype.constructor =
    UnprocessableEntityException;

module.exports = UnprocessableEntityException;
