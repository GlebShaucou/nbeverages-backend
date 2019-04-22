const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    orderId: String,
    date: String,
    status: {
        label: String,
        value: String,
    },
    customerName: String,
    paymentMethod: {
        label: String,
        value: String,
    },
    customerEmail: String,
    deliveryMethod: {
        label: String,
        value: String,
    },
    deliveryAddress: String,
    customerPhone: String,
    totalAmount: Number,
    currency: {
        label: String,
        value: String,
    },
    items: Array,
});

module.exports = mongoose.model('Order', OrderSchema);
