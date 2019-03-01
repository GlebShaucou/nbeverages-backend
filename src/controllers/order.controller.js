const Order = require('../models/order.model');

const getAll = (req, res) => {
    Order.find()
        .then(orders => {
            res.status(200).send({
                orders,
                error: '',
            });
        })
        .catch(error => {
            res.status(500).send({
                message: 'Some error occurred.',
                error,
            });
        });
};

const getById = (req, res) => {
    const { orderId } = req.params;

    if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(500).send({
            message: 'Some error occurred.',
            error: 'Invalid order ID',
        });
    }

    Order.findById(orderId)
        .then(order => {
            if(!order) {
                return res.status(400).send({
                    message: `order with id ${orderId} not found`,
                    error: `order with id ${orderId} not found`,
                });
            }

            res.status(200).send({
                order,
                error: '',
            });
        }).catch(error => {
            return res.status(500).send({
                message: 'Some error occurred.',
                error,
            });
        });
};

const create = (req, res) => {
    const requestBody = req.body;
    // const errorMessage = utils.validateNewBeverage(requestBody);

    // if (errorMessage) {
    //     return res.status(400).send({
    //         message: 'Validation error occurred.',
    //         error: errorMessage,
    //     });
    // }

    const beverage = new Order({
        ...requestBody,
        status: 'new',
    });

    beverage.save()
        .then(order => {
            return res.status(200).send({
                order,
                error: '',
            });
        })
        .catch(error => {
            return res.status(500).send({
                message: 'Changes are not saved some errors occurred.',
                error,
            });
        });
};

const update = (req, res) => {
    if(!req.body.type) {
        return res.status(400).send({
            message: 'Request type can not be empty.',
            error: 'Request may not be empty',
        });
    }

    Order.findByIdAndUpdate(req.body.orderId, {
        ...req.body,
    }, { new: true })
        .then(order => {
            if(!order) {
                return res.status(400).send({
                    message: `Order with id ${req.body.orderId} not found`,
                    error: `Order with id ${req.body.orderId} not found`,
                });
            }

            getAll(req, res);
        }).catch(error => {
        return res.status(500).send({
            message: 'Some error occurred.',
            error,
        });
    });
};

const deleteById = (req, res) => {
    Order.findByIdAndDelete(req.body.orderId)
        .then(order => {
            if(!order) {
                return res.status(400).send({
                    message: `Beverage with id ${req.body.orderId} not found`,
                    error: '',
                });
            }

            getAll(req, res);
        }).catch(error => {
        return res.status(500).send({
            message: 'Some error occurred.',
            error,
        });
    });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
};
