const { errors: { ONLY_10_PHOTOS }, ErrorHandler } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        if (req.photos.length > 10) {
            throw new ErrorHandler(ONLY_10_PHOTOS.message, ONLY_10_PHOTOS.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
