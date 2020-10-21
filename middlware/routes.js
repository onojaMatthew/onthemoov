const error = require("../config/error");
const authRoutes = require("../routes/auth");
const adminRoutes = require("../routes/admin");
const riderRoutes = require("../routes/rider");
const customerRoutes = require("../routes/customer");
const apiRoutes = require("../routes/apiDoc");
const orderRoutes = require("../routes/order");
const costRoutes = require("../routes/distance_calculator");
const chargeRoutes = require("../routes/riderCancelAmount");
const smsRoutes = require("../routes/sms");
const ratingRoutes = require("../routes/rating");
const helpRoutes = require("../routes/contactUs");
const claimRoutes = require("../routes/claim");
const vehicleRoutes = require("../routes/vehicle");
const earningRoutes = require("../routes/earnings");
const reportRoutes = require("../routes/report");
const termRoutes = require("../routes/terms$condition");
const policyRoutes = require("../routes/privacyPolicy");

module.exports = (app) => {
  app.use("/api/v1", authRoutes);
  app.use("/api/v1", adminRoutes);
  app.use("/api/v1", riderRoutes);
  app.use("/api/v1", customerRoutes);
  app.use("/api/v1", apiRoutes);
  app.use("/api/v1", orderRoutes);
  app.use("/api/v1", costRoutes);
  app.use("/api/v1", chargeRoutes);
  app.use("/api/v1", smsRoutes);
  app.use("/api/v1", ratingRoutes);
  app.use("/api/v1", helpRoutes);
  app.use('/api/v1', claimRoutes);
  app.use("/api/v1", vehicleRoutes);
  app.use("/api/v1", earningRoutes);
  app.use("/api/v1", reportRoutes);
  app.use("/api/v1", termRoutes);
  app.use("/api/v1", policyRoutes);
  app.use(error);
}