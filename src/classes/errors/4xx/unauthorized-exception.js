const { getReasonPhrase } = require('http-status-codes');

function UnauthorizedException(message) {
    this.name = getReasonPhrase(401);
    this.message = message || "Blank message (it shouldn't be like that)";
    this.stack = new Error().stack;
    this.status = 401;
}

UnauthorizedException.prototype = Object.create(Error.prototype);
UnauthorizedException.prototype.constructor = UnauthorizedException;

module.exports = UnauthorizedException;
