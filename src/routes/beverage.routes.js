module.exports = (app) => {
    const beverage = require('../controllers/beverage.controller');

    app.get('/beverages', beverage.getAll);

    app.get('/beverages/:beverageId', beverage.getById);

    app.post('/beverages', beverage.create);

    app.put('/beverages', beverage.update);

    app.delete('/beverages', beverage.deleteById);
};
