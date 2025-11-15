const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  img: { type: String },
}, { timestamps: true, versionKey: false });

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
