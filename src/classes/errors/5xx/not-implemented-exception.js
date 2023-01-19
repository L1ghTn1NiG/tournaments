const { getReasonPhrase } = require('http-status-codes');

function NotImplementedException(message) {
    this.name = getReasonPhrase(501);
    this.message = message || "Blank message (it shouldn't be like that)";
    this.stack = new Error().stack;
    this.status = 501;
}

NotImplementedException.prototype = Object.create(Error.prototype);
NotImplementedException.prototype.constructor = NotImplementedException;

module.exports = NotImplementedException;
