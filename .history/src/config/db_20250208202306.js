const mongoose = require('mongoose');
require('dotenv').config();

// Hàm kết nối đến MongoDB
const connectDB = async (dbUri) => {
    try {
        // Kiểm tra xem đã có kết nối nào chưa
        if (mongoose.connections[0].readyState) {
            console.log('MongoDB is already connected');
            return;
        }
        // Kết nối với MongoDB
        await mongoose.connect(dbUri, {
            connectTimeoutMS: 10000,  // Thời gian timeout là 10 giây
            serverSelectionTimeoutMS: 5000,  // Thời gian chọn máy chủ MongoDB là 5 giây
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);  // Dừng chương trình nếu không thể kết nối
    }
};


// Kết nối đến các cơ sở dữ liệu khác nhau
const connectBrandCategoryDB = () => connectDB(process.env.MONGO_URI_BRANDCATEGORY);
const connectCategoryDB = () => connectDB(process.env.MONGO_URI_CATEGORY);
const connectProductDB = () => connectDB(process.env.MONGO_URI_PRODUCT);
const connectTagProductDB = () => connectDB(process.env.MONGO_URI_TAGPRODUCT);

module.exports = {
    connectBrandCategoryDB,
    connectCategoryDB,
    connectProductDB,
    connectTagProductDB
};





// const mongoose = require('mongoose');
// require('dotenv').config();

// // Kết nối đến cơ sở dữ liệu BrandCategory
// const connectBrandCategoryDB = () => {
//     const mongoURI = process.env.MONGO_URI_BRANDCATEGORY;
//     mongoose.connect(mongoURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
// };

// // Kết nối đến cơ sở dữ liệu category
// const connectCategoryDB = () => {
//     const mongoURI = process.env.MONGO_URI_CATEGORY;
//     mongoose.connect(mongoURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     // .then(() => console.log('Connected to category Database'))
//     // .catch(err => console.log('Error connecting to category DB: ', err));
// };
// // Kết nối đến cơ sở dữ liệu product
// const connectProductDB = () => {
//     const mongoURI = process.env.MONGO_URI_PRODUCT;
//     mongoose.connect(mongoURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     // const mongoURI = process.env.MONGO_URI_PRODUCT;
//     // mongoose.connect(mongoURI)
//     // .then(() => console.log('Connected to product Database'))
//     // .catch(err => console.log('Error connecting to product DB: ', err));
// };

// module.exports = { connectBrandCategoryDB, connectCategoryDB, connectProductDB };



// const mongoose = require('mongoose');
// require('dotenv').config();

// let brandCategoryConnection;
// let categoryConnection;
// let productConnection;

// // Kết nối đến cơ sở dữ liệu BrandCategory
// const connectBrandCategoryDB = async () => {
//     try {
//         const mongoURI = process.env.MONGO_URI_BRANDCATEGORY;
//         brandCategoryConnection = await mongoose.createConnection(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             connectTimeoutMS: 30000, // Thời gian timeout là 10 giây
//         });
//         console.log('Connected to BrandCategory Database');
//         return brandCategoryConnection;
//     } catch (err) {
//         console.error('Error connecting to BrandCategory Database:', err);
//         process.exit(1); // Thoát nếu không thể kết nối
//     }
// };

// // Kết nối đến cơ sở dữ liệu Category
// const connectCategoryDB = async () => {
//     try {
//         const mongoURICategory = process.env.MONGO_URI_CATEGORY;
//         categoryConnection = await mongoose.createConnection(mongoURICategory, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             connectTimeoutMS: 30000, // Thời gian timeout là 10 giây
//         });
//         console.log('Connected to Category Database');
//         return categoryConnection;
//     } catch (err) {
//         console.error('Error connecting to Category Database:', err);
//         process.exit(1); // Thoát nếu không thể kết nối
//     }
// };

// // Kết nối đến cơ sở dữ liệu Product
// const connectProductDB = async () => {
//     try {
//         const mongoURIProduct = process.env.MONGO_URI_PRODUCT;
//         productConnection = await mongoose.createConnection(mongoURIProduct, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             connectTimeoutMS: 30000, // Thời gian timeout là 10 giây
//         });
//         console.log('Connected to Product Database');
//         return productConnection;
//     } catch (err) {
//         console.error('Error connecting to Product Database:', err);
//         process.exit(1); // Thoát nếu không thể kết nối
//     }
// };

// module.exports = {
//     connectBrandCategoryDB,
//     connectCategoryDB,
//     connectProductDB,
// };
