const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    items: Array,
    customerName: String,
    paymentMethod: String,
    customerEmail: String,
    deliveryMethod: String,
    deliveryAddress: String,
    customerPhone: String,
    totalAmount: String,
    currency: String,
    status: String,
});

module.exports = mongoose.model('Order', OrderSchema);
