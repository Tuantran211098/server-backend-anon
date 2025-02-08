const Category = require("../models/Category");

const cloudinary = require("cloudinary").v2;

//config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const newCateService = (file, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTitleExist = await Category.find({ title: data.title })
            console.log('data newCateService', data);
            if (!checkTitleExist) {
                return resolve({
                    status: 'ERR',
                    message: "Title is exist already!",
                });
            }



            // Upload file lên Cloudinary
            const results = await cloudinary.uploader.upload_stream(
                {
                    folder: "ANON/avatarCategory", // Thư mục lưu trữ trên Cloudinary
                    resource_type: "image",
                },
                async (error, result) => {
                    if (error) {

                        return res.status(500).json({ message: "Lỗi upload Cloudinary", error });
                    }

                    // Tìm giá trị lớn nhất của prioritize
                    const maxPrioritize = await Category.findOne()
                        .sort({ prioritize: -1 }) // Sắp xếp giảm dần theo prioritize
                        .select("prioritize"); //Chỉ lấy trường prioritize

                    // Xác định giá trị prioritize tiếp theo
                    const nextPrioritize = maxPrioritize ? maxPrioritize.prioritize + 1 : 1;

                    // Tạo category mới
                    const cateChild = data.cate_child && JSON.parse(data.cate_child)
                    if (Array.isArray(cateChild)) {

                        //Tìm và cập nhật các những cate_child có trong đó đẩy nó vào từng cate cha
                        // Dùng Promise.all để đảm bảo tất cả các promise chạy song song
                        await Promise.all(
                            cateChild.map(async (child) => {
                                // Tìm category trùng khớp với _id
                                const matchingCategory = await Category.findById(child._id);

                                if (matchingCategory) {
                                    // Loại bỏ trường value không cần thiết từ data
                                    const updateData = { ...data }; // Tạo một bản sao của data
                                    delete updateData.cate_child; // Xóa trường cate_child khỏi dữ liệu cần cập nhật

                                    // Thêm hoặc cập nhật vào mảng cate_child
                                    const updatedCategory = await Category.findByIdAndUpdate(
                                        child._id,
                                        {
                                            $push: {
                                                cate_child: {
                                                    ...child, // Dữ liệu từ cate_child
                                                    ...updateData, // Dữ liệu từ data
                                                },
                                            },
                                        },
                                        { new: true, upsert: true } // Trả về dữ liệu sau khi cập nhật
                                    );

                                    console.log(`Updated category: ${child._id}`, updatedCategory);
                                } else {
                                    console.log(`Category not found: ${child._id}`);
                                }
                            })
                        );
                    }
                    const newCategory = await Category.create({
                        ...data,
                        image: result.secure_url,
                        cate_child: cateChild,
                        prioritize: nextPrioritize,
                        isParent: data.typeofCate === 'true' ? true : false
                    });



                    console.log('All updates completed.');

                    resolve({
                        status: 'OK',
                        message: 'Create Category Successful!',
                        data: newCategory
                    });

                }
            );

            // Gửi dữ liệu buffer từ multer lên Cloudinary
            results.end(file.buffer);
            // console.log('results', results);

        } catch (error) {
            console.log('newCate', error);
        }
    })
}
const getAllCate = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('query', query);
            const _page = query._page || 1;
            const _limit = query._limit;
            const skip = parseInt((_page - 1) * _limit);
            const fetchCateData = await Category.find().sort({ _id: -1 }).skip(skip).limit(parseInt(_limit))
            const countDocuments = await Category.find().countDocuments()
            resolve({
                status: 'OK',
                message: 'Fetch Category Successful!',
                data: fetchCateData,
                countDoc: countDocuments
            });
        } catch (error) {
            console.log('newCate', error);
        }
    })
}
const deleteCateSingle = (query) => {
    return new Promise(async (resolve, reject) => {
        try {

            const deleteIDsingle = await Category.findByIdAndDelete({ _id: query._id });
            if (!deleteIDsingle) {
                resolve({
                    status: 'ERR',
                    message: 'Delete Category fail!',
                })
            }
            resolve({
                status: 'OK',
                message: 'Fetch Category Successful!',
                data: deleteIDsingle
            });
        } catch (error) {
            console.log('deleteCateSingle', error);
        }
    })
}
const deleteCateMutiple = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { ids } = body
            console.log('body', ids);
            // Xóa các tài liệu dựa trên ID
            const deleteIDMutiple = await Category.deleteMany({ _id: { $in: ids } });
            resolve({
                status: 'OK',
                message: 'Delete Mutiple Category Successful!',
                data: deleteIDMutiple
            });
        } catch (error) {
            console.log('deleteCateMutiple', error);
        }
    })
}
module.exports = {
    newCateService,
    getAllCate,
    deleteCateSingle,
    deleteCateMutiple
}