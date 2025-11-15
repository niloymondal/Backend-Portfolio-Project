const express = require("express");
const experienceController = require("../controllers/experience.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");

const router = express.Router();

router.post("/experience", validateUser, experienceController.createExperience);
router.get("/experience", experienceController.getAllExperience);
router.get("/experience/:id", experienceController.getSingleExperience);
router.put("/experience/:id", validateUser, experienceController.updateSingleExperience);
router.delete("/experience/:id", validateUser, experienceController.deleteSingleExperience);

module.exports = router;
