const { Contact } = require("../models/contactUs");
const mongoose = require("mongoose");
const { sendEmail } = require("../services/mailer")

const roles = [ "admin", "customer", "rider" ];

exports.create = (req, res) => {
  const { senderId, title, message, email, role } = req.body;

  if (!senderId) return res.status(400).json({ error: "Sender ID is required" });
  if (!title || !message || !email) return res.status(400).json({ error: "No empty field is allowed" });
  if (!role) return res.status(400).json({ error: "User role is required" });

  let newContact = new Contact({
    senderId,
    title,
    message,
    email,
    senderModel: role === "customer" ? "Customer" : role === "rider" ? "Rider" : null
  });

  newContact.save((err, doc) => {
    if (err || !doc) return res.status(400).json({ error: err.message });

    return res.json({ message: "Message sent", doc });
  });
}

exports.getContacts = (req, res) => {
  const { role } = req.params;
  if (!role) return res.status(400).json({ error: "Invalid parameter values: role" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "You do not have the right permision to access this resources" });

  Contact.find()
    .sort({ "createdAt": -1 })
    .populate("senderId", "firstName lastName email phone")
    .then(contacts => {
      if (!contacts) return res.status(404).json({ error: "No records found" });
      return res.json(contacts);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getContact = (req, res) => {
  const { role, helpId } = req.params;
  if (!role || !helpId) return res.status(400).json({ error: "Invalid parameter values" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "You do not have the right permision to access this resources" });

  Contact.findById({ _id: helpId })
    .populate("senderId", "firstName lastName email phone role")
    .then(contact => {
      if (!contact) return res.status(404).json({ error: "No records found" });
      contact.populate({ path: "senderId", senderModel: contact.senderModel });
      return res.json(contact);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.updateStatus = (req, res) => {
  const { role, helpId } = req.params;
  if (!role || !helpId) return res.status(400).json({ error: "Invalid parameter values" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "You do not have the right permision to access this resources" });

  Contact.findByIdAndUpdate({ _id: helpId })
    .then(contact => {
      if (!contact) return res.status(404).json({ error: "No records found" });
      contact.status = true;
      contact.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        return res.json({ message: "Request complete", doc });
      });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.viewStatus = (req, res) => {
  const { helpId } = req.params;
  
  Contact.findByIdAndUpdate({ _id: helpId })
    .then(contact => {
      if (!contact) return res.status(400).json({ error: "Contact message not found" });
      contact.isViewed = true;
      contact.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        return res.json({ result: "Notification viewed" });
      });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.reply = (req, res) => {
  const { helpId } = req.params;
  const { message, email, adminId } = req.body;

  if (!helpId) return res.status(400).json({ error: "Notification ID is required" });
  if (!message) return res.status(400).json({ error: "Reply message is required" });
  if (adminId !== req.user._id) return res.status(403).json({ error: "Invalid login" });

  Contact.findByIdAndUpdate({ _id: helpId })
    .then(contact => {
      if (!contact) return res.status(404).json({ error: "Notification not found" });
      contact.reply = req.body.message;
      contact.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        const data = {
          sender: "no-reply@moov.mail",
          subject: "Reply",
          receiver: req.body.email,
          message: req.body.message
        }
        sendEmail(data);
        return res.json({ message: "Notification replied" });
      });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getContactByRider = (req, res) => {
  const { riderId } = req.params;

  if (!riderId) return re.status(400).json({ error: "Rider ID is required" });
  if (!mongoose.Types.ObjectId.isValid(riderId)) return res.status(400).json({ error: "Invalid rider ID" });

  Contact.find({ senderId: riderId })
    .then(contacts => {
      if (!contacts) return res.status(400).json({ error: "No records found" });      
      return res.json(contacts);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteHelp = (req, res) => {
  const { role, helpId } = req.params;
  if (!role || !helpId) return res.status(400).json({ error: "Invalid parameter values" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "You do not have the right permision to access this resources" });
  
  Contact.findByIdAndDelete({ _id: helpId })
    .then(result => {
      if (!result) return res.status(404).json({ error: "Record not found" });
      return res.json({ message: "Record deleted", result });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}