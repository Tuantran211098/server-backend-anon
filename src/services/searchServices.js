const Product = require('../models/ProductModel')


const searchQuery = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const select = query._fullField === "true" ? "title slug images price_onsale price_original rating in_stock tags brand" : "title slug images";
            const limit = query._fullField === "true" ? 15 : 50;
            const skip = query._fullField === "true" ? (query._page ? (query._page - 1) * limit : 0) : 0; // Tính skip nếu có `page`
            console.log('check cond', select, limit, skip, query);
            const results = await Product.find({
                title: { $regex: `.*${query?._s}.*`, $options: 'i' }  // '.*' giúp tìm kiếm chuỗi con ở bất kỳ vị trí nào trong `title`
            })
                .select(select)
                .limit(limit)
                .skip(skip)
                .exec();

            // Đếm số lượng kết quả khớp với truy vấn
            const count = await Product.countDocuments({
                title: { $regex: `.*${query?._s}.*`, $options: 'i' }  // Sử dụng điều kiện giống như trên để đếm
            });
            console.log('results before resolve 4', results, query);
            resolve({
                status: 'OK',
                message: 'Get product by query Successful!',
                data: results || [],
                count: count
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            resolve({
                status: 'Error',
                message: 'Failed to fetch products',
                data: [],
            });
        }
    })
}
module.exports = {
    searchQuery
}