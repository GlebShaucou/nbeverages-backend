module.exports = (app) => {
    const order = require('../controllers/order.controller');

    app.get('/api/orders', order.getAll);

    app.get('/api/orders/:orderId', order.getById);

    app.post('/api/orders', order.create);

    app.put('/api/orders', order.update);

    app.delete('/api/orders', order.deleteById);

    app.post('/api/user-orders', order.find);
};
