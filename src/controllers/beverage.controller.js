const Beverage = require('../models/beverage.model');

const create = (req, res) => {
    if (!req.body.type) {
        return res.status(400).send({
            message: 'Request type can not be empty.',
            error: 'Request may not be empty',
        });
    }

    const beverage = new Beverage({
        ...req.body,
    });

    beverage.save()
        .then(data => {
            res.status(200).send({
                data,
                message: 'New beverage was successfully added.'
            });
        })
        .catch(error => {
            res.status(500).send({
                message: 'Some error occurred.',
                error,
            });
        });
};

const getAll = (req, res) => {
    Beverage.find()
        .then(beverages => {
            res.status(200).send({
                beverages,
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
    Beverage.findById(req.body.beverageId)
        .then(beverage => {
            if(!beverage) {
                return res.status(200).send({
                    message: `Beverage with id ${req.body.beverageId} not found`,
                    beverage: null,
                });
            }

            res.status(200).send(beverage);
        }).catch(error => {
            if(error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Beverage with id ${req.body.beverageId} not found`,
                    beverage: null,
                });
            }

            return res.status(500).send({
                message: 'Some error occurred.',
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
                return res.status(404).send({
                    message: `Beverage with id ${req.body.beverageId} not found`,
                    beverage: null,
                });
            }

            res.status(200).send({
                beverage,
                message: 'Beverage was successfully updated.'
            });
        }).catch(error => {
            if(error.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Beverage with id ${req.body.beverageId} not found`,
                    beverage: null,
                });
            }

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
                return res.status(404).send({
                    message: `Beverage with id ${req.body.beverageId} not found`,
                });
            }

            getAll(req, res);
        }).catch(error => {
            if(error.kind === 'ObjectId' || error.name === 'NotFound') {
                return res.status(404).send({
                    message: `Beverage with id ${req.body.beverageId} not found`,
                    beverage: null,
                });
            }

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
