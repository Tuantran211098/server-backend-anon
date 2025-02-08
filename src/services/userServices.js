const bcrypt = require('bcrypt');
const User = require('../models/UserModel')
//package giúp ngăn chặn NoSQL Injection 
const mongoSanitize = require('mongo-sanitize');
const createUser = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('createUser', body);
            const checkUser = await User.findOne({
                email: mongoSanitize(body?.email)
            });
            console.log('checkUser', checkUser);
            if (checkUser) {
                return resolve({
                    status: 'ERR',
                    message: `User ${body?.email} is exist in system!`,
                });
            }
            const hashPass = bcrypt.hashSync(body.password, 10);
            const createUser = await User.create({
                ...body,
                password: hashPass
            })
            // console.log('checkUser', checkUser);
            resolve({
                status: 'OK',
                message: 'create user Successful!',
                data: createUser
            });
        } catch (error) {
            console.error('createUser', error);

        }
    })
}
const loginUser = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('createUser', body);

            ////// check mail
            const checkUser = await User.findOne({
                email: body?.email
            });
            console.log('getUserByEmail', checkUser);
            if (checkUser == null) {
                return resolve({
                    status: 'ERR',
                    message: 'User not exist!',
                });
            }

            ////// check pass
            const checkPass = bcrypt.compareSync(body?.password, checkUser.password)
            console.log('checkPass', checkUser, checkPass);
            if (!checkPass) {
                return resolve({
                    status: 'ERR',
                    message: 'Password incorrect!',
                });
            }
            resolve({
                status: 'OK',
                message: 'Get user Successful!',
                data: checkUser
            });
        } catch (error) {
            console.error('getUserByEmail', error);

        }
    })
}
module.exports = {
    createUser,
    loginUser
}