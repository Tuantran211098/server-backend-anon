const express = require('express');
const Product = require('../controllers/productControl');
const route = express.Router()
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
/////part tags product
route.get('/gettags', Product.getAllTags);
route.post('/addtag', upload.none(), Product.createTags);
route.delete('/delete', Product.deleteTag);
/////part product(get,put,post,delete)
// Route xử lý upload nhiều file
route.post('/add', upload.array('files'), Product.createProduct);
// get all products
route.get('/all?', Product.getAllProducts);
route.delete('/delete-single', Product.deleteSingleProduct)
route.post('/delete-mutiple', Product.deleteMutipleProducts);
// get all products by name of part
route.get('/block?', Product.getPartProducts);
// get product theo điều kiện lọc trong collection
route.get('/getbyslug', Product.getBySlug);
// get detail product theo trường slug
route.get('/getProductByID', Product.getProductByID);
module.exports = route