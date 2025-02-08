const mongoose = require('mongoose');
const tagProductSchema = new mongoose.Schema(
    {
        label: { type: String },
        value: { type: String }
    },
    {
        timestamps: true,
    }
)
const TagProduct = mongoose.model('TagProduct', tagProductSchema);
module.exports = TagProduct