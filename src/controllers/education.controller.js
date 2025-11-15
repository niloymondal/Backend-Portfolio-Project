const Education = require("../models/education.model.js");

const createEducation = async (req, res) => {
  try {
    const { title, institute, description, time } = req.body;
    const education = await Education.create({ title, institute, description, time });
    res.status(201).json({ success: true, message: "Education created successfully", data: education });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getAllEducation = async (req, res) => {
  try {
    const educationList = await Education.find();
    res.status(200).json({ success: true, message: "Education fetched successfully", data: educationList });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getSingleEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.findById(id);
    res.status(200).json({ success: true, message: "Education fetched successfully", data: education });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const updateSingleEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEducation = await Education.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Education updated successfully", data: updatedEducation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const deleteSingleEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await Education.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Education deleted successfully", data: education });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

module.exports = { createEducation, getAllEducation, getSingleEducation, updateSingleEducation, deleteSingleEducation };
