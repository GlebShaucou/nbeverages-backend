const mongoose = require('mongoose');

const BeverageSchema = mongoose.Schema({
    category: String,
    type: String,
    imgSrc: String,
    name: String,
    description: String,
    quantityPerUnit: String,
    price: String,
    currency: String,
});

module.exports = mongoose.model('Beverage', BeverageSchema);
