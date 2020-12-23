const { errors: { JUST_ONE_PHOTO }, ErrorHandler } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        if (req.photos.length > 1) {
            throw new ErrorHandler(JUST_ONE_PHOTO.message, JUST_ONE_PHOTO.code);
        }

        [req.avatar] = req.photos;

        next();
    } catch (e) {
        next(e);
    }
};
