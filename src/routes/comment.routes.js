const express = require("express");
const commentController = require("../controllers/comment.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");

const router = express.Router();

router.post("/comments", validateUser, commentController.createComment);
router.get("/comments", commentController.getAllComments);
router.get("/comments/:id", commentController.getSingleComment);
router.put("/comments/:id", validateUser, commentController.updateSingleComment);
router.delete("/comments/:id", validateUser, commentController.deleteSingleComment);

module.exports = router;
