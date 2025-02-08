const express = require('express');
const Category = require('../controllers/categoryControl');
const route = express.Router()
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

route.post('/create', upload.single('image'), Category.newCate);
route.get('/all?', Category.getAllCate);
route.delete('/delete-single', Category.deleteCateSingle);
route.post('/delete-mutiple', Category.deleteCateMutiple);
module.exports = route