const { getReasonPhrase } = require('http-status-codes');

function ForbiddenException(message) {
    this.name = getReasonPhrase(403);
    this.message = message || "Blank message (it shouldn't be like that)";
    this.stack = new Error().stack;
    this.status = 403;
}

ForbiddenException.prototype = Object.create(Error.prototype);
ForbiddenException.prototype.constructor = ForbiddenException;

module.exports = ForbiddenException;
