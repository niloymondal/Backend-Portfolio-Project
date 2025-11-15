const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  address: { type: String },
  img: { type: String },
  feedback: { type: String },
}, { timestamps: true, versionKey: false });

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
