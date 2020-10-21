const express = require("express");
const {
  uploadDriverLicense,
  getRider,
  getRiders,
  activateRider,
  deleteRider,
  riderPhoto,
  vehiclePhoto,
  updateRiderData,
  onlineMode,
  offlineMode,
  deactivateRider,
  uploadVehicleData,
  insurancePhoto,
  updateRiderLocation,
  registration,
  emailSender,
  uploadRiderPhoto,
  getLicense,
} = require("../controllers/rider");
const requireLogin = require("../config/auth");
const { upload } = require("../middlware/fileupload");
const router = express.Router();

router.post("/rider/registration", registration);
router.put("/rider/upload/documents/:role/:riderId", upload.fields([
  { name: 'insurance', maxCount: 1 },
  { name: 'riderPhoto', maxCount: 1 },
  { name: "vehicleImage", maxCount: 1 },
  { name: "driving_license", maxCount: 1 }
]), uploadVehicleData);
router.put("/rider/uploadphoto/:riderId/:role", upload.single("image"), uploadRiderPhoto);
router.get("/rider/:riderId/:role", requireLogin, getRider);
router.get("/rider/:role", requireLogin, getRiders);
router.put("/rider/update", requireLogin, updateRiderData);
router.put("/rider/activate/:role/:riderId", requireLogin, activateRider);
router.put("/rider/deactivate/:role/:riderId", requireLogin, deactivateRider);
router.put("/rider/offline/:riderId", requireLogin, offlineMode);
router.put("/rider/update/location/:riderId", updateRiderLocation);
router.put("/rider/online/:riderId", requireLogin, onlineMode);
router.get("/rider/insurance/photo/:riderId", insurancePhoto);
router.get("/rider/rider/photo/:riderId", riderPhoto);
router.get("/rider/vehicle/photo/:riderId", vehiclePhoto);
router.get("/rider/license/photo/:riderId", getLicense);
router.delete("/rider/delete/:riderId/:role", requireLogin, deleteRider);
router.post("/rider/email", emailSender);

module.exports = router;
