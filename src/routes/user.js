const express = require('express');
const User = require('../controllers/UserController');
const route = express.Router()

// route.get('/getByID', User);
route.post('/login', User.loginUser);
route.post('/create', User.createUser);

module.exports = route