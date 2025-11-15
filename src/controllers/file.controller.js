const { v2: cloudinary } = require("cloudinary");
const File = require("../models/file.model.js");
const path = require("path");

const fileUpload = async (req, res) => {
  //  console.log("Request Body:", req.body);
  // console.log("Uploaded File:", req.file);

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const filename = req.file.path;
    console.log("File Name", filename);

    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

    const data = await File.create({
        filename: cloudinaryResult.secure_url,  // Store the Cloudinary URL
      public_id: cloudinaryResult.public_id,  // Store the Cloudinary public_id
    });
    res.status(201).json({
      success: true,
      message: "File Uploaded successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const fileDelete = async (req, res) => {
  try {

    // Find the file by ID
    const file = await File.findById(req.params.id);
 
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    // Use the public_id from the database for deletion
    const imgId = file.public_id;  // Use public_id stored in the database

    // Delete from Cloudinary
    const cloudinaryResult = await cloudinary.uploader.destroy(imgId);
    // console.log("Cloudinary Delete Result:", cloudinaryResult);

    // Delete from your database
    await File.findByIdAndDelete(req.params.id);
       res.status(204).json({
      success: true,
      message: "File deleted successfully",
      data: cloudinaryResult, 
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const fileController = { fileUpload, fileDelete };
module.exports = fileController;
