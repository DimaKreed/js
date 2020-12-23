const { errors: { ONLY_10_FILES }, ErrorHandler } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        if (req.files.length > 10) {
            throw new ErrorHandler(ONLY_10_FILES.message, ONLY_10_FILES.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
