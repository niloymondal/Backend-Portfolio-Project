const Experience = require("../models/experience.model.js");
const Education = require("../models/education.model.js");
const Advantage = require("../models/advantage.model.js");
const User = require("../models/user.model.js");

const dashboard = async (req, res) => {
  try {
    const email = req.headers.email;
    // console.log(email);
    const user = await User.aggregate([
      {
        $match: { email },
      },
    ]);
    const experienceResult = await Experience.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
        },
      },
    ]);
    const educationResult = await Education.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
        },
      },
    ]);
    const advantageResult = await Advantage.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
        },
      },
    ]);
     const serviceResult = await Service.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
        },
      },
    ]);
     const testimonialResult = await Testimonial.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
        },
        
      },
    ]);
     const portfolioResult = await Portfolio.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
        },
        
      },
    ]);
    // console.log("experimentResult", experienceResult[0].total[0].count);
    
  res.status(200).json({
    success: true,
    data: { 
      user, 
      experience: { 
        count: experienceResult?.[0]?.total?.[0]?.count || 0,
      },
      education: { 
        count: educationResult?.[0]?.total?.[0]?.count || 0,
      },
      advantage: { 
        count: advantageResult?.[0]?.total?.[0]?.count || 0, 
      }, 
      service: { 
        count: serviceResult?.[0]?.total?.[0]?.count || 0, 
      }, 
      tesimonial: { 
        count: testimonialResult?.[0]?.total?.[0]?.count || 0, 
      }, 
      portfolio: { 
        count: portfolioResult?.[0]?.total?.[0]?.count || 0, 
      }, 
    },
  });
  } catch (error) {
     console.error(error);
  res.status(500).json({ success: false, message: "Server error" });
  }
};

const dashboardController = { dashboard };
module.exports = dashboardController;
