// const express = require('express');
// const cors = require('cors');
// const app = express();
// const dotenv = require('dotenv')
// const { connectBrandCategoryDB, connectCategoryDB, connectProductDB, connectTagProductDB } = require('./config/db'); // Import các hàm kết nối
// const routes = require('./routes/index')
// var bodyParser = require('body-parser');
// const { default: mongoose } = require('mongoose');
// const helmet = require('helmet');
// const rateLimit = require("express-rate-limit");
// const PORT = 4000;
// dotenv.config();

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))



// // Routes

// // Cập nhật lại whitelist với frontend domain chính xác
// var whitelist = [
//   'https://frontend-anon-mu.vercel.app/', // Đảm bảo frontend chính xác
//   'http://localhost:3000',
//   // 'https://esgoo.net/',
//   // 'https://www.sandbox.paypal.com',
//   // 'https://*.paypal.com', 'https://paypal.com',
//   // 'https://data.fixer.io',
//   // 'https://fixer.io',
//   // 'https://apis.google.com',
//   // 'https://google.com',
//   // 'https://vercel.app/',
//   // 'blob:https://accounts.google.com/',
//   // 'https://accounts.google.com/',
//   // 'https://backend-anon.vercel.app/',
// ];

// // Cấu hình CORS
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Đảm bảo frontend của bạn được phép
//     if (!origin || whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.error(`🚨 Blocked by CORS: ${origin}`);
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true, // Cho phép gửi cookies nếu cần thiết
// };

// // Sử dụng middleware CORS
// app.use(cors(corsOptions));

// // Đảm bảo rằng bạn cũng xử lý CORS cho các yêu cầu OPTIONS (Preflight requests)
// // app.options('*', cors(corsOptions));
// // // Cấu hình CSP với Helmet
// // app.use(
// //   helmet.contentSecurityPolicy({
// //     directives: {
// //       defaultSrc: ["'self'", 'http://localhost:3000', 'https://trusted-site.com'],
// //       scriptSrc: ["'self'", "'unsafe-inline'"],
// //       styleSrc: ["'self'", "'unsafe-inline'"],
// //       imgSrc: ["'self'", 'data:'],
// //     }
// //   })
// // );
// // API route ví dụ
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Hello from backend' });
// });
// // Cấu hình Helmet & rateLimit
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 phút
//   limit: 50, // Giới hạn 10 requests/IP trong 1 phút
//   standardHeaders: true,
//   legacyHeaders: false,
//   keyGenerator: (req) => {
//     console.log("Request từ IP:", req.ip); // Kiểm tra IP
//     return req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
//   },
//   handler: (req, res) => {
//     console.log("Bị chặn do quá giới hạn request:", req.ip); // Kiểm tra có bị chặn không
//     res.status(429).json({ message: "You sent over request per minute, please try it agian!" });
//   },
// });
// app.set("trust proxy", 1); // Cho phép lấy IP thật trong môi trường proxy
// app.use("/api/", limiter);

// app.use(
//   helmet({
//     hidePoweredBy: true, // Ẩn header X-Powered-By
//     xssFilter: true, // Ngăn chặn tấn công XSS

//     // Content Security Policy (CSP)
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'", "http://localhost:3000", "https://frontend-anon-mu.vercel.app"],
//         scriptSrc: ["'self'", "http://localhost:3000", "https://frontend-anon-mu.vercel.app"],
//         styleSrc: ["'self'", "http://localhost:3000", "https://frontend-anon-mu.vercel.app"],
//         imgSrc: ["'self'", "data:", "http://localhost:3000", "https://frontend-anon-mu.vercel.app"],
//         connectSrc: ["'self'", "http://localhost:3000", "https://frontend-anon-mu.vercel.app"],
//         fontSrc: ["'self'", "http://localhost:3000", "https://frontend-anon-mu.vercel.app"],
//         objectSrc: ["'none'"],
//         frameSrc: ["'self'", "http://localhost:3000", "https://frontend-anon-mu.vercel.app"],
//         upgradeInsecureRequests: [],
//       },
//     },

//     // HTTP Strict Transport Security (HSTS)
//     hsts: {
//       maxAge: 31536000, // 1 năm
//       includeSubDomains: true,
//       preload: true,
//     },

//     // X-Frame-Options: ngăn chặn Clickjacking
//     frameguard: {
//       action: "deny", // Không cho phép nội dung được nhúng qua iframe
//       // Có thể sử dụng "sameorigin" nếu muốn cho phép iframe từ cùng domain
//       //action: 'sameorigin', // Có thể sử dụng "sameorigin" nếu muốn cho phép iframe từ cùng domain
//       // Hoặc giới hạn chỉ cho phép nhúng từ chính domain:
//       // frameAncestors: ["'self'"]
//     },

//     // DNS Prefetch Control
//     dnsPrefetchControl: {
//       allow: false,
//     },

//     // Bảo vệ khỏi MIME type sniffing
//     noSniff: true,

//     // Referrer Policy
//     referrerPolicy: {
//       policy: "strict-origin-when-cross-origin",
//     },

//     // Permissions Policy (Feature-Policy cũ)
//     permissionsPolicy: {
//       features: {
//         geolocation: ["'self'"],
//         camera: [],
//         microphone: [],
//       },
//     },
//   })
// );
// routes(app);


// //Kết nối MongoDB cơ sở dữ liệu
// // Kết nối đến BrandCategory, Category, và Product
// connectBrandCategoryDB();
// connectCategoryDB();
// connectProductDB();
// connectTagProductDB()

// // connectBrandCategoryDB(); // Kết nối đến BrandCategory
// // connectCategoryDB(); // Kết nối đến Category
// // connectProductDB();// Kết nối đến product


// // const startServer = async () => {
// //   try {
// //     await Promise.all([
// //       connectBrandCategoryDB(), // Kết nối đến BrandCategory
// //       connectCategoryDB(), // Kết nối đến Category
// //       connectProductDB(), // Kết nối đến Product
// //     ]);
// //     console.log('All databases connected successfully');

// //     // Các logic server khác (ví dụ: express app, routes, etc.)
// //   } catch (error) {
// //     console.error('Failed to connect to databases:', error);
// //     process.exit(1); // Thoát nếu không thể kết nối
// //   }
// // };

// // startServer();

// // mongoose.connect('mongodb+srv://admin:ReN1DnVqpc6vjiG2@clusteranon.hbtbt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterANON')
// //   .then(() => {
// //     console.log('Connect thành công nha VẬY LÀ DÔ R ĐÓ');
// //   })
// //   .catch((err) => {
// //     console.log('Không kết nối được csdl', err);
// //   })


// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`)
// })
// // Export đúng format cho Vercel
// export default app;


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { connectBrandCategoryDB, connectCategoryDB, connectProductDB, connectTagProductDB } = require('./config/db');
const port = 3003
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình CORS
const whitelist = [
  'https://frontend-anon-mu.vercel.app',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`🚨 Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware bảo mật với Helmet
app.use(helmet());

// Giới hạn số request
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 phút
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// API test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

// Định tuyến API
routes(app);

// Kết nối MongoDB (chỉ kết nối nếu chưa kết nối)
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:ReN1DnVqpc6vjiG2@clusteranon.hbtbt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterANON';

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Kết nối MongoDB thành công'))
    .catch(err => console.error('❌ Không kết nối được MongoDB:', err));
}

// ❌ Xóa `app.listen(PORT)`, Vercel không cần chạy server
// ✅ Export handler cho Vercel
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend' });
});
module.exports = app;
