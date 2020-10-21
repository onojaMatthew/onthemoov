const express = require("express");
const {
  getOrder,
  getOrders,
  addRider,
  orderByRider,
  deleteOrder,
  orderByCustomer,
  addTollCharge,
  updateOrder,
  createNewOrder,
  preDeliveryImageUpload,
  postDeliveryImageUpload,
  getPredeliveryImage,
  getPostdeliveryImage,
  findRider,
  getOrderImage,
  requestRejected,
  cancelTrip,
  completeTrip,
  acceptRequest,
  startRide,
  customerOrder,
  completeTripByAdmin,
} = require("../controllers/order");
const { upload } = require("../middlware/fileupload");
const requireLogin = require('../config/auth');
// const { notification } = require("../services/riderNotification");

const router = express.Router();

router.get("/order/:orderId/pre_delivery_image", requireLogin, getPredeliveryImage);
router.get("/order/:orderId/post_delivery_image", requireLogin, getPostdeliveryImage);
router.post("/order/create", requireLogin, upload.single("image"), createNewOrder);
router.post("/order/create/new", requireLogin, customerOrder);
router.put("/order/update",requireLogin, updateOrder);
router.get("/order/all/:role", requireLogin, getOrders);
router.get("/order/:orderId/:role", requireLogin, getOrder);
router.get("/order/customer/:customerId", requireLogin, orderByCustomer);
router.put("/order/add_rider/:riderId/orderId/:role", requireLogin, addRider);
router.get("/order/rider_orders/:riderId/:role", requireLogin, orderByRider);
router.put("/order/toll", upload.single("image"), addTollCharge);
router.put("/start_trip/:customerId/:orderId", requireLogin, startRide);
router.put("/order/pre_delivery_image_upload/:orderId", requireLogin, upload.single("image"), preDeliveryImageUpload);
router.put("/order/post_delivery_image_upload/:orderId", requireLogin, upload.single("image"), postDeliveryImageUpload);
router.delete("/order/delete/:orderId/:role", requireLogin, deleteOrder);
router.get("/order/find_rider/:vehicleType/:orderId", findRider);
router.put("/order/reject_request/:riderId/:orderId", requestRejected);
router.put("/order/cancel_trip/:orderId/:customerId", requireLogin, cancelTrip);
router.put("/order/complete_trip/:orderId/:riderId", requireLogin, completeTrip);
router.put("/order/accepted_request/:riderId/:orderId", acceptRequest);
router.get("/order/photo/order_photo/:orderId", getOrderImage);
router.put("/order/admin/complete/:orderId/:adminId", requireLogin, completeTripByAdmin);
// router.get("/notification", notification);

module.exports = router;