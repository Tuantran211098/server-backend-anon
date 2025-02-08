const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, uniqui: true },
        password: { type: String },
        role: { type: String },
        permission: { type: Array },
        info: {
            city: { type: String },
            district: { type: String },
            ward: { type: String },
            phone: { type: Number },
            name: { type: String },
        },
        image: { type: String },
        createTime: { type: Date },
        updateTime: { type: Date },
    },
    {
        timestamps: true,
    }
)
const User = mongoose.model('User', userSchema);
module.exports = User