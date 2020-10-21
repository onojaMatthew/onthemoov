const express = require("express");
const { 
  addVehicle, getVehicles, getVehicle, updateVehicle, deleteVehicle,
} = require("../controllers/vehicle");

const requireLogin = require("../config/auth");

const router = express.Router();

router.post("/vehicle/new", requireLogin, addVehicle);
router.get("/vehicle/all", getVehicles);
router.get("/vehicle/:vehicleId", getVehicle);
router.put("/vehicle/update/:vehicleId/:role", requireLogin, updateVehicle);
router.delete("/vehicle/delete/:vehicleId/:role", requireLogin, deleteVehicle);

module.exports = router;