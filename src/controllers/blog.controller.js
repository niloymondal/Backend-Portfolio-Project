const Blog = require("../models/blog.model.js");

const createBlog = async (req, res) => {
  try {
    //const blog = new Blog(req.body); // Create a new blog instance
    //const res = await blog.save();
    const { title, img, category, description, short_description } = req.body;
    const data = await Blog.create({
      title,
      img,
      category,
      description,
      short_description,
    });
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong!",
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        blog: [
          { $sort: { createdAt: -1 } },
          {
            $project: {
              title: 1,
              img: 1,
              category: 1,
              description: 1,
              short_description: 1,
            },
          },
        ],
      },
    };
    const blog = await Blog.aggregate([facetStage]);
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      totalBlogs: blog[0].totalCount[0].count,
      data: blog[0].blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong!",
    });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Blog.findById(id);
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong!",
    });
  }
};

const updateSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Blogs updated successfully",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong!",
    });
  }
};

const deleteSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Blog.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Blogs deleted successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Something went wrong!",
    });
  }
};

const blogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateSingleBlog,
  deleteSingleBlog,
};

module.exports = blogController;
