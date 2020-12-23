const { authService } = require('../services');
const { tokinizer } = require('../helpers');
const { success: { DELETED } } = require('../success');

module.exports = {
    login: async (req, res, next) => {
        try {
            const token_pair = tokinizer();
            const { id } = req.userInDB;
            const userInOAuthTable = await authService.getTokensByUserId({ user_id: id });

            if (userInOAuthTable) {
                await authService.updateTokenPair({ user_id: id }, token_pair);
            } else {
                await authService.createTokenPair({ user_id: id, ...token_pair });
            }

            res.json(token_pair);
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const { id } = req.userWithToken;
            await authService.deleteTokenPair({ user_id: id });

            res.status(DELETED.code).json(DELETED.message);
        } catch (e) {
            next(e);
        }
    },
    refreshAccessToken: async (req, res, next) => {
        try {
            const { access_token } = tokinizer();
            const { id } = req.user;
            await authService.updateTokenPair({ user_id: id }, { access_token });
            res.json({ access_token });
        } catch (e) {
            next(e);
        }
    }

};
