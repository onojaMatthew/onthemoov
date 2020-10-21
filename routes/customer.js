const express = require("express");
const {
  createCustomer,
  getCustomer,
  getCustomers,
  deleteCustomer,
  userPhoto,
  updateCustomer,
} = require("../controllers/customer");
const requireLogin = require("../config/auth");
const { updateDeviceToken } = require("../controllers/auth");
const router = express.Router();

router.post("/customer/new/:userType", createCustomer);
// router.put("/customer/update/:userType", updateCustomer);
router.get("/customer/:role/:customerId", getCustomer);
router.get("/customer/:role", getCustomers);
router.get("/photo/:userType/:userId", userPhoto);
router.delete("/customer/delete/:customerId/:role", deleteCustomer);
router.put("/device_token", updateDeviceToken);

module.exports = router;