const mailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');
const { ErrorHandler, errors: { WRONG_TEMPLATE_NAME } } = require('../database/errors');
const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD, ROOT_EMAIL_SERVICE } = require('../configs/config');

const templatesInfo = require('../email.templates');

const transporter = mailer.createTransport({
    service: ROOT_EMAIL_SERVICE,
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const emailTemplates = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email.templates')
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new ErrorHandler(WRONG_TEMPLATE_NAME.code, WRONG_TEMPLATE_NAME.message);
        }

        const html = await emailTemplates.render(templateInfo.template, context);

        return transporter.sendMail({
            from: 'NO REPLY',
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};
