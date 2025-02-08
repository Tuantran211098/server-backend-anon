
const Order = require('../models/OrderModel');


const createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('createOrder', data);
            const createOrder = await Order.create({
                ...data,
                shipping: {
                    name: data.shipping.name,
                    phone: data.shipping.phone,
                    city: data.shipping.city[1],
                    district: data.shipping.district[1],
                    ward: data.shipping.ward[1],
                    address: data.shipping.address,
                    note: data.shipping.note,
                }
            })
            resolve({
                status: 'OK',
                message: `Add Order success!`,
                data: createOrder
            })
        } catch (error) {
            console.error("createOrder", error);
            // reject({
            //     status: "FAIL",
            //     message: "Error creating order",
            //     error,
            // });
        }
    });
};
module.exports = {
    createOrder
}