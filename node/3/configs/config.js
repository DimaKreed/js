require('dotenv').config();

module.exports = {
    ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY || 'accessKey',
    REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY || 'refreshKey',

    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root_password',
    DB: process.env.DB || 'myDB',
    HOST: process.env.HOST || '123.4.5.6',
    DIALECT: process.env.DIALECT || 'myDialect',

    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'mail',
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'my.email@mail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'pass',
};
