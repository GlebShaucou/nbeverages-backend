const passport = require('passport');

module.exports = (app) => {
    const user = require('../controllers/user.controller');

    app.post('/api/users', user.create);

    app.post('/api/users/login', user.login);

    app.get(
        '/api/users/logged',
        passport.authenticate('jwt', { session: false }),
        user.logged
    );
};
