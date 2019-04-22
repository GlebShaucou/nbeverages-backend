const mongoose = require('mongoose');

const BeverageSchema = mongoose.Schema({
    category: String,
    type: String,
    imgSrc: String,
    name: String,
    description: String,
    availablePackaging: [Number],
    packingUnit: {
        label: String,
        value: String,
    },
    standartPackaging: Number,
    standartPackagingPrice: {
        amount: Number,
        currency: {
            label: String,
            value: String,
        },
    },
});

module.exports = mongoose.model('Beverage', BeverageSchema);
