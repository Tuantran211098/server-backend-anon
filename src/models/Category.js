const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
    {
        title: { type: String, required: true, uniqui: true },
        author: { type: String },
        des: { type: String },
        image: { type: String },
        slug: { type: String },
        cate_child: { type: Array },
        prioritize: { type: Number },
        isParent: { type: Boolean },
        alt: { type: String }
    },
    {
        timestamps: true,
    }
)
const Category = mongoose.model('Category', categorySchema)
module.exports = Category