const path = require('path');
const fs = require('fs-extra').promises;

const { carsService, carsFilesService } = require('../services');
const {
    success: {
        OK, UPDATED, DELETED, CREATED
    }
} = require('../success');
const { ErrorHandler, errors: { AlREADY_EXISTS, NOT_FOUND } } = require('../errors');
const fileFunctions = require('../helpers/fileFunctions');
const { TYPES } = require('../constants/constants');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            if (req.car_is_present) throw new ErrorHandler(AlREADY_EXISTS.code, AlREADY_EXISTS.message);

            const createdCar = await carsService.createCar(req.car);

            const { filteredFiles } = req;
            if (filteredFiles) {
                const photoPathWithoutPublic = path.join('car', `${createdCar.id}`, 'photos');
                const docsPathWithoutPublic = path.join('car', `${createdCar.id}`, 'docs');

                const photoDir = path.join(process.cwd(), 'public', photoPathWithoutPublic);
                const docsDir = path.join(process.cwd(), 'public', docsPathWithoutPublic);

                await fileFunctions.createDirectory(photoDir);
                await fileFunctions.createDirectory(docsDir);

                const promisesArrayMovePhotos = [];
                const promisesArrayMoveDocs = [];
                const promisesArrayAddPhotosToDB = [];
                const promisesArrayAddDocsToDB = [];

                filteredFiles.forEach((file) => {
                    if (file.type === TYPES.PHOTO) {
                        const { fileName, finalPath } = fileFunctions.createPathToFileWithUUID(photoPathWithoutPublic, file);

                        promisesArrayMovePhotos.push(file.mv(path.join(photoDir, fileName)));
                        promisesArrayAddPhotosToDB.push(carsFilesService.addFiles(
                            { type: TYPES.PHOTO, file: finalPath, car_id: createdCar.id }
                        ));
                    }

                    if (file.type === TYPES.DOC) {
                        const { fileName, finalPath } = fileFunctions.createPathToFileWithUUID(docsPathWithoutPublic, file);

                        promisesArrayMoveDocs.push(file.mv(path.join(docsDir, fileName)));
                        promisesArrayAddDocsToDB.push(carsFilesService.addFiles(
                            { type: TYPES.DOC, file: finalPath, car_id: createdCar.id }
                        ));
                    }
                });

                Promise.all(promisesArrayMoveDocs);
                Promise.all(promisesArrayMovePhotos);

                Promise.all(promisesArrayAddDocsToDB);
                Promise.all(promisesArrayAddPhotosToDB);
            }

            await carsFilesService.addFiles();
            res.status(CREATED.code)
                .json(CREATED.message);
        } catch (e) { next(e); }
    },

    getCars: (req, res, next) => {
        try {
            res.status(OK.code).json(req.cars);
        } catch (e) { next(e); }
    },
    getCar: (req, res, next) => {
        try {
            res.status(OK.code).json(req.car);
        } catch (e) { next(e); }
    },

    updateCar: async (req, res, next) => {
        try {
            if (!req.car_is_present) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

            const { car_id } = req.params;
            const { car } = req;

            await carsService.updateCar(car_id, car);

            res.status(UPDATED.code)
                .json(UPDATED.message);
        } catch (e) { next(e); }
    },

    deleteCar: async (req, res, next) => {
        try {
            if (!req.car_is_present) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

            await carsService.deleteCar(req.carInDB.id);

            const userDir = path.join(process.cwd(), 'public', 'car', `${req.carInDB.id}`);
            fs.rmdirSync(userDir, { recursive: true });

            res.status(DELETED.code).json(DELETED.message);
        } catch (e) { next(e); }
    }
};
