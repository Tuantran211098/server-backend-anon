const Brands = require("./brands");
const Category = require("./Category");
const Product = require('./product')
const Order = require('./order')
const Search = require('./search')
const User = require('./user')
const routes = (app) => {
    app.use('/api/brands', Brands)
    app.use('/api/category', Category)
    app.use('/api/product', Product)
    app.use('/api/order', Order)
    app.use('/api/search', Search)
    app.use('/api/user', User)
};
module.exports = routes;
