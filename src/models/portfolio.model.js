const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  link: { type: String },
  category: { type: String },
}, { timestamps: true, versionKey: false });

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
