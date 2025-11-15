const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  institute: { type: String, required: true },
  description: { type: String },
  time: { type: Date, required: true },
}, { timestamps: true, versionKey: false });

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
