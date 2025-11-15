const Service = require("../models/services.model.js");

const createService = async (req, res) => {
  try {
    const { title, description, img } = req.body;
    const service = await Service.create({ title, description, img });
    res.status(201).json({ success: true, message: "Service created successfully", data: service });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ success: true, message: "Services fetched successfully", data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getSingleService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    res.status(200).json({ success: true, message: "Service fetched successfully", data: service });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const updateSingleService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Service updated successfully", data: updatedService });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const deleteSingleService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Service deleted successfully", data: service });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

module.exports = { createService, getAllServices, getSingleService, updateSingleService, deleteSingleService };
