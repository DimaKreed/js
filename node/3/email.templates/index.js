const emailAction = require('../constants/email.actions-enum');

module.exports = {
    [emailAction.WELCOME]: {
        subject: 'Welcome to our site',
        template: 'welcome'
    }
};
