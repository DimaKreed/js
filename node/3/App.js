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
app.use('/error', routes.errorRouter);
app.use('/cars', routes.carsRouter);