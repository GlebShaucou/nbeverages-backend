const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BeverageSchema = new Schema({
    type: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        amount: Number,
        currency: {
            type: String,
            trim: true,
        },
    },
    image: String,
});

module.exports = mongoose.model('Beverage', BeverageSchema);
