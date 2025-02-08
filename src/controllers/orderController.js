const Order = require('../services/orderServices')
const createOrder = async (req, res) => {
    try {

        console.log('createOrder control', req.body);
        const response = await Order.createOrder(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log('createOrder', error);
    }
}

module.exports = {
    createOrder,
}