const { Order } = require("../models/order");
const { Rider } = require("../models/rider");
const { Customer } = require("../models/customer");
const moment = require("moment");
const fs = require("fs");
const mongoose = require("mongoose");
const { newEarning } = require("./earnings");

const roles = [ "admin", "customer", "rider" ];
const { notification } = require("../services/riderNotification");
const { customerNotification } = require("../services/customerNot");

// The customer must first upload the order image before updating the rest of the order details

exports.createNewOrder = async (req, res) => {
  // if (!req.file) return res.status(400).json({ error: "Please upload the image of the goods" });
 
  let newOrder = new Order();
  newOrder.packageImage.data = req.file ? fs.readFileSync(req.file.path) : null;
  newOrder.packageImage.contentType = "image/jpg";
  newOrder.save((err, doc) => {
    if (err || !doc) return res.status(400).json({ error: err.message });
    return res.json({ message: "New order created", orderId: doc._id });
  });
}

// After uploading the order image, this controller is executed to update the order details
exports.updateOrder = async (req, res) => {
  const { 
    packageDescription,
    vehicleType,
    cost,
    deliveryAddress,
    pickupLat,
    pickupLong,
    pickupLocation,
    orderId,
    senderId,
    payer
  } = req.body;

  let position = [];
  for (let i = 0; i < req.body.deliveryAddress.length; i++) {
    const eachAddress = deliveryAddress[i];
    position.push({
      address: eachAddress.address,
      receiver: eachAddress.receiver,
      receiverPhone: eachAddress.receiverPhone,
      packageId: eachAddress.packageId,
      packageDescription: eachAddress.packageDescription
    });
  }
  
  const trxnId = "MOOV" + Math.floor(10000000 + Math.random() * 90000000) + "k";

  Order.findByIdAndUpdate({ _id: orderId }, { 
    $set: { 
      deliveryLocation: position,
      senderId,
      pickupLong, 
      pickupLat,
      packageDescription,
      vehicleType,
      pickupLocation,
      cost,
      payer,
      trxnId
    }}, { new: true })
    .then(order => {
      if (!order) return res.status(404).json({ error: "Order not found" });
      exports.findRider(req,res, order);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.customerOrder = async (req, res) => {
  const { 
    packageDescription,
    vehicleType,
    cost,
    deliveryAddress,
    pickupLat,
    pickupLong,
    pickupLocation,
    senderId,
    payer,
    senderName,
    senderPhone
  } = req.body;

  let position = [];
  for (let i = 0; i < req.body.deliveryAddress.length; i++) {
    const eachAddress = deliveryAddress[i];
    position.push({
      address: eachAddress.address,
      receiver: eachAddress.receiver,
      receiverPhone: eachAddress.receiverPhone,
      packageId: eachAddress.packageId,
      packageDescription: eachAddress.packageDescription
    });
  }
  
  const trxnId = "MOOV" + Math.floor(10000000 + Math.random() * 90000000) + "k";

  let newOrder = new Order({
    deliveryLocation: position,
    senderId,
    pickupLong, 
    pickupLat,
    packageDescription,
    vehicleType,
    pickupLocation,
    cost,
    payer,
    trxnId,
    orderBy: "customer",
    senderPhone,
    senderName
  });

  newOrder.save((err, doc) => {
    if (err || !doc) return res.status(400).json({ error: err.message });
    return res.json({ message: "Your request was successfull" });
  });
}

exports.findRider = async (req, res, order) => {
  if (!order) return res.status(400).json({ error: "Order is required to complete the search" });
  Rider.findOne({
    position: {
      $near: {
        $geometry: {
          type: `Point`,
          coordinates: [ order.pickupLat, order.pickupLong ]
        },
        $maxDistance: 20000,
        $minDistance: 0
      }
    },
    vehicleType: order.vehicleType,
    available: true,
    online: true,
    activated: true,
  })
    .then(rider => {
      if (!rider) return res.status(404).json({ error: "No rider found" });

      const riderData = {
        deviceToken: rider.deviceToken,
        orderId: order._id,
      }

      notification(riderData);
      return res.json({ message: "Request sent to a rider" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.requestRejected = (req, res) => {
  const { riderId, orderId } = req.params;
  if (!riderId || !orderId) return res.status(400).json({ error: "Invalid parameter values" });
  if (!mongoose.Types.ObjectId.isValid(orderId)) return res.status(400).json({ error: "Invalid order ID" });
  if (!mongoose.Types.ObjectId.isValid(riderId)) return res.status(400).json({ error: "Invalid rider ID" });

  //find the order with the ID and add the rider's ID to it as rejected rider
  Order.findByIdAndUpdate({ _id: orderId })
    .then(result => {
      if (!result) return res.status(404).json({ error: "Order not found" });
      result.rejectedRiders.push(riderId);
      result.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        
        // find the order with given ID search for a rider for it
        Order.findById({ _id: orderId })
          .then(order => {
            if (!order) return res.status(404).json({ error: "Order not found" });
            
            Rider.findOne({
              position: {
                $near: {
                  $geometry: {
                    type: `Point`,
                    coordinates: [ order.pickupLong, order.pickupLat ]
                  },
                  $maxDistance: 45000,
                  $minDistance: 0
                }
              },
              vehicleType: order.vehicleType,
              available: true,
              online: true,
              activated: true,
              _id: { $nin: order.rejectedRiders }
            })
              .then(async rider => {
                if (!rider) return res.status(404).json({ error: "No riders found" });
                // console.log(rider, " the found rider");
                const riderData = {
                  deviceToken: rider.deviceToken,
                  orderId: order._id,
                }
                notification(riderData);

                return res.json({ message: "Request sent to a rider" });
              })
              .catch(err => {
                res.status(400).json({ error: err.message });
              });
          })
          .catch(err => {
            return res.status(400).json({ error: err.message });
          });
      });
    })
    .catch(err => {
      return res.status(400).json({ error: err.mesage });
    });
}


exports.acceptRequest = async (req, res) => {
  const { orderId, riderId } = req.params;
  if (!orderId || !riderId) return res.status(400).json({ error: "Invalid parameter values" });
  Rider.findByIdAndUpdate({ _id: riderId })
    .then(rider => {
      if (!rider) return res.status(400).json({ error: "Rider not found" });
      rider.acceptedRequests.push(orderId);
      rider.available = false;

      rider.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        Order.findById({ _id: orderId }, { packageImage: 0, preDeliveryImage: 0, postDeliveryImage: 0 })
          .then(async order => {
            if (!order) return res.status(400).json({ error: "Order not found" });
            const customer = await Customer.findById({ _id: order.senderId });
            if (!customer) return res.status(404).json({ error: "Customer not found" });

            const riderInfo = {
              firstName: doc.firstName,
              lastName: doc.lastName,
              phone: doc.phone,
              email: doc.email,
              _id: doc._id
            }
            
            const title = "Request notification";
            const message = "Your delivery request was accepted";
            const customerData = { deviceToken: customer.deviceToken, title, message, rider: riderInfo }
            customerNotification(customerData);
            return res.status(200).json(customerData);
          })
          .catch(err => {
            return res.status(400).json({ error: err.message });
          });
      });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getOrders = (req, res) => {
  const { role } = req.params;
  if (!role) return res.status(400).json({ error: "Invalid parameter value" });
  if (!role.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  
  
  Order.find({}, { packageImage: 0, preDeliveryImage: 0, postDeliveryImage: 0 })
    .populate("riderId", "firstName lastName email phone role")
    .populate("senderId", "firstName lastName email phone role")
    .then(orders => {
      if (!orders) return res.status(400).json({ error: "No order found" });
      return res.json(orders);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.postDeliveryImageUpload = (req, res) => {
  const { orderId } = req.params;
  if (!orderId) return res.status(400).json({ error: "The order ID is required" });

  Order.findByIdAndUpdate({ _id: orderId })
    .then(order => {
      if (!order) return res.status(404).json({ error: "Order not found" });
      order.postDeliveryImage.data = fs.readFileSync(req.file.path);
      order.postDeliveryImage.contentType = "image/jpg";
      order.postDeliveryMessage = req.body.comment;

      order.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        return res.json({ message: "Image uploaded" });
      });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.preDeliveryImageUpload = (req, res) => {
  const { orderId } = req.params;
  if (!orderId) return res.status(400).json({ error: "Order ID is required" });

  Order.findByIdAndUpdate({ _id: orderId })
    .then(order => {
      if (!order) return res.status(404).json({ error: "Order not found" });
      order.preDeliveryImage.data = fs.readFileSync(req.file.path);
      order.preDeliveryImage.contentType = "image/jpg";
      order.preDeliveryMessage = req.body.comment;

      order.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        return res.json({ message: "Image uploaded" });
      });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getPredeliveryImage = (req,res) => {
  const { orderId } = req.params;

  if (!orderId) return res.status(400).json({ error: "Order ID is required" });

  Order.findById({ _id: orderId })
    .then(order => {
      if (!order) return res.status(404).json({ error: "Order not found" });
      res.set("Content-Type", order.preDeliveryImage.contentType);
      res.send(order.preDeliveryImage.data);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getPostdeliveryImage = (req,res) => {
  const { orderId } = req.params;

  if (!orderId) return res.status(400).json({ error: "Order ID is required" });

  Order.findById({ _id: orderId })
    .then(order => {
      if (!order) return res.status(404).json({ error: "Order not found" });
      res.set("Content-Type", order.preDeliveryImage.contentType);
      res.send(order.postDeliveryImage.data);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getOrder = (req, res) => {
  const { role, orderId } = req.params;
  if (!role || !orderId) return res.status(400).json({ error: "Invalid parameter values" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  
  Order.findById({ _id: orderId }, { packageImage: 0, preDeliveryImage: 0, postDeliveryImage: 0})
    .populate("riderId", "firstName lastName email phone role, vehicleModel vehicleNumber")
    .populate("senderId", "firstName lastName email phone role")
    .then(order => {
      if (!order) return res.status(400).json({ error: "Order not found" });
      res.json(order);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getOrderImage = (req, res) => {
  const { orderId } = req.params;
  if (!orderId) return res.status(400).json({ error: "Order ID is required" });

  Order.findById({ _id: orderId })
    .then(order => {
      if (!order) return res.status(404).json({ error: "Order not found" });
      res.set("Content-Type", order.packageImage.contentType);
      res.send(order.packageImage.data);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.addRider = (req, res) => {
  const { riderId, orderId, role } = req.params;
  if (!role || !orderId || !riderId) return res.status(400).json({ error: "Invalid parameter values" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });

  Order.findByIdAndUpdate({ _id: orderId }, { $set: { riderId }}, { new: true })
    .then(order => {
      if (!order) return res.status(400).json({ error: "Order not found" });
      return res.json({ message: "You have found a rider" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.orderByRider = (req, res) => {
  const { riderId, role } = req.params;
  if (!role) return res.status(400).json({ error: "Invalid parameter values" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (!riderId) return res.status(400).json({ error: "Rider ID is required" });
  if (role !== "rider" && role !== "admin") return res.status(400).json({ error: "Unauthorized access" });

  Order.find({}, { packageImage: -1, preDeliveryImage: -1, postDeliveryImage: -1 })
    .populate("riderId", "firstName lastName email phone")
    .populate("senderId", "firstName lastName email phone")
    .then(orders => {
      if (!orders) return res.status(400).json({ error: "This rider has not delivered any orders yet" });
      return res.json(orders);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.orderByCustomer = (req, res) => {
  const { customerId } = req.params;

  if (!customerId) return res.status(400).json({ error: "Invalid parameter value" });

  Order.find({ customerId }, { packageImage: -1, preDeliveryImage: -1, postDeliveryImage: -1 })
    .populate("riderId", "firstName lastName email phone")
    .populate("senderId", "firstName lastName email phone")
    .then(orders => {
      if (!orders) return res.status(400).json({ error: "No orders found for this customer" });
      return res.json(orders);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteOrder = (req, res) => {
  const { orderId, role } = req.params;
  if (!role || !orderId) return res.status(400).json({ error: "Invalid parameter values" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "Only admin is authorized to delete an order" });

  Order.findByIdAndDelete({ _id: orderId })
    .then(order => {
      if (!order) return res.status(400).json({ error: "Failed to delete. Order not found" });
      return res.json({ orderId: order._id });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.startRide = (req, res) => {
  const { customerId, orderId } = req.params.customerId;

  Order.findByIdAndUpdate({ _id: orderId }, { $set: { on_going: true, timeStarted: new Date().getTime() }}, { new: true })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Failed to start the ride. Try again" });
      Customer.findById({ _id: customerId }, { imageUrl: 0 })
        .then(customer => {
          if (!customer) return res.status(404).json({ error: "Customer not found" });
          const deviceToken = customer.deviceToken;
          const title = "Ride notification"
          const notificationMsg = "The rider has picked your goods for delivery";
          const data = { deviceToken, title, message: notificationMsg }
          customerNotification(data);
          return res.json({ message: "Rider has started the trip" });
        })
        .catch(err => {
          res.status(400).json({ error: err.message });
        });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.completeTrip = (req, res) => {
  const { riderId, orderId } = req.params;
  if (!riderId || !orderId) return { error: "Invalid parameter values" };
  if (!mongoose.Types.ObjectId.isValid(riderId)) return { error: "Invalid rider ID" };
  if (!mongoose.Types.ObjectId.isValid(orderId)) return { error: "Invalid order ID" };
  Order.findByIdAndUpdate({ _id: orderId })
    .then(order => {
      if (!order) return { error: "Could not complete trip. Please try again." };
      if (order.cancelled === true) return { error: "This order was cancelled" };
      order.tripCompleted = true;
      order.on_going = false;
      order.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        const earning = order.cost * 0.2;
        Rider.findByIdAndUpdate({ _id: riderId }, { $set: { available: true, timeCompleted: new Date().getTime() }}, { new: true })
          .then(rider => {
            if (!rider) return { error: "Could not find rider" };
            const data = { amount: earning, riderId, orderId }
            return newEarning(req, res,data);
          })
          .catch(err => {
            return { error: err.message };
          });
        })
    })
    .catch(err => {
      return { error: err.message };
    });
}

exports.completeTripByAdmin = (req, res) => {
  const { adminId, orderId } = req.params;
  if (!adminId || !orderId) return { error: "Invalid parameter values" };
  if (!mongoose.Types.ObjectId.isValid(adminId)) return { error: "Invalid rider ID" };
  if (!mongoose.Types.ObjectId.isValid(orderId)) return { error: "Invalid order ID" };
  Order.findByIdAndUpdate({ _id: orderId })
    .then(order => {
      if (!order) return { error: "Could not complete trip. Please try again." };
      if (order.cancelled === true) return { error: "This order was cancelled" };
      order.tripCompleted = true;
      order.on_going = false;
      order.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        return res.json({ message: "Trip completed successfully" });
      })
    })
    .catch(err => {
      return { error: err.message };
    });
}

exports.cancelTrip = async (req, res) => {
  const { customerId, orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(customerId)) return { error: "Invalid customer ID" };
  if (!mongoose.Types.ObjectId.isValid(orderId)) return { error: "Invalid order ID" };
  
  Order.findByIdAndUpdate({ _id: orderId })
    .then(order => {
      if (!order) return res.status(404).json({ error: "Order not found" });
      if (order.on_going) return res.status(400).json({ message: "The rider is already on the way" });
      if (order.cancelled) return res.status(400).json({ message: "This ride is not active" });
      order.cancelled = true;
      order.save( async(err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        
        return res.json({ message: "You have cancelled this ride" });
      });
    })
    .catch(err => {
      return { error: err.message };
    });
}

exports.addTollCharge = (req, res) => {
  const { orderId, code, charge } = req.body;
  if (!orderId) return res.status(400).json({ error: "Order ID is required" });
  if (!code || !charge) return res.status(400).json({ error: "Verification code and toll charge are required" });
  
  Order.findByIdAndUpdate({ _id: orderId })
    .then(order => {
      if (!order) return res.status(404).json({ error: "Order not found" });
      order.toll.code = req.body.code;
      order.toll.charge = req.body.charge;
      if (!req.file) return res.status(400).json({ error: "Please attach the payment slip" });
      order.toll.paymentSlip.data = fs.readFileSync(req.file.path);
      order.toll.paymentSlip.contentType = "image/jpg";
      order.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        return res.json({ message: "Toll charges uploaded successfully", doc });
      });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}
