const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String },
  time: { type: Date, required: true },
}, { timestamps: true, versionKey: false });

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
