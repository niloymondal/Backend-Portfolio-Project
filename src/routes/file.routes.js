const express = require("express"); 
const fileController = require("../controllers/file.controller.js");
const upload = require("../config/multer.config.js");




const router = express.Router();

router.post("/uploads", upload.single("filename"), fileController.fileUpload);
router.delete("/delete/:id", fileController.fileDelete);


module.exports = router;