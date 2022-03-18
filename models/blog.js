// titel, content, author, slug(url)
const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true // ห้ามใส่ค่าว่าง
    },
    content: {
        type: {},
        required: true
    },
    author: {
        type: String,
        default:"Admin"
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true // ห้ามซ้ำกัน
    }
}, {timestamps: true}) // ระบุเวลา

module.exports = mongoose.model("Blog", blogSchema);