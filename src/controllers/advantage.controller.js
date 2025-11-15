const Advantage = require("../models/advantage.model.js");

const createAdvantage = async (req, res) => {
  try {
    const { title, category, percent, time } = req.body;
    const advantage = await Advantage.create({ title, category, percent, time });
    res.status(201).json({ success: true, message: "Advantage created successfully", data: advantage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getAllAdvantages = async (req, res) => {
  try {
    const advantages = await Advantage.find();
    res.status(200).json({ success: true, message: "Advantages fetched successfully", data: advantages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getSingleAdvantage = async (req, res) => {
  try {
    const { id } = req.params;
    const advantage = await Advantage.findById(id);
    res.status(200).json({ success: true, message: "Advantage fetched successfully", data: advantage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const updateSingleAdvantage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdvantage = await Advantage.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Advantage updated successfully", data: updatedAdvantage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const deleteSingleAdvantage = async (req, res) => {
  try {
    const { id } = req.params;
    const advantage = await Advantage.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Advantage deleted successfully", data: advantage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

module.exports = { createAdvantage, getAllAdvantages, getSingleAdvantage, updateSingleAdvantage, deleteSingleAdvantage };
