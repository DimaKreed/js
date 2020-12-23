const { errors: { JUST_ONE_PHOTO, TOO_BIG_FILE, WRONG_FILE_EXTENSION }, ErrorHandler } = require('../../errors');
const { PHOTO_MAX_SIZE, PHOTOS_MIMETYPES } = require('../../constants/constants');

module.exports = (req, res, next) => {
    try {
        const { files } = req;

        const photos = [];

        const allFiles = Object.values(files);

        for (let i = 0; i < allFiles.length; i++) {
            const { mimetype, size } = allFiles[i];

            if (PHOTOS_MIMETYPES.includes(mimetype)) {
                if (size > PHOTO_MAX_SIZE) {
                    throw new ErrorHandler(TOO_BIG_FILE.message, TOO_BIG_FILE.code);
                }

                photos.push(allFiles[i]);
            } else {
                throw new ErrorHandler(WRONG_FILE_EXTENSION.message, WRONG_FILE_EXTENSION.code);
            }
        }

        if (photos.length > 1) {
            throw new ErrorHandler(JUST_ONE_PHOTO.message, JUST_ONE_PHOTO.code);
        }

        [req.avatar] = photos;

        next();
    } catch (e) {
        next(e);
    }
};
