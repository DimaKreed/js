const { ErrorHandler, errors: { NOT_FOUND } } = require('../../errors');
const { BAD_REQUEST } = require('../../constants/error-codes');
const { usersService } = require('../../services');
const { usersValidator, usersIdValidator } = require('../../validators');
const { password: passwordHasher } = require('../../helpers');

module.exports = {
    checkUserValidity: (req, res, next) => {
        try {
            const { error } = usersValidator.validate(req.body);
            if (error) throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            req.user = req.body;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserIdValidity: (req, res, next) => {
        try {
            const { error } = usersIdValidator.validate(req.params);
            if (error) throw new ErrorHandler(BAD_REQUEST, error.details[0].message);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsUsersGot: async (req, res, next) => {
        try {
            const { limit, offset, ...where } = req.query;

            const users = await usersService.getUsers(where, limit, offset);

            if (!users || !users.length) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);
            req.users = users;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsUserGot: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            if (user_id) {
                const userById = await usersService.getUserById(user_id);
                if (!userById) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);
                req.user = userById;
            }

            if (Object.keys(req.body).length) {
                const userByParams = await usersService.getUserByParams(req.body);
                if (!userByParams) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);
                req.user = userByParams;
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsUserPresentInDataBase: async (req, res, next) => {
        try {
            const { email, name } = req.user;
            if (email || name) {
                const user = await usersService.getUserByParams({ email } || { name });

                if (user) {
                    req.user_is_present = true;
                    req.userInDB = user;
                }
            }

            const { user_id } = req.params;
            if (user_id) {
                const user = await usersService.getUserById(user_id);
                if (user) {
                    req.user_is_present = true;
                    req.userInDB = user;
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsPasswordOk: (req, res, next) => {
        try {
            const { user, userInDB } = req;
            passwordHasher.compare(user.password, userInDB.password);
            next();
        } catch (e) {
            next(e);
        }
    },

    normalizeUser: (req, res, next) => {
        try {
            const { users, user } = req;

            if (users) {
                users.forEach((user1) => { usersService.normalizeUser(user1); });
                req.users = users;
            }

            if (user) {
                usersService.normalizeUser(user);
                req.user = user;
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    setNewValuesToUser: (req, res, next) => {
        try {
            const { user } = req;
            if (user.newPassword) {
                user.password = user.newPassword;
                delete user.newPassword;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
