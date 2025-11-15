const express = require("express");
const advantageController = require("../controllers/advantage.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");

const router = express.Router();

router.post("/", validateUser, advantageController.createAdvantage);
router.get("/", advantageController.getAllAdvantages);
router.get("/:id", advantageController.getSingleAdvantage);
router.put("/:id", validateUser, advantageController.updateSingleAdvantage);
router.delete("/:id", validateUser, advantageController.deleteSingleAdvantage);

module.exports = router;
