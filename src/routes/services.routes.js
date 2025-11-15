const express = require("express");
const serviceController = require("../controllers/services.controller.js");
const validateUser = require("../middlewares/validation.middleware.js");

const router = express.Router();

router.post("/services", validateUser, serviceController.createService);
router.get("/services", serviceController.getAllServices);
router.get("/services/:id", serviceController.getSingleService);
router.put("/services/:id", validateUser, serviceController.updateSingleService);
router.delete("/services/:id", validateUser, serviceController.deleteSingleService);

module.exports = router;
