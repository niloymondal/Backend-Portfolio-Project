const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  blogID: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
}, { timestamps: true, versionKey: false });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
