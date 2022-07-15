const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// remove path
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

// upload file
exports.uploadFile = async (req, res) => {
    try {
        // validate file upload
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({msg: "กรุณาอัพโหลดรูปภาพ"});
        }

        // file size
        const file = req.files.file;
        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "ไม่สามารถอัพไฟล์ภาพที่มีขนาดใหญ่กว่า 1mb ได้"})
        }

        // Validate file type
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" && file.mimetype !== "image/jpg") {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "ประเภทไฟล์ไม่ถูกต้อง"})
        }

        // cloud folder
        cloudinary.uploader.upload(file.tempFilePath, {folder: "Content-Blog-MERN"}, async (err, result) => {
            if (err) throw err;
            removeTmp(file.tempFilePath)

            res.json({public_id: result.public_id, url: result.secure_url})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// delete image
exports.deleteImage = async (req, res) => {
    try {
        const {public_id} = req.body;
        // validate
        if (!public_id) {
            res.status(400).json({msg: "ไม่มีเลือกรูปที่จะลบ"})
        }

        // delete image by id
        cloudinary.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;

            res.json({msg: "ลบรูปเรียบร้อยแล้ว"})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}