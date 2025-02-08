const User = require('../services/userServices')
const createUser = async (req, res) => {
    try {

        console.log('createUser control', req.body);
        const response = await User.createUser(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log('createUser', error);
    }
}
const loginUser = async (req, res) => {
    try {
        console.log('createUser control', req.body);
        const response = await User.loginUser(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log('createUser', error);
    }
}
module.exports = {
    createUser,
    loginUser
}