const {
    BAD_REQUEST, NOT_FOUND, CONFLICT, UNAUTHORIZED, FORBIDDEN
} = require('../../constants/error-codes');

module.exports = {
    NOT_VALID_BODY: {
        message: 'Request is not valid',
        code: BAD_REQUEST
    },
    NOT_VALID_ID: {
        message: 'ID is not valid',
        code: BAD_REQUEST
    },
    NOT_FOUND: {
        message: 'DATA is not fount',
        code: NOT_FOUND
    },
    WRONG_EMAIL_OR_PASSWORD: {
        message: 'Wrong email or password',
        code: BAD_REQUEST
    },
    AlREADY_EXISTS: {
        message: 'data is already exists',
        code: CONFLICT
    },
    NOT_VALID_TOKEN: {
        message: 'token is not valid',
        code: UNAUTHORIZED
    },
    PERMISSION_DENIED: {
        message: 'permission denied',
        code: FORBIDDEN
    },
    WRONG_TEMPLATE_NAME: {
        message: 'wrong template name',
        code: BAD_REQUEST
    }
};
