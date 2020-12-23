const db = require('../database').getInstance();
const { models: { CARS_FILES }, } = require('../constants/constants');

module.exports = {

    addFiles: (file) => {
        const CarsFilesModel = db.getModel(CARS_FILES);

        return CarsFilesModel.create(file);
    },

    getCarFilesByParams: (param) => {
        const CarFilesModel = db.getModel(CARS_FILES);
        return CarFilesModel.findAll({
            where: param
        });
    },

    updateCarFiles: (fileId, file) => {
        const CarFilesModel = db.getModel(CARS_FILES);
        return CarFilesModel.update(
            { ...file },
            { returning: true, where: { id: fileId } }
        );
    },

    deleteCarFile: (fileId) => {
        const CarFilesModel = db.getModel(CARS_FILES);
        return CarFilesModel.destroy({
            where: {
                id: fileId
            }
        });
    },
    deleteCarFiles: (car_id) => {
        const CarModel = db.getModel(CARS_FILES);
        CarModel.destroy({
            where: { car_id },
            truncate: true
        });
    }

};
