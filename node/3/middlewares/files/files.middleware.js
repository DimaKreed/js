const {
    errors: {
        TOO_BIG_FILE, WRONG_FILE_EXTENSION, ONLY_10_PHOTOS, ONLY_10_DOCS
    }, ErrorHandler
} = require('../../errors');
const {
    DOCS_MIMETYPES,
    FILE_MAX_SIZE,
    PHOTO_MAX_SIZE,
    PHOTOS_MIMETYPES,
    TYPES
} = require('../../constants/constants');

module.exports = (req, res, next) => {
    try {
        const { files } = req;

        const filteredFiles = [];

        const allFiles = Object.values(files);

        let numOfDocs = 0;
        let numOfPhotos = 0;
        for (let i = 0; i < allFiles.length; i++) {
            const { mimetype, size } = allFiles[i];

            if (DOCS_MIMETYPES.includes(mimetype)) {
                numOfDocs++;
                allFiles[i].type = TYPES.DOC;

                if (numOfDocs > 10) {
                    throw new ErrorHandler(ONLY_10_DOCS.code, ONLY_10_DOCS.message);
                }
                if (size > FILE_MAX_SIZE) {
                    throw new ErrorHandler(TOO_BIG_FILE.code, TOO_BIG_FILE.message);
                }

                filteredFiles.push(allFiles[i]);
            } else if (PHOTOS_MIMETYPES.includes(mimetype)) {
                numOfPhotos++;
                allFiles[i].type = TYPES.PHOTO;

                if (numOfPhotos > 10) {
                    throw new ErrorHandler(ONLY_10_PHOTOS.code, ONLY_10_PHOTOS.message);
                }
                if (size > PHOTO_MAX_SIZE) {
                    throw new ErrorHandler(TOO_BIG_FILE.code, TOO_BIG_FILE.message);
                }

                filteredFiles.push(allFiles[i]);
            } else {
                throw new ErrorHandler(WRONG_FILE_EXTENSION.code, WRONG_FILE_EXTENSION.message);
            }
        }

        req.filteredFiles = filteredFiles;

        next();
    } catch (e) {
        next(e);
    }
};
