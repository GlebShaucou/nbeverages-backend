const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('../config/database.config');
const beverageRoutes = require('./routes/beverage.routes');

const app = express();
const PORT = 3003;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(dbConfig.url, { useNewUrlParser: true })
    .then(() => {
        console.log('Successfully connected to the database');
    })
    .catch(() => {
        console.log('Could not connect to the database. Exiting now.', err);

        process.exit();
    });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
    res.json({ 'message': 'Welcome!' });
});

beverageRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
