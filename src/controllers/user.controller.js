const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const utils = require('../utils');

const create = (req, res) => {
    const requestBody = req.body;
    const errorMessage = utils.validateNewUser(requestBody);

    if (errorMessage) {
        return res.status(400).send({
            message: 'Validation error occurred.',
            error: errorMessage,
        });
    }

    const user = new User({
        ...requestBody,
    });

    user.save()
        .then(data => {
            res.status(200).send({
                message: 'New user was created',
                error: [],
                user: {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                },
            });
        })
        .catch(error => {
            console.log('User controller error', error);

            res.status(500).send({
                message: 'Changes are not saved some errors occurred.',
                error,
            });
        });
};

const login = (req, res) => {
    const { body: reqBody } = req;
    const { user: { email, password } } = reqBody;

    if (email && password) {
        User.authenticate({ email, password }, ({ error, user }) => {
            if (error || !user) {
                console.error('Error: ', error);

                return res.status(400).send({
                    message: 'Wrong email or password.',
                    error,
                });
            }

            jwt.sign(user.toJSON(), 'secret', {
                expiresIn: 3600
            }, (err, token) => {
                if(err) {
                    console.error('There is some error in token', err);

                    return res.status(400).send({
                        message: 'There is some error in token.',
                        error: JSON.stringify(err),
                    });
                }

                return res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`,
                    message: 'Login succeeded.',
                    error: '',
                });
            });
        });
    } else {
        return res.status(400).send({
            message: 'All fields required.',
            error: 'All fields required.',
        });
    }
};

const logged = (req, res) => res.json({
    user: {
        id: req.body.user.id,
        username: req.body.user.username,
        email: req.body.user.email,
    },
});

module.exports = {
    create,
    login,
    logged,
};
