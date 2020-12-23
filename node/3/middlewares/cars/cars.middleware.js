const { carsValidator, carsIdValidator } = require('../../validators');
const { ErrorHandler, errorCodes: { BAD_REQUEST }, errors: { NOT_FOUND } } = require('../../errors');
const { carsService } = require('../../services');

module.exports = {
    checkIsCarsGot: async (req, res, next) => {
        try {
            const cars = await carsService.getCars();
            if (!cars || !cars.length) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);
            req.cars = cars;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsCarGot: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            if (car_id) {
                const carById = await carsService.getCarById(car_id);
                if (!carById) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);
                req.car = carById;
            }

            if (req.body) {
                const carByParams = await carsService.getCarByParams(req.body);
                if (!carByParams) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);
                req.car = carByParams;
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkCarValidity: (req, res, next) => {
        try {
            const { error } = carsValidator.validate(req.body);
            if (error) throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            req.car = req.body;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkCarIdValidity: (req, res, next) => {
        try {
            const { error } = carsIdValidator.validate(req.params);
            if (error) throw new ErrorHandler(BAD_REQUEST, error.details[0].message);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsCarPresentInDataBase: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            if (car_id) {
                const car = await carsService.getCarById(car_id);

                if (car) {
                    req.car_is_present = true;
                    req.carInDB = car;
                }
            } else {
                const { model } = req.car;
                if (model) {
                    const car = await carsService.getCarByParams({ model });
                    if (car) {
                        req.car_is_present = true;
                        req.carInDB = car;
                    }
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
