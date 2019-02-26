const Beverage = require('../models/beverage.model');
const utils = require('../utils');

const getAll = (req, res) => {
    Beverage.find()
        .then(beverages => {
            res.status(200).send({
                beverages,
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
    Beverage.findById(req.params.beverageId)
        .then(beverage => {
            if(!beverage) {
                return res.status(400).send({
                    message: `Beverage with id ${req.params.beverageId} not found`,
                    error: `Beverage with id ${req.params.beverageId} not found`,
                });
            }

            res.status(200).send({
                beverage,
                error: '',
            });
        }).catch(error => {
        if(error.kind === 'ObjectId') {
            return res.status(400).send({
                message: `Beverage with id ${req.body.beverageId} not found`,
                error,
            });
        }

        return res.status(500).send({
            message: 'Some error occurred.',
            error,
        });
    });
};

const create = (req, res) => {
    const requestBody = req.body;
    const errorMessage = utils.validateNewBeverage(requestBody);

    if (errorMessage) {
        return res.status(400).send({
            message: 'Validation error occurred.',
            error: errorMessage,
        });
    }

    const beverage = new Beverage({
        ...requestBody,
    });

    beverage.save()
        .then(data => {
            getAll(req, res);
        })
        .catch(error => {
            res.status(500).send({
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

    Beverage.findByIdAndUpdate(req.body.beverageId, {
        ...req.body,
    }, { new: true })
        .then(beverage => {
            if(!beverage) {
                return res.status(400).send({
                    message: `Beverage with id ${req.body.beverageId} not found`,
                    error: `Beverage with id ${req.body.beverageId} not found`,
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
    Beverage.findByIdAndDelete(req.body.beverageId)
        .then(beverage => {
            if(!beverage) {
                return res.status(400).send({
                    message: `Beverage with id ${req.body.beverageId} not found`,
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
