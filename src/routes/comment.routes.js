const express = require("express");
const commentController = require("../controllers/comment.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");

const router = express.Router();

router.post("/", validateUser, commentController.createComment);
router.get("/:blogID", validateUser, commentController.getAllComments);
router.get("/:id", commentController.getSingleComment);
router.put("/:id", validateUser, commentController.updateSingleComment);
router.delete("/:id", validateUser, commentController.deleteSingleComment);

module.exports = router;
