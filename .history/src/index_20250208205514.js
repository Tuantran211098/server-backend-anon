const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const { connectBrandCategoryDB, connectCategoryDB, connectProductDB, connectTagProductDB } = require('./config/db'); // Import các hàm kết nối
const routes = require('./routes/index');
var bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const PORT = 3003;
dotenv.config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes

// Cập nhật lại whitelist với frontend domain chính xác
var whitelist = [
  'https://frontend-anon-mu.vercel.app', // Đảm bảo frontend chính xác
  'http://localhost:3000',
];

// Cấu hình CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Đảm bảo frontend của bạn được phép
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`🚨 Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Cho phép gửi cookies nếu cần thiết
};

// Sử dụng middleware CORS
app.use(cors(corsOptions));

// API route ví dụ
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from backend' });
});
// Cấu hình Helmet & rateLimit
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 phút
  limit: 50, // Giới hạn 50 requests/IP trong 1 phút
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    console.log("Request từ IP:", req.ip); // Kiểm tra IP
    return req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
  },
  handler: (req, res) => {
    console.log("Bị chặn do quá giới hạn request:", req.ip); // Kiểm tra có bị chặn không
    res.status(429).json({ message: "You sent over request per minute, please try it agian!" });
  },
});
app.set("trust proxy", 1); // Cho phép lấy IP thật trong môi trường proxy
app.use("/api/", limiter);


routes(app);


//Kết nối MongoDB cơ sở dữ liệu
// Kết nối đến BrandCategory, Category, và Product
connectBrandCategoryDB();
connectCategoryDB();
connectProductDB();
connectTagProductDB();

// connectBrandCategoryDB(); // Kết nối đến BrandCategory
// connectCategoryDB(); // Kết nối đến Category
// connectProductDB();// Kết nối đến product


// const startServer = async () => {
//   try {
//     await Promise.all([
//       connectBrandCategoryDB(), // Kết nối đến BrandCategory
//       connectCategoryDB(), // Kết nối đến Category
//       connectProductDB(), // Kết nối đến Product
//     ]);
//     console.log('All databases connected successfully');

//     // Các logic server khác (ví dụ: express app, routes, etc.)
//   } catch (error) {
//     console.error('Failed to connect to databases:', error);
//     process.exit(1); // Thoát nếu không thể kết nối
//   }
// };

//startServer();

// API test
app.get('/', (req, res) => {
  res.json({ message: 'Hello from backend' });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});





