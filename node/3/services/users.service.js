const db = require('../database').getInstance();
const { models: { CAR, USER } } = require('../constants/constants');

module.exports = {

    createUser: (user) => {
        const UserModel = db.getModel('User');

        return UserModel.create(user);
    },

    getUserById: (id) => {
        const CarModel = db.getModel('Car');
        const UserModel = db.getModel('User');
        return UserModel.findByPk(id, {
            include: CarModel,
            exclude: 'password',
        });
    },
    getUsers: (where = {}, limit = 10, offset = 0) => {
        const CarModel = db.getModel('Car');
        const UserModel = db.getModel('User');
        return UserModel.findAll({
            where,
            include: CarModel,
            limit,
            offset
        });
    },
    getUserByParams: (param) => {
        const CarModel = db.getModel(CAR);
        const UserModel = db.getModel(USER);
        return UserModel.findOne({
            where: param,
            include: CarModel
        });
    },

    updateUser: (userId, user) => {
        const UserModel = db.getModel(USER);
        return UserModel.update(
            { ...user },
            { returning: true, where: { id: userId } }
        );
    },

    deleteUser: (userId) => {
        const UserModel = db.getModel(USER);
        return UserModel.destroy({
            where: {
                id: userId
            }
        });
    },
    deleteAllUsers: () => {
        const UserModel = db.getModel(USER);
        UserModel.destroy({
            where: {},
            truncate: true
        });
    },

    normalizeUser: (user) => {
        if (Array.isArray(user)) delete user[0].dataValues.password;
        else delete user.dataValues.password;
    }

};
