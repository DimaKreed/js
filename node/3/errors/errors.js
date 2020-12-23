const {
    BAD_REQUEST, NOT_FOUND, CONFLICT, UNAUTHORIZED, FORBIDDEN
} = require('../constants/error-codes');

module.exports = {
    NOT_VALID_BODY: {
        message: 'Request is not valid',
        code: BAD_REQUEST
    },
    NOT_VALID_ID: {
        message: 'ID is not valid',
        code: BAD_REQUEST
    },
    WRONG_EMAIL_OR_PASSWORD: {
        message: 'Wrong email or password',
        code: BAD_REQUEST
    },
    WRONG_TEMPLATE_NAME: {
        message: 'wrong template name',
        code: BAD_REQUEST
    },
    TOO_BIG_FILE: {
        message: 'Too big file',
        code: BAD_REQUEST
    },
    WRONG_FILE_EXTENSION: {
        message: 'Wrong file extension',
        code: BAD_REQUEST
    },
    JUST_ONE_PHOTO: {
        message: 'You can upload just one photo as avatar',
        code: BAD_REQUEST
    },
    ONLY_10_PHOTOS: {
        message: 'You can upload only 10 photos',
        code: BAD_REQUEST
    },
    ONLY_10_DOCS: {
        message: 'You can upload only 10 files',
        code: BAD_REQUEST
    },

    NOT_VALID_TOKEN: {
        message: 'token is not valid',
        code: UNAUTHORIZED
    },

    PERMISSION_DENIED: {
        message: 'permission denied',
        code: FORBIDDEN
    },

    NOT_FOUND: {
        message: 'DATA is not fount',
        code: NOT_FOUND
    },

    AlREADY_EXISTS: {
        message: 'data is already exists',
        code: CONFLICT
    }
};
