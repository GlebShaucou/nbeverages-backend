const mongoose = require('mongoose');

const BeverageSchema = mongoose.Schema({
    type: String,
    imgSrc: String,
    name: String,
    description: String,
    category: String,
    quantity: String,
    price: String,
    currency: String,
});

module.exports = mongoose.model('Beverage', BeverageSchema);
