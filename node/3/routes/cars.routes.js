const { Router } = require('express');

const carsRoutes = Router();

const { carsController } = require('../controllers');
const { carMiddleware, filesMiddleware } = require('../middlewares');

carsRoutes.get('/',
    carMiddleware.checkIsCarsGot,
    carsController.getCars);
carsRoutes.post('/',
    carMiddleware.checkCarValidity,
    carMiddleware.checkIsCarPresentInDataBase,
    filesMiddleware.checkFiles,
    filesMiddleware.checkDocs,
    filesMiddleware.checkPhotos,
    carsController.createCar);
carsRoutes.get('/params',
    carMiddleware.checkIsCarGot,
    carsController.getCar);

carsRoutes.use('/:car_id', carMiddleware.checkCarIdValidity);

carsRoutes.get('/:car_id',
    carMiddleware.checkIsCarGot,
    carsController.getCar);
carsRoutes.put('/:car_id',
    carMiddleware.checkCarValidity,
    carMiddleware.checkIsCarPresentInDataBase,
    filesMiddleware.checkFiles,
    filesMiddleware.checkDocs,
    filesMiddleware.checkPhotos,
    carsController.updateCar);
carsRoutes.delete('/:car_id',
    carMiddleware.checkIsCarPresentInDataBase,
    carsController.deleteCar);

module.exports = carsRoutes;
