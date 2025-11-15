const express = require("express");
const blogController = require("../controllers/blog.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");

const router = express.Router();

router.post("/", validateUser, blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getSingleBlog);
router.put("/:id", validateUser, blogController.updateSingleBlog);
router.delete("/:id", validateUser, blogController.deleteSingleBlog);

module.exports = router;