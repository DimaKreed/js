const path = require('path');
const uuid = require('uuid').v1();
const fs = require('fs-extra').promises;

const { usersService, emailService } = require('../services');
const {
    success: {
        OK, CREATED, DELETED, UPDATED
    }
} = require('../success');
const { ErrorHandler, errors: { AlREADY_EXISTS, NOT_FOUND } } = require('../errors');
const { WELCOME } = require('../constants/email.actions-enum');
const { password: passwordHasher } = require('../helpers');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { user_is_present, user, avatar } = req;
            if (user_is_present) throw new ErrorHandler(AlREADY_EXISTS.code, AlREADY_EXISTS.message);

            user.password = await passwordHasher.hash(user.password);

            const createdUser = await usersService.createUser(user);
            if (avatar) {
                const pathWithoutPublic = path.join('user', `${createdUser.id}`, 'photos');
                const photoDir = path.join(process.cwd(), 'public', pathWithoutPublic);
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(path.join(photoDir, photoName));

                await usersService.updateUser(createdUser.id, { avatar: finalPhotoPath });
            }

            await emailService.sendMail(user.email, WELCOME, { userName: user.name });

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

            const { avatar } = req;
            if (avatar) {
                const pathWithoutPublic = path.join('user', `${req.userInDB.id}`, 'photos');
                const photoDir = path.join(process.cwd(), 'public', pathWithoutPublic);
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(path.join(photoDir, photoName));

                req.user.avatar = finalPhotoPath;

                req.user.password = await passwordHasher.hash(req.user.password);
                await usersService.updateUser(req.userInDB.id, req.user);
            }

            res.status(UPDATED.code).json(UPDATED.message);
        } catch (e) { next(e); }
    },

    deleteUser: async (req, res, next) => {
        try {
            if (!req.user_is_present) throw new ErrorHandler(NOT_FOUND.code, NOT_FOUND.message);

            await usersService.deleteUser(req.userInDB.id);

            const userDir = path.join(process.cwd(), 'public', 'user', `${req.userInDB.id}`);
            fs.rmdirSync(userDir, { recursive: true });

            res.status(DELETED.code).json(DELETED.message);
        } catch (e) { next(e); }
    }

};
