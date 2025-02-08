const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        orderID: { type: String },
        payerID: { type: String },
        paymentSource: { type: String },
        payerEmail: { type: String },
        linkPayment: { type: Array },
        shipping: {
            name: { type: String },
            phone: { type: Number },
            city: { type: String },
            district: { type: String },
            ward: { type: String },
            address: { type: String },
            note: { type: String },
        },
        items: { type: Array },
        totalAmount: { type: Number },
        fee: { type: Number },
        isPaid: { type: Boolean },
        isPaidAt: { type: Date },
        isDelevery: { type: Boolean },
        isDeleveryAt: { type: Date },
    },
    {
        timestamps: true,
    }
)
const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;