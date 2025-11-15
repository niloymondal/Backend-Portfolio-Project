const express = require("express");
const userController = require("../controllers/user.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");

const router = express.Router();

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
router.get("/profiles", validateUser, userController.getAllProfile);
router.get("/profile", validateUser, userController.getSingleProfile);
router.post("/forget-password", userController.forgetPassword);
router.put("/reset-password/:resetToken", userController.resetPassword);

module.exports = router;