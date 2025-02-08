const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Cấu hình Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "ANON/brandsCate", // Đường dẫn thư mục trên Cloudinary
        upload_preset: "ANON_BRADSCATE", // Upload Preset được cấu hình trên Cloudinary
        allowed_formats: ["jpeg", "png", "jpg"], // Chỉ cho phép các định dạng này
    },
});
module.exports = { cloudinary, storage };

