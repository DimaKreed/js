const { Router } = require('express');

const authRoutes = Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

authRoutes.post('/',
    authMiddleware.checkAuthData,
    authMiddleware.checkIsUserPresentInDataBase,
    userMiddleware.checkIsPasswordOk,
    authController.login);
authRoutes.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshAccessToken);
authRoutes.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

module.exports = authRoutes;
