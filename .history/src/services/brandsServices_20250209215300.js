const Brands = require('../models/Brand')
const cloudinary = require("cloudinary").v2;

//config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const createBrands = (file, body, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('file', file, 'body', body);
            const checkTitleExist = await Brands.findOne({ title: body.title })
            if (checkTitleExist) {
                return resolve({
                    status: 'ERR',
                    message: "Title is exist already!",
                })
            }

            // Upload file lên Cloudinary
            const results = await cloudinary.uploader.upload_stream(
                {
                    folder: "ANON/brandsCate", // Thư mục lưu trữ trên Cloudinary
                    resource_type: "image",
                },
                async (error, result) => {
                    if (error) {
                        console.error("Lỗi upload Cloudinary:", error);
                        return res.status(500).json({ message: "Lỗi upload Cloudinary", error });
                    }

                    //cập nhật tạo mới cho database
                    console.log('result', result.secure_url, typeof result.secure_url);
                    const response = await Brands.create({
                        title: body.title,
                        des: body.des,
                        slug: body.slug,
                        image: result.secure_url,
                        alt: body.alt
                    })
                    resolve({
                        status: 'OK',
                        message: "Create New Brand product Success!",
                        data: response, // URL của ảnh sau khi upload
                    })

                }
            );

            // Gửi dữ liệu buffer từ multer lên Cloudinary
            results.end(file.buffer);

        } catch (error) {
            reject(error);
        }
    })
}
const getAllBrands = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('query', query);
            const _limit = query?._limit || 11;
            const _page = query?._page || 1;
            const skip = (_page - 1) * _limit;
            const getAll = await Brands.find().sort({ _id: -1 }).skip(skip).limit(parseInt(_limit));
            const countDocuments = await Brands.find().countDocuments()
            resolve({
                status: 'OK',
                message: "Get All Brand product Success!",
                data: getAll, // URL của ảnh sau khi upload
                countDoc: countDocuments
            })
        } catch (error) {
            reject(error);
        }
    })
}
const deleteSingleBrands = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('query deleteSingleBrands', _id);
            const deleteByID = await Brands.findByIdAndDelete({ _id: _id._id })
            resolve({
                status: 'OK',
                message: "Delete Brand product Success!",
                data: deleteByID
            })
        } catch (error) {
            reject(error);
        }
    })
}
const deleteMutipleBrands = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { ids } = body
            console.log('body', ids);
            // Xóa các tài liệu dựa trên ID
            const deleteIDMutiple = await Brands.deleteMany({ _id: { $in: ids } });
            resolve({
                status: 'OK',
                message: 'Delete Mutiple brands product Successful!',
                data: deleteIDMutiple
            });
        } catch (error) {
            console.log('deleteMutipleBrands', error);
        }
    })
}
const getBySlug = (query) => {
    return new Promise(async (resolve, reject) => {
        try {

            // tìm brand dua trên slug brands
            const getBrandBySlug = await Brands.findOne({ slug: query._slug });
            const countDocuments = await Brands.find().countDocuments();
            console.log('getBySlug', query, getBrandBySlug);
            resolve({
                status: 'OK',
                message: 'Get brands product by ID Successful!',
                data: getBrandBySlug,
                countDoc: countDocuments
            });
        } catch (error) {
            console.log('getBySlug', error);
        }
    })
}
module.exports = {
    createBrands,
    getAllBrands,
    deleteSingleBrands,
    deleteMutipleBrands,
    getBySlug
}