const mongoose = require("mongoose");

const advantageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  percent: { type: Number, required: true },
  time: { type: Date, required: true },
}, { timestamps: true, versionKey: false });

const Advantage = mongoose.model("Advantage", advantageSchema);

module.exports = Advantage;
