const express = require("express");
const { create, getAllBlogs, singleBlog, remove, update } = require("../controllers/blogController");
const router = express.Router();
const {requireLogin} = require("../controllers/authController");

// การเรียกใช้งาน
router.post('/create', requireLogin, create);
router.get('/blogs', getAllBlogs);
router.get('/blog/:slug', singleBlog);
router.delete('/blog/:slug', requireLogin, remove);
router.put('/blog/:slug', requireLogin, update);

module.exports = router;