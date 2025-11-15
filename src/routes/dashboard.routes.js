const express = require("express");
const dashboardController = require("../controllers/dashboard.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");

const router = express.Router();


router.get("/dashboard", validateUser, dashboardController.dashboard);

module.exports = router;