const express = require('express');
const path = require('path');
const routes = require('./routes');

const db = require('./database').getInstance();

const app = express();

db.setModels();

const port = 5000;

app.use(express.static(path.join(process.cwd(), 'dataForAll')));
app.use(express.json());

app.listen(port, () => {
    console.log(`App listen port ${port}`);
});

app.use('/users', routes.usersRouter);
app.use('/cars', routes.carsRouter);
app.use('/auth', routes.authRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.code)
        .json({
            message: err.message,
            ok: false
        });
});
