const express = require("express");
const testimonialController = require("../controllers/testimonial.controller.js");

const router = express.Router();

router.post("/testimonials", testimonialController.createTestimonial);
router.get("/testimonials", testimonialController.getAllTestimonials);
router.get("/testimonials/:id", testimonialController.getSingleTestimonial);
router.put("/testimonials/:id", testimonialController.updateSingleTestimonial);
router.delete("/testimonials/:id", testimonialController.deleteSingleTestimonial);

module.exports = router;
