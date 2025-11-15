const express = require("express");
const educationController = require("../controllers/education.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");

const router = express.Router();

router.post("/education", validateUser, educationController.createEducation);
router.get("/education", educationController.getAllEducation);
router.get("/education/:id", educationController.getSingleEducation);
router.put("/education/:id", validateUser, educationController.updateSingleEducation);
router.delete("/education/:id", validateUser, educationController.deleteSingleEducation);

module.exports = router;
