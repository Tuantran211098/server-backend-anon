const CateService = require("../services/categoryServices");

const newCate = async (req, res) => {
    try {
        const data = req.body;
        const response = await CateService.newCateService(req.file, data);
        return res.status(200).json(response);
    } catch (error) {
        console.log('newCate', error);
    }
}
const getAllCate = async (req, res) => {
    try {
        const query = req.query;
        const response = await CateService.getAllCate(query);
        return res.status(200).json(response);
    } catch (error) {
        console.log('newCate', error);
    }
}
const deleteCateSingle = async (req, res) => {
    try {
        const query = req.query;
        const response = await CateService.deleteCateSingle(query);
        return res.status(200).json(response);
    } catch (error) {
        console.log('newCate', error);
    }
}
const deleteCateMutiple = async (req, res) => {
    try {
        const body = req.body;
        const response = await CateService.deleteCateMutiple(body);
        return res.status(200).json(response);
    } catch (error) {
        console.log('deleteCateMutiple', error);
    }
}
module.exports = {
    newCate,
    getAllCate,
    deleteCateSingle,
    deleteCateMutiple
}