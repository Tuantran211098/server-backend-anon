const Search = require('../services/searchServices')
const searchQuery = async (req, res) => {
    try {
        // console.log("File nhận được:", req.file);
        const response = await Search.searchQuery(req.query)
        return res.status(200).json(response)
        // console.log();
    } catch (error) {
        console.log('searchQuery', error);
    }
}




module.exports = {
    searchQuery
}