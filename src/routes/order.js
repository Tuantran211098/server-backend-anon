const express = require('express');
const Order = require('../controllers/orderController');
const route = express.Router()
route.post('/create', Order.createOrder);
module.exports = route