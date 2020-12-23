const { Router } = require('express');

const usersRoutes = Router();

const { usersController } = require('../controllers');
const { userMiddleware, authMiddleware,filesMiddleware } = require('../middlewares');

usersRoutes.get('/',
    authMiddleware.checkAccessToken,
    userMiddleware.checkIsUsersGot,
    userMiddleware.normalizeUser,
    usersController.getUsers);
usersRoutes.post('/',
    userMiddleware.checkUserValidity,
    userMiddleware.checkIsUserPresentInDataBase,
    filesMiddleware.checkFiles,
    filesMiddleware.checkAvatar,
    usersController.createUser);
usersRoutes.get('/params',
    authMiddleware.checkAccessToken,
    userMiddleware.checkIsUserGot,
    userMiddleware.normalizeUser,
    usersController.getUser);

usersRoutes.use('/:user_id', userMiddleware.checkUserIdValidity);

usersRoutes.get('/:user_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission,
    userMiddleware.checkIsUserGot,
    userMiddleware.normalizeUser,
    usersController.getUser);
usersRoutes.put('/:user_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission,
    userMiddleware.checkUserValidity,
    userMiddleware.checkIsUserPresentInDataBase,
    userMiddleware.checkIsPasswordOk,
    userMiddleware.setNewValuesToUser,
    filesMiddleware.checkFiles,
    filesMiddleware.checkAvatar,
    usersController.updateUser);
usersRoutes.delete('/:user_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission,
    userMiddleware.checkIsUserPresentInDataBase,
    usersController.deleteUser);

module.exports = usersRoutes;
