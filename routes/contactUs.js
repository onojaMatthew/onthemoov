const  express = require("express");
const { 
  create, 
  getContacts, 
  getContact, 
  deleteHelp, 
  updateStatus, 
  // getContactByRider,
  reply,
  viewStatus
} = require("../controllers/contactUs");

const requireLogin = require("../config/auth");

const router = express.Router();

router.post("/contact/new", requireLogin, create);
router.put("/contact/view_status/:helpId", viewStatus);
router.put("/contact/reply/:helpId", requireLogin, reply);
// router.get("/contact/rider/:riderId", getContactByRider);
router.get("/contact/:role", requireLogin, getContacts);
router.get("/contact/:role/:helpId", getContact);
router.put("/contact/status/:role/:helpId", updateStatus);
router.delete("/contact/:role/:helpId", requireLogin, deleteHelp);

module.exports = router;