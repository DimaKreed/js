const { OK, CREATED } = require('../constants/successCodes');

module.exports = {
    CREATED: {
        code: CREATED,
        message: 'Data is created'
    },
    OK: {
        code: OK,
        message: 'OK'
    },
    UPDATED: {
        code: OK,
        message: 'Data is updated successfully'
    },
    DELETED: {
        code: OK,
        message: 'Data is deleted successfully'
    }
};
