const { usersService, emailService } = require('../services');
const {
    success: {
        OK, CREATED, DELETED, UPDATED
    }
} = require('../database/success');
const { ErrorHandler, errors: { AlREADY_EXISTS, NOT_FOUND } } = require('../database/errors');
const { WELCOME } = require('../constants/email.actions-enum');
const { password: passwordHasher } = require('../helpers');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            if (req.user_is_present) throw new ErrorHandler(AlREADY_EXISTS.code, AlREADY_EXISTS.message);

            req.user.password = await passwordHasher.hash(req.user.password);

            await usersService.createUser(req.user);

            await emailService.sendMail(req.user.email, WELCOME, { userName: req.user.name });

            res.status(CREATED.code).json(CREATED.message);
        } catch (e) { next(e); }
    },

    getUsers: (req, res, next) => {
        try {
            res.status(OK.code).json(req.users);
        } catch (e) { next(e); }
    },
    getUser: (req, res, next) => {
        try {
            res.status(OK.code).json(req.user);
        } catch (e) { next(e); }
    },

    updateUser: async (req, res, next) => {
        try {
            if (!req.user_is_present) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

            req.user.password = await passwordHasher.hash(req.user.password);

            await usersService.updateUser(req.userInDB.id, req.user);

            res.status(UPDATED.code).json(UPDATED.message);
        } catch (e) { next(e); }
    },

    deleteUser: async (req, res, next) => {
        try {
            if (!req.user_is_present) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

            await usersService.deleteUser(req.userInDB.id);
            res.status(DELETED.code).json(DELETED.message);
        } catch (e) { next(e); }
    }

};
