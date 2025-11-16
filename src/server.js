const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database.config.js");
const cookieParser = require("cookie-parser");

// Importing section-specific routers
const blogRoutes = require("./routes/blog.routes.js");
const advantageRoutes = require("./routes/advantage.routes.js")
const commentRoutes = require("./routes/comment.routes.js");
const educationRoutes = require("./routes/education.routes.js");
const experienceRoutes = require("./routes/experience.routes.js");
const portfolioRoutes = require("./routes/portfolio.routes.js");
const serviceRoutes = require("./routes/services.routes.js");
const testimonialRoutes = require("./routes/testimonial.routes.js");
const userRoutes = require("./routes/user.routes.js");
const fileRoutes = require("./routes/file.routes.js");
const dashboardRoutes = require("./routes/dashboard.routes.js");



const PORT = process.env.PORT || 5000;
const app = express();

// Load environment variables
dotenv.config();

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

// Database connection
connectDB();

app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/advantage", advantageRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/education", educationRoutes);
app.use("/api/v1/experience", experienceRoutes);
app.use("/api/v1/portfolio", portfolioRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/testimonials", testimonialRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", fileRoutes);
app.use("/api/v1", dashboardRoutes);

// Test route
app.get("/", (req, res)=>{
    res.json({
        message: "API is running...",
    });
});

// Start server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});