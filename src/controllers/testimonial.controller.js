const Testimonial = require("../models/testimonial.model.js");

const createTestimonial = async (req, res) => {
  try {
    const { clientName, address, img, feedback } = req.body;
    const testimonial = await Testimonial.create({ clientName, address, img, feedback });
    res.status(201).json({ success: true, message: "Testimonial created successfully", data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json({ success: true, message: "Testimonials fetched successfully", data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getSingleTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    res.status(200).json({ success: true, message: "Testimonial fetched successfully", data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const updateSingleTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Testimonial updated successfully", data: updatedTestimonial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const deleteSingleTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Testimonial deleted successfully", data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

module.exports = { createTestimonial, getAllTestimonials, getSingleTestimonial, updateSingleTestimonial, deleteSingleTestimonial };
