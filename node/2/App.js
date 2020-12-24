const express = require('express');
const expressHBS = require('express-handlebars');
const path = require('path');

const db = require('../3/database').getInstance();
const routes = require('./routes');

const app = express();
db.setModels();

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', '.hbs');
app.engine('.hbs', expressHBS({
    defaultLayout: false
}));
app.set('views', path.join(process.cwd(), 'views'));

app.listen(5000, () => {
});

app.get('/', (req, res) => {
    res.render('main');
});

app.use('/', routes.authRouter);
app.use('/user', routes.userRouter);
app.use('/users', routes.usersRouter);
app.use('/error', routes.errorRouter);
