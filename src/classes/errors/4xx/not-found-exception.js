const { getReasonPhrase } = require('http-status-codes');

function NotFoundException(message) {
    this.name = getReasonPhrase(404);
    this.message = message || "Blank message (it shouldn't be like that)";
    this.stack = new Error().stack;
    this.status = 404;
}

NotFoundException.prototype = Object.create(Error.prototype);
NotFoundException.prototype.constructor = NotFoundException;

module.exports = NotFoundException;
