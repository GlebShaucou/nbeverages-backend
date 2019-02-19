const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');
const beverageRoutes = require('./src/routes/beverage.routes');

const app = express();
let port = process.env.PORT;

if (port === null || port === '') {
    port = 3003;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(dbConfig.url, { useNewUrlParser: true })
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch((error) => {
        console.log('Could not connect to the database. Exiting now.', error);

        process.exit();
    });

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

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
