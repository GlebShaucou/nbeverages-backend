const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const dbConfig = require('./config/database.config');
const beverageRoutes = require('./src/routes/beverage.routes');
const userRoutes = require('./src/routes/user.routes');
const orderRoutes = require('./src/routes/order.routes');

mongoose.connect(dbConfig.url, { useNewUrlParser: true })
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch((error) => {
        console.log('Could not connect to the database. Exiting now.', error);

        process.exit();
    });

const app = express();
const port = process.env.PORT || 3003;

app.use(passport.initialize());

require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.get('/', (req, res) => {
    res.json({ 'message': 'Welcome!' });
});

beverageRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
