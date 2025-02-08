const mongoose = require("mongoose")

const brandsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, uniqui: true },
        slug: { type: String },
        author: { type: String },
        des: { type: String },
        image: { type: String },
        alt: { type: String },

    },
    {
        timestamps: true,
    }
)
const BrandCategory = mongoose.model('BrandCategory', brandsSchema)
module.exports = BrandCategory