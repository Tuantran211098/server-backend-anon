const cloudinary = require("cloudinary").v2;
const TagProduct = require('../models/TagProduct');
const Brand = require('../models/Brand');
const Product = require('../models/ProductModel');
const { parse } = require("path");
//config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createTags = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTags = await TagProduct.findOne({ label: data.label.trim() });
            console.log('checkTags', checkTags, data);
            if (checkTags) {
                return resolve({
                    status: 'ERR',
                    message: 'This tag is exist in system!'
                });
            }
            const createTag = await TagProduct.create(data);
            resolve({
                status: 'OK',
                message: `Create tag ${createTag.label} successull!`,
                data: createTag
            })
        } catch (error) {
            reject(error)
        }
    })
}
const getAllTags = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllTags = await TagProduct.find().sort({ _id: -1 });
            resolve({
                status: 'OK',
                message: 'Fetch tags product successull!',
                data: getAllTags
            })
        } catch (error) {
            reject(error)
        }
    })
}
const deleteTag = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteTags = await TagProduct.findOneAndDelete({ _id: _id });
            resolve({
                status: 'OK',
                message: `Delete tags ${deleteTags.label} successull!`,
                data: deleteTags
            })
        } catch (error) {
            reject(error)
        }
    })
}
const createProduct = (files, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("files, body", files, body);
            const checkTitleExist = await Product.findOne({ title: body.title })
            if (checkTitleExist) {
                return resolve({
                    status: 'ERR',
                    message: `Title ${body.title} is exist in systems`
                })
            }
            console.log('checkTitleExist', checkTitleExist);
            // Sử dụng Promise.all để upload tất cả ảnh
            const uploadPromises = files.map(
                (file) =>
                    new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                folder: "ANON/product", // Thư mục lưu trữ trên Cloudinary
                                resource_type: "image", // Loại tài nguyên là ảnh
                            },
                            (error, result) => {
                                if (error) {
                                    console.error("Lỗi upload Cloudinary:", error);
                                    reject(error);
                                } else {
                                    console.log("Uploaded Image URL:", result.secure_url);
                                    resolve(result.secure_url);
                                }
                            }
                        );

                        // Gửi dữ liệu buffer từ multer lên Cloudinary
                        uploadStream.end(file.buffer); // Sửa `files.buffer` thành `file.buffer`
                    })
            );

            // Đợi tất cả ảnh được upload
            const uploadedImages = await Promise.all(uploadPromises);
            console.log('body data', body);
            const addProduct = await Product.create({
                ...body,
                price_original: Number(body.price_original),
                price_onsale: body.price_onsale === 'undefined' || body.price_onsale === null ? 0 : Number(body.price_onsale),
                tags: JSON.parse(body.tags),
                cate_child: JSON.parse(body.cate_child),
                onsale_period: body.onsale_period === 'undefined' || body.onsale_period === null ? [] : JSON.parse(body.onsale_period),
                in_stock: Number(body.in_stock),
                rating: Number(body.rating),
                option_product: body?.option_product !== 'undefined' ? JSON.parse(body?.option_product) : [],
                type_badge: body.type_badge === 'undefined' || body.type_badge === null ? 'default' : body.type_badge,
                isPart: body.isPart === 'undefined' || body.isPart === null ? [] : JSON.parse(body.isPart),
                images: uploadedImages
            })
            resolve({
                status: 'OK',
                message: `Add product success!`,
                data: addProduct
            })
        } catch (error) {
            console.error("Error creating product:", error);
            reject({
                status: "FAIL",
                message: "Error creating product",
                error,
            });
        }
    });
};
const getAllProducts = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('query', query);
            const _limit = query?._limit || 10;
            const _page = query?._page || 1;
            const skip = (_page - 1) * _limit;
            const getAll = await Product.find().sort({ _id: -1 }).skip(skip).limit(parseInt(_limit));
            const countDocuments = await Product.find().countDocuments()
            resolve({
                status: 'OK',
                message: "Get All product Success!",
                data: getAll,
                countDoc: countDocuments
            })
        } catch (error) {
            reject(error);
        }
    })
}
const deleteSingleProduct = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('query deleteSingleProduct', _id);
            const deleteByID = await Product.findByIdAndDelete({ _id: _id._id })
            resolve({
                status: 'OK',
                message: "Delete product Success!",
                data: deleteByID
            })
        } catch (error) {
            reject(error);
        }
    })
}
const deleteMutipleProducts = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { ids } = body
            console.log('body', ids);
            // Xóa các tài liệu dựa trên ID
            const deleteIDMutiple = await Product.deleteMany({ _id: { $in: ids } });
            resolve({
                status: 'OK',
                message: 'Delete Mutiple product Successful!',
                data: deleteIDMutiple
            });
        } catch (error) {
            console.log('deleteMutipleProducts', error);
        }
    })
}
const getPartProducts = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { _part } = query
            console.log('body', _part);
            // Xóa các tài liệu dựa trên ID
            const findProductByPart = await Product.find({ isPart: { $in: [`${_part}`] } });
            // const indexes = await Product.collection.getIndexes();
            // console.log('findProductByPart', findProductByPart, "index", indexes);
            resolve({
                status: 'OK',
                message: 'Get part product Successful!',
                data: findProductByPart
            });
        } catch (error) {
            console.log('getPartProducts', error);
        }
    })
}
const getDistrinctBrand = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('querys', query);

            const uniqueBrand = await Product.find({ brand: { $regex: `^${query._slug}$`, $options: "i" } });

            resolve({
                status: 'OK',
                message: 'Get brand product Successful!',
                data: uniqueBrand,

            });
        } catch (error) {
            console.log('getPartProducts', error);
        }
    })
}

