const express = require("express");
const experienceController = require("../controllers/experience.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");

const router = express.Router();

router.post("/", validateUser, experienceController.createExperience);
router.get("/", experienceController.getAllExperience);
router.get("/:id", experienceController.getSingleExperience);
router.put("/:id", validateUser, experienceController.updateSingleExperience);
router.delete("/:id", validateUser, experienceController.deleteSingleExperience);

module.exports = router;
