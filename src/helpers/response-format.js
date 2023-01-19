class ResponseFormat {
    static success(statusCode, message, object) {
        return {
            data: object,
            message: message,
            status: 'success',
            statusCode: statusCode,
        };
    }

    static error(statusCode, message, object) {
        return {
            error: object,
            message: message,
            status: 'failed',
            statusCode: statusCode,
        };
    }
}

module.exports = ResponseFormat;
