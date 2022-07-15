const router = require("express").Router();
const { uploadFile, deleteImage} = require("../controllers/uploadCtrl");
const { requireLogin } = require("../controllers/authCtrl");

router.post("/upload", requireLogin, uploadFile);
router.post("/img/delete", requireLogin, deleteImage);

module.exports = router;