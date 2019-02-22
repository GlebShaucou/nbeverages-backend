const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        trim: true,
    },
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }

        this.password = hash;

        next();
    });
});

UserSchema.statics.authenticate = function({ email, password }, callback) {
    this.findOne({ email })
        .then((user) => {
            if (!user) {
                return callback({ error: 'User not found.' });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (result === true) {
                    return callback({ user });
                } else {
                    return callback({ error: 'Wrong password.' });
                }
            });
        })
        .catch((error) => {
            return callback({ error });
        });
};

module.exports = mongoose.model('User', UserSchema);
