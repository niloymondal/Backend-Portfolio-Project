const express = require("express");
const testimonialController = require("../controllers/testimonial.controller.js");

const router = express.Router();

router.post("/", testimonialController.createTestimonial);
router.get("/", testimonialController.getAllTestimonials);
router.get("/:id", testimonialController.getSingleTestimonial);
router.put("/:id", testimonialController.updateSingleTestimonial);
router.delete("/:id", testimonialController.deleteSingleTestimonial);

module.exports = router;