const getBySlug = (query) => {
    return new Promise(async (resolve, reject) => {
        try {

            ////// Solution 1: tìm brand dua trên slug brands
            // const getBrandBySlug = await Product.find({ brand: query._slug });
            // const countDocuments = await Product.find({ brand: query._slug }).countDocuments();
            // console.log('getBySlug ser', query, getBrandBySlug);


            //////Solution 2:
            const _limit = Number(query._limit) || 10;
            const _page = Number(query._page) || 1
            const _skip = (_page - 1) * _limit;
            // Tách chuỗi _priceRange thành mảng
            const priceRangeArray = query._priceRange ? query._priceRange.split(",").map(Number) : [];
            const [minPrice, maxPrice] = priceRangeArray;
            console.log('query getBySlug2', query, minPrice, maxPrice);
            const matchQuery = {
                brand: query._slug, // Điều kiện mặc định với brand
            };

            // Kiểm tra nếu giá trị minPrice và maxPrice đã có, thêm vào query
            if (minPrice !== undefined && maxPrice !== undefined) {
                matchQuery.price_original = { $gte: minPrice, $lte: maxPrice }; // Nếu có minPrice và maxPrice, áp dụng vào điều kiện price_original
            }

            //   // Nếu price_onsale > 0, thêm điều kiện price_onsale vào query
            //   if (price_onsale > 0) {
            //     matchQuery.price_onsale = { $gte: priceOnSale }; // Nếu price_onsale lớn hơn 0, áp dụng điều kiện price_onsale
            //   }
            // let titleSortOrder = 1; // Giá trị mặc định (ascname)
            // let priceSortOrder = 1; // Giá trị mặc định (ascprice)

            // switch (query._sort) {
            //     case 'ascname':
            //         titleSortOrder = 1; // Tăng dần (A->Z)
            //         break;

            //     case 'descname':
            //         titleSortOrder = -1; // Giảm dần (Z->A)
            //         break;

            //     case 'ascprice':
            //         priceSortOrder = 1; // Tăng dần (A->Z)
            //         break;

            //     case 'descprice':
            //         priceSortOrder = -1; // Giảm dần (Z->A)
            //         break;

            //     default:
            //         break;
            // }
            // console.log('titleSortOrder', titleSortOrder, priceSortOrder);

            const sortField = {};
            switch (query._sort) {
                case 'ascname':
                    sortField.title = 1;  // Sắp xếp theo tên từ A -> Z
                    break;

                case 'descname':
                    sortField.title = -1; // Sắp xếp theo tên từ Z -> A
                    break;

                case 'ascprice':
                    sortField.price_original = 1;  // Sắp xếp theo giá từ thấp đến cao
                    break;

                case 'desprice':
                    sortField.price_original = -1; // Sắp xếp theo giá từ cao xuống thấp
                    break;

                default:
                    break;
            }
            console.log('sortField', sortField);
            const result = await Product.aggregate([
                {
                    $match: matchQuery // Áp dụng điều kiện $match
                },
                // {
                //     $match: {
                //         price_onsale: { $gte: minPrice }, // Điều kiện giá min
                //         price_original: { $lte: maxPrice }, // Điều kiện giá max
                //     },
                // },
                {
                    $facet: {
                        data: [
                            {
                                $sort: sortField,  // Áp dụng sắp xếp
                            },
                            { $skip: _skip },
                            { $limit: _limit },
                        ], // Lấy dữ liệu
                        count: [{ $count: "total" }], // Đếm tổng số
                    },
                },
            ]);
            const data = result[0]?.data || [];
            console.log('data', data);
            const count = result[0]?.count[0]?.total || 0;
            resolve({
                status: 'OK',
                message: 'Get brands product by slug Successful!',
                data: data,
                countDoc: count
            });
        } catch (error) {
            console.log('getBySlug', error);
        }
    })
}
const getProductByID = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('querys', query);

            const getProduct = await Product.findOne({ slug: query._slug });

            resolve({
                status: 'OK',
                message: 'Get  product by slug Successful!',
                data: getProduct,

            });
        } catch (error) {
            console.log('getProductByID', error);
        }
    })
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