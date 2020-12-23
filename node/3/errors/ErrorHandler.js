module.exports = class ErrorHandler extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;

        Error.captureStackTrace(this, this.constructor);
    }
};
