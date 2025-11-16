const express = require("express");
const serviceController = require("../controllers/services.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");

const router = express.Router();

router.post("/", validateUser, serviceController.createService);
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getSingleService);
router.put("/:id", validateUser, serviceController.updateSingleService);
router.delete("/:id", validateUser, serviceController.deleteSingleService);

module.exports = router;
