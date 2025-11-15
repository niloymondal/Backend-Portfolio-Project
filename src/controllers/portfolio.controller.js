const Portfolio = require("../models/portfolio.model.js");

const createPortfolio = async (req, res) => {
  try {
    const { title, link, category } = JSON.parse(req.body.data);
    const img = req.file.path;
    const portfolio = await Portfolio.create({ title, img, link, category });
    res.status(201).json({ success: true, message: "Portfolio created successfully", data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json({ success: true, message: "Portfolios fetched successfully", data: portfolios });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getSinglePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findById(id);
    res.status(200).json({ success: true, message: "Portfolio fetched successfully", data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const updateSinglePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Portfolio updated successfully", data: updatedPortfolio });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const deleteSinglePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Portfolio deleted successfully", data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

module.exports = { createPortfolio, getAllPortfolios, getSinglePortfolio, updateSinglePortfolio, deleteSinglePortfolio };
