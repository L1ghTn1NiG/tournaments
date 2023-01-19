const { getReasonPhrase } = require('http-status-codes');

function RetryWithException(message) {
    this.name = getReasonPhrase(449);
    this.message = message || "Blank message (it shouldn't be like that)";
    this.stack = new Error().stack;
    this.status = 449;
}

RetryWithException.prototype = Object.create(Error.prototype);
RetryWithException.prototype.constructor = RetryWithException;

module.exports = RetryWithException;
