const bcrypt = require('bcrypt');
const { ErrorHandler, errors: { WRONG_EMAIL_OR_PASSWORD } } = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 8),

    compare: async (password, hash) => {
        const isPasswordsEquals = await bcrypt.compare(password, hash);
        if (!isPasswordsEquals) throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.code, WRONG_EMAIL_OR_PASSWORD.message);
    }
};
