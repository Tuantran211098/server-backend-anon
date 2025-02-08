const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        title: { type: String },
        slug: { type: String },
        price_original: { type: Number },
        price_onsale: { type: Number },
        des_long: { type: String },
        des_short: { type: String },
        brand: { type: String },
        images: { type: Array },
        tags: { type: Array },
        cate_child: { type: Array },
        onsale_period: { type: Array },
        option_product: { type: Array },
        in_stock: { type: Number },
        rating: { type: Number },
        type_badge: { type: String },
        isPart: { type: Array }
    },
    {
        timestamps: true,
    }
)
// Tạo text index cho trường `title` để khi dùng search sản phẩm tối ưu hóa hiệu năng naht61 đối với dử liệu lớn
productSchema.index({ title: 1 });
const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;