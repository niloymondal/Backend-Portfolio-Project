const Experience = require("../models/experience.model.js");

const createExperience = async (req, res) => {
  try {
    const { title, company, description, time } = req.body;
    const experience = await Experience.create({ title, company, description, time });
    res.status(201).json({ success: true, message: "Experience created successfully", data: experience });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getAllExperience = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json({ success: true, message: "Experience fetched successfully", data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getSingleExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    res.status(200).json({ success: true, message: "Experience fetched successfully", data: experience });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const updateSingleExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExperience = await Experience.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Experience updated successfully", data: updatedExperience });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const deleteSingleExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Experience deleted successfully", data: experience });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

module.exports = { createExperience, getAllExperience, getSingleExperience, updateSingleExperience, deleteSingleExperience };
