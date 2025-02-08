const Product = require('../services/productServices')
const createTags = async (req, res) => {
    try {
        const data = req.body;
        const response = await Product.createTags(data);
        return res.status(200).json(response);
    } catch (error) {
        console.log('createTags', error);
    }
}
const getAllTags = async (req, res) => {
    try {
        const response = await Product.getAllTags();
        return res.status(200).json(response);
    } catch (error) {
        console.log('getAllTags', error);
    }
}
const deleteTag = async (req, res) => {
    try {
        const { _id } = req.query;
        const response = await Product.deleteTag(_id);
        return res.status(200).json(response);
    } catch (error) {
        console.log('getAllTags', error);
    }
}
const createProduct = async (req, res) => {
    try {
        // console.log('req.files, req.body', req.files, req.body);
        const response = await Product.createProduct(req.files, req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log('createProduct', error);
    }
}
const getAllProducts = async (req, res) => {
    try {
        // console.log('req.files, req.body', req.files, req.body);
        const response = await Product.getAllProducts(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log('createProduct', error);
    }
}
const deleteSingleProduct = async (req, res) => {
    try {
        const response = await Product.deleteSingleProduct(req.query)
        return res.status(200).json(response)
        // console.log();
    } catch (error) {
        console.log('deleteSingleProduct', error);
    }
}

const deleteMutipleProducts = async (req, res) => {
    try {
        const body = req.body;
        const response = await Product.deleteMutipleProducts(body)
        return res.status(200).json(response);
        // console.log();
    } catch (error) {
        console.log('deleteMutipleProducts', error);
    }
}
const getPartProducts = async (req, res) => {
    try {
        const response = await Product.getPartProducts(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log('getPartProducts', error);
    }
}
const getDistrinctBrand = async (req, res) => {
    try {
        const response = await Product.getDistrinctBrand(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log('getDistrinctBrand', error);
    }
}
const getBySlug = async (req, res) => {
    try {
        const query = req.query;
        const response = await Product.getBySlug(query)
        return res.status(200).json(response);
    } catch (error) {
        console.log('getBySlug', error);
    }
}
const getProductByID = async (req, res) => {
    try {
        const query = req.query;
        const response = await Product.getProductByID(query)
        return res.status(200).json(response);
    } catch (error) {
        console.log('getProductByID', error);
    }
}
module.exports = {
    createTags,
    getAllTags,
    deleteTag,
    createProduct,
    getAllProducts,
    deleteSingleProduct,
    deleteMutipleProducts,
    getPartProducts,
    getDistrinctBrand,
    getBySlug,
    getProductByID
}