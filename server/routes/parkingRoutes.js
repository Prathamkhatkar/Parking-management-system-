const express = require("express");
const router = express.Router();
const {
  getParkingStatus,
  updateParkingSpot,
} = require("../controllers/parkingController");

// Endpoint to get parking status
router.get("/", getParkingStatus);

// Endpoint to update a parking spot
router.post("/reserve", updateParkingSpot);

module.exports = router;
