const express = require('express');
const Search = require('../controllers/searchController');
const route = express.Router()

route.get('/query?', Search.searchQuery);

module.exports = route