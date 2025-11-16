const express = require("express");
const educationController = require("../controllers/education.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");

const router = express.Router();

router.post("/", validateUser, educationController.createEducation);
router.get("/", educationController.getAllEducation);
router.get("/:id", educationController.getSingleEducation);
router.put("/:id", validateUser, educationController.updateSingleEducation);
router.delete("/:id", validateUser, educationController.deleteSingleEducation);

module.exports = router;
