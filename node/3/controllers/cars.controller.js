const { carsService } = require('../services');
const {
    success: {
        OK, UPDATED, DELETED, CREATED
    }
} = require('../success');
const { ErrorHandler, errors: { AlREADY_EXISTS, NOT_FOUND } } = require('../errors');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            if (req.car_is_present) throw new ErrorHandler(AlREADY_EXISTS.code, AlREADY_EXISTS.message);

            await carsService.createCar(req.car);

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

            res.status(DELETED.code).json(DELETED.message);
        } catch (e) { next(e); }
    }
};
