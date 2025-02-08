const Brand = require('../services/brandsServices')
const createBrands = async (req, res) => {
    try {
        // console.log("File nhận được:", req.file);
        // console.log("File:", req.body);
        const response = await Brand.createBrands(req.file, req.body)
        return res.status(200).json(response)
        // console.log();
    } catch (error) {
        console.log('createBrands', error);
    }
}
const getAllBrands = async (req, res) => {
    try {
        const response = await Brand.getAllBrands(req.query)
        return res.status(200).json(response)
        // console.log();
    } catch (error) {
        console.log('getAllBrands', error);
    }
}
const deleteSingleBrands = async (req, res) => {
    try {
        const response = await Brand.deleteSingleBrands(req.query)
        return res.status(200).json(response)
        // console.log();
    } catch (error) {
        console.log('deleteSingleBrands', error);
    }
}

const deleteMutipleBrands = async (req, res) => {
    try {
        const body = req.body;
        const response = await Brand.deleteMutipleBrands(body)
        return res.status(200).json(response);
        // console.log();
    } catch (error) {
        console.log('deleteMutipleBrands', error);
    }
}
const getBySlug = async (req, res) => {
    try {
        const query = req.query;
        const response = await Brand.getBySlug(query)
        return res.status(200).json(response);
    } catch (error) {
        console.log('getBySlug', error);
    }
}



module.exports = {
    createBrands,
    getAllBrands,
    deleteSingleBrands,
    deleteMutipleBrands,
    getBySlug
}