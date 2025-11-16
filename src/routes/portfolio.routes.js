const express = require("express");
const portfolioController = require("../controllers/portfolio.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");
const upload = require("../config/multer.config.js");

const router = express.Router();

router.post("/", validateUser, upload.single("img"), portfolioController.createPortfolio);
router.get("/", portfolioController.getAllPortfolios);
router.get("/:id", portfolioController.getSinglePortfolio);
router.put("/:id", validateUser, portfolioController.updateSinglePortfolio);
router.delete("/:id", validateUser, portfolioController.deleteSinglePortfolio);

module.exports = router;
