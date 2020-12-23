const { models: { O_AUTH, USER }, } = require('../constants/constants');
const db = require('../database').getInstance();

module.exports = {
    createTokenPair: (tokenPair) => {
        const AuthModel = db.getModel(O_AUTH);
        return AuthModel.create(tokenPair);
    },

    updateTokenPair: (user_id, tokenPair) => {
        const AuthModel = db.getModel(O_AUTH);
        return AuthModel.update(
            tokenPair,
            { returning: true, where: user_id }
        );
    },

    deleteTokenPair: (user_id) => {
        const AuthModel = db.getModel(O_AUTH);
        return AuthModel.destroy({
            where: user_id
        });
    },

    getUserWithTokensByParams: (params) => {
        const AuthModel = db.getModel(O_AUTH);
        const UserModel = db.getModel(USER);

        return UserModel.findOne({
            include: {
                model: AuthModel,
                where: params
            }
        });
    },
    getTokensByUserId: (user_id) => {
        const AuthModel = db.getModel(O_AUTH);

        return AuthModel.findOne({
            where: user_id
        });
    }
};
