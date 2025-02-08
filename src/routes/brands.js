const express = require("express");
const multer = require("multer");

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });
const brands = require('../controllers/brandsControl')

const route = express.Router()
route.post('/create', upload.single('image'), brands.createBrands)
route.get('/all?', brands.getAllBrands)
route.get('/getbyslug?', brands.getBySlug)
route.delete('/delete-single', brands.deleteSingleBrands)
route.post('/delete-mutiple', brands.deleteMutipleBrands);
module.exports = route