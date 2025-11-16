const Comment = require("../models/comment.model.js");

const createComment = async (req, res) => {
  try {
    const { blogID, name, email, comment } = req.body;
    console.log(req.body)
    const newComment = await Comment.create({ blogID, name, email, comment});
    res.status(201).json({ success: true, message: "Comment created successfully", data: newComment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getAllComments = async (req, res) => {
  try {
    const { blogID } = req.params;
    const comments = await Comment.find({blogID});
    res.status(200).json({ success: true, message: "Comments fetched successfully", data: comments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const getSingleComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    // console.log(req.params)
    // console.log(comment)
    res.status(200).json({ success: true, message: "Comment fetched successfully", comment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const updateSingleComment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Comment updated successfully", data: updatedComment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

const deleteSingleComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Comment deleted successfully", data: comment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong!" });
  }
};

module.exports = { createComment, getAllComments, getSingleComment, updateSingleComment, deleteSingleComment };
