const db = require('../database').getInstance();
const { carsValidator } = require('../validators');
const { ErrorHandler, errorCodes: { BAD_REQUEST } } = require('../errors');
const { models: { CAR }, } = require('../constants/constants');

module.exports = {

    createCar: (car) => {
        const CarModel = db.getModel(CAR);
        const { error } = carsValidator.validate(car);

        if (error) { throw new ErrorHandler(BAD_REQUEST, error.details[0].message); }

        return CarModel.create(car);
    },

    getCars: () => {
        const CarModel = db.getModel(CAR);
        return CarModel.findAll();
    },
    getCarById: (id) => {
        const CarModel = db.getModel(CAR);

        return CarModel.findByPk(id);
    },
    getCarByParams: (param) => {
        const CarModel = db.getModel(CAR);
        return CarModel.findOne({
            where: param
        });
    },

    updateCar: (carId, car) => {
        const CarModel = db.getModel(CAR);
        return CarModel.update(
          { ...car },
          { returning: true, where: { id: carId } }
        );
    },

    deleteCar: (carId) => {
        const CarModel = db.getModel(CAR);
        return CarModel.destroy({
            where: {
                id: carId
            }
        });
    },
    deleteAllCars: () => {
        const CarModel = db.getModel(CAR);
        CarModel.destroy({
            where: {},
            truncate: true
        });
    }

};
