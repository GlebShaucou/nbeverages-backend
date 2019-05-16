module.exports = (app) => {
    const beverage = require('../controllers/beverage.controller');

    app.get('/api/beverages', beverage.getAll);

    app.get('/api/beverages/:beverageId', beverage.getById);

    app.post('/api/beverages', beverage.create);

    app.put('/api/beverages', beverage.update);

    app.delete('/api/beverages', beverage.deleteById);

    app.post('/api/filtered-beverages', beverage.getFiltered);
};
