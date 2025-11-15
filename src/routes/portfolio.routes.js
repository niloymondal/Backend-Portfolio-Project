const express = require("express");
const portfolioController = require("../controllers/portfolio.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");
const upload = require("../config/multer.config.js");

const router = express.Router();

router.post("/portfolio", validateUser, upload.single("img"), portfolioController.createPortfolio);
router.get("/portfolio", portfolioController.getAllPortfolios);
router.get("/portfolio/:id", portfolioController.getSinglePortfolio);
router.put("/portfolio/:id", validateUser, portfolioController.updateSinglePortfolio);
router.delete("/portfolio/:id", validateUser, portfolioController.deleteSinglePortfolio);

module.exports = router;
