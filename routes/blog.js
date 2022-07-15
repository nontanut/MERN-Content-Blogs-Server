const router = require("express").Router();
const { create, getAllBlogs, singleBlog, remove, update } = require("../controllers/blogCtrl");
const {requireLogin} = require("../controllers/authCtrl");

// การเรียกใช้งาน
router.post('/create', requireLogin, create);
router.get('/blogs', getAllBlogs);
router.get('/blog/:slug', singleBlog);
router.delete('/blog/:slug', requireLogin, remove);
router.put('/blog/:slug', requireLogin, update);

module.exports = router;