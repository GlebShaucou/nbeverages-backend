const mongoose = require('mongoose');

const BeverageSchema = mongoose.Schema({
    category: {
        label: String,
        value: String,
    },
    type: {
        label: String,
        value: String,
    },
    imgSrc: String,
    name: String,
    description: String,
    availablePackaging: [Number],
    standartPackaging: Number,
    packingUnit: {
        label: String,
        value: String,
    },
    standartPackagingPrice: {
        amount: Number,
        currency: {
            label: String,
            value: String,
        },
    },
});

module.exports = mongoose.model('Beverage', BeverageSchema);
