// connect
const slugify = require("slugify");
const Blogs = require("../models/blog");
const { v4: uuidv4 } = require("uuid");

// create
exports.create = async (req, res) => {
    try {
        const {image, title, content, author} = req.body;
        let slug = slugify(title);

        if(!slug) slug = uuidv4();

        // validate data
        switch(true) {
            case !image:
                return res.status(400).json({error: "กรุณาเพิ่มรูปภาพ"});
                break;
            case !title:
                return res.status(400).json({error: "กรุณาป้อนชื่อบทความ"});
                break;
            case !content:
                return res.status(400).json({error: "กรุณาป้อนเนื้อหาบทความ"});
                break;
        }
        // บันทึกข้อมูล
        await Blogs.create({image, title, content, author, slug}, (err, blog) => {
            if(err) {
                res.status(400).json({error:"ชื่อบทความซ้ำกัน"})
            }
            res.json(blog);
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// get all blog
exports.getAllBlogs = async (req, res) => {
    try {
        await Blogs.find({}).exec((err, blogs) => {
            res.json(blogs)
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// get single blog
exports.singleBlog = async (req, res) => {
    try {
        const {slug} = req.params;
        await Blogs.findOne({slug}).exec((err, blog) => {
            res.json(blog)
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// delete
exports.remove = async (req, res) => {
    try {
        const {slug} = req.params
        await Blogs.findOneAndDelete({slug}).exec((err, blog) => {
            if(err) console.log(err);
            res.json({
                message: "ลบบทความเรียบร้อย"
            })
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

// update
exports.update = async (req, res) => {
    try {
        const {slug} = req.params;
        const {image, title, content, author} = req.body

        // check image
        if (!image) {
            return res.status(400).json({msg: "กรุณาอัพโหลดรูปภาพประกอบ"})
        }

        // update
        await Blogs.findOneAndUpdate({slug}, {image, title, content, author, slug}, {new: true}).exec((err, blog) => {
            if(err) console.log(err)
            res.json(blog);
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}
