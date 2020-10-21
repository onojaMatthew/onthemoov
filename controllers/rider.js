const fs = require("fs");
const bcrypt = require("bcrypt");
const { Rider } = require("../models/rider");
const { sendEmail } = require("../services/mailer");
const mongoose = require("mongoose");

const roles = [ "admin", "rider", "customer" ];

exports.registration = (req, res) => {
  const { role, firstName, lastName, email, phone, password } = req.body;
  if (!role) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "rider" && role !== "admin" && role !== "user") return res.status(400).json({ error: "You are not authorized for this operation" });
  if (!firstName || !lastName || !email || !password || !phone) return res.status(400).json({ error: "All fields are required" });

  Rider.findOne({ email: email })
    .then(rider => {
      if (rider) return res.status(400).json({ error: "User already exists" });
      return bcrypt.hash(req.body.password, 12)
        .then(hashedPassword => {
          if (!hashedPassword) return res.status(400).json({ error: "Failed to hash password" });
          
          let newRider = new Rider({
            email,
            firstName,
            lastName,
            phone,
            password: hashedPassword,
            role
          });
        
          newRider.save((err, doc) => {
            if (err || !doc) return res.status(400).json({ error: err.message });
            return res.json({ message: "Account created", doc });
          });
        })
        .catch(err => {
          res.status(400).json({ error: err.message });
        })
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
  
}

exports.uploadVehicleImage = (req, res) => {
  const { role, riderId } = req.params;
  if (!role || !riderId) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "rider") return res.status(400).json({ error: "You are not authorized for this operation" });

  const mimetype = req.file.mimetype.toLowerCase();
  if (mimetype !== "application/pdf" && mimetype !== "image/jpg" && mimetype !== "image/png" && mimetype !== "image/jpeg") return res.status(400).json({ error: "File type not accepted" });

  Rider.findByIdAndUpdate({ _id: riderId })
    .then( rider => {
      if ( !rider ) return res.status( 400 ).json( { error: "Can not find rider" } );
      rider.vehicleImage.data = fs.readFileSync( req.file.path );
      rider.vehicleImage.contentType = "image/jpg";
      rider.save();
      return res.json({ message: "Vehicle image uploaded", rider });
    } )
    .catch( err => {
      res.status(400).json({ error: err.message });
    });
}

exports.uploadVehicleData = (req, res) => {
  const { riderId } = req.params;
  const { vehicleModel, vehicleNumber, vehicleType } = req.body;
  const license = req.files.driving_license[0];
  const vehicleInsurance = req.files.insurance[0];
  const riderPhoto = req.files.riderPhoto[0];
  const vehiclePhoto = req.files.vehicleImage[0];

  if (!vehicleType || !vehicleModel || !vehicleNumber) return res.status(400).json({ error: "All input fields are required" });
  if (!riderId) return res.status(400).json({ error: "Invalid parameter value" });
  if (!license) return res.status(400).json({ error: "Your driving license is required" });
  if (!vehicleInsurance) return res.status(400).json({ error: "Your vehicle insurance document is required" });
  if (!riderPhoto) return res.status(400).json({ error: "Your passport is required" });
  if (!vehiclePhoto) return res.status(400).json({ error: "Vehicle picture must be provided" });
  
  Rider.findByIdAndUpdate({ _id: riderId })
    .then(rider => {
      if (!rider) return res.status( 400 ).json( { error: "Can not find rider" } );
      rider.vehicleInsurance.data = fs.readFileSync( vehicleInsurance.path );
      rider.vehicleInsurance.contentType = "image/jpg";
      rider.imageUrl.data = fs.readFileSync(riderPhoto.path);
      rider.imageUrl.contentType = "image/jpg";
      rider.vehicleImage.data = fs.readFileSync(vehiclePhoto.path);
      rider.vehicleImage.contentType = "image/jpg";
      rider.driverLicense.data = fs.readFileSync(license.path);
      rider.driverLicense.contentType = "image/jpg";
      rider.vehicleType = req.body.vehicleType;
      rider.vehicleModel = req.body.vehicleModel;
      rider.vehicleNumber = req.body.vehicleNumber;
      rider.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        return res.json({ message: "Files uploaded", riderId: rider._id });
      });
    })
    .catch( err => {
      res.json({ error: err.message });
    });
}

exports.uploadRiderPhoto = (req, res) => {
  const { role, riderId } = req.params;
  if (!role || !riderId) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "rider") return res.status(400).json({ error: "You are not authorized for this operation" });

  Rider.findByIdAndUpdate({ _id: riderId })
    .then(rider => {
      if (!rider) return res.status(400).json({ error: "Rider not found" });
      rider.imageUrl.data = fs.readFileSync(req.file.path);
      rider.imageUrl.contentType = "image/jpg";
      rider.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        return res.json({ message: "Image uploaded", doc });
      })
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.updateRiderData = (req, res) => {
  const { riderId, role } = req.body;
  if (!role) return res.status(400).json({ error: "Unknown rider's role" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Invalid role" });
  if (!riderId) return res.status(400).json({ error: "This rider is unknown" });
  
  Rider.findByIdAndUpdate({ _id: riderId })
    .then(rider => {
      if (!rider) return res.status(400).json({ error: "Rider not found" });
      if (req.body.phone) rider.phone = req.body.phone;
      if (req.body.vehicleType) rider.vehicleType = req.body.vehicleType;
      if (req.body.role) rider.role = req.body.role;
      if (req.body.vehicleModel) rider.vehicleModel = req.body.vehicleModel;

      rider.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        return res.json(doc);
      });
    });
}

exports.getRiders = (req, res) => {
  const { role } = req.params;

  if (!role) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "You don't have the permission to fetch riders" });

  Rider.find({}, { imageUrl: 0, vehicleImage: 0, driverLicense: 0, insurance: 0 })
    .then(riders => {
      if (!riders) return res.status(400).json({ error: "No records found" });
      return res.json(riders);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getRider = (req, res) => {
  const { role, riderId } = req.params;
  if (!role || !riderId) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin" && role !== "rider") return res.status(400).json({ error: "You don't have the permission to fetch rider information" });

  Rider.find({ _id: riderId }, { imageUrl: 0, vehicleImage: 0, driverLicense: 0, insurance: 0 })
    .then(rider => {
      if (!rider) return res.status(400).json({ error: "Rider not does not exist" });
      return res.json(rider);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.riderPhoto = ( req, res, next ) => {
  const { riderId } = req.params;

  Rider.findById( { _id: riderId } )
    .then(rider => {
      if (!rider) return res.status( 400 ).json( { error: "Failed to fetch rider's photo" } );
      res.set( "Content-Type", rider.imageUrl.contentType );
      return res.send( rider.imageUrl.data );
    } )
    .catch( err => {
      res.status(400).json( { error: err.message } );
    } );
}

exports.vehiclePhoto = ( req, res, next ) => {
  const { riderId } = req.params;

  Rider.findById( { _id: riderId } )
    .then(rider => {
      if (!rider) return res.status( 400 ).json( { error: "Failed to fetch vehicle image" } );
      res.set( "Content-Type", rider.vehicleImage.contentType );
      return res.send( rider.vehicleImage.data );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } )
}

exports.insurancePhoto = (req, res) => {
  const { riderId } = req.params;
  if (!riderId) return res.status(400).json({ error: "Invalid parameter values: rider ID" });

  Rider.findById({ _id: riderId })
    .then(rider => {
      if (!rider) return re.status(400).json({ error: "Rider not found" });
      res.set("Content-Type", rider.vehicleInsurance.contentType);
      return res.send(rider.vehicleInsurance.data);
    })
}

exports.getLicense = (req, res) => {
  const { riderId } = req.params;
  if (!riderId) return res.status(400).json({ error: "Invalid parameter values: rider ID" });

  Rider.findById({ _id: riderId })
    .then(rider => {
      if (!rider) return res.status(400).json({ error: "Rider not found" });
      res.set("Content-Type", rider.driverLicense.contentType);
      res.send(rider.driverLicense.data);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.activateRider = (req, res) => {
  const { role, riderId } = req.params;
  if (!role || !riderId) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "You don't have the permission to fetch riders" });
  Rider.findByIdAndUpdate({ _id: riderId }, { $set: { activated: true }}, { new: true })
    .then(rider => {
      if (!rider) return res.status(400).json({ error: "Failed to activate rider" });
      return res.json({ message: "Rider has been activated", rider });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deactivateRider = (req, res) => {
  const { role, riderId } = req.params;
  if (!role || !riderId) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "You don't have the permission to fetch riders" });
  Rider.findByIdAndUpdate({ _id: riderId }, { $set: { activated: false }}, { new: true })
    .then(rider => {
      if (!rider) return res.status(400).json({ error: "Failed to activate rider" });
      return res.json({ message: "Rider has been activated", rider });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.offlineMode = (req, res) => {
  const { riderId } = req.params;
  if (!riderId) return res.status(400).json({ error: "Invalid parameter values" });

  Rider.findByIdAndUpdate({ _id: riderId }, { $set: { online: false }}, { new: true })
    .then(rider => {
      if (!rider) return res.status(400).json({ error: "Failed to update offline mode." });
      return res.json({ message: "Online mode turned off" });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
}

exports.onlineMode = (req, res) => {
  const { riderId, deviceToken } = req.params;
  if (!riderId) return res.status(400).json({ error: "Invalid parameter values" });

  Rider.findByIdAndUpdate({ _id: riderId }, { $set: { online: true }}, { new: true })
    .then(rider => {
      if (!rider) return res.status(400).json({ error: "Failed to update online mode." });
      return res.json({ message: "Online mode turned on" });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
}

exports.deleteRider = (req, res) => {
  const { riderId, role } = req.params;
  if (!role || !riderId) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "You don't have the permission to fetch riders" });

  Rider.findByIdAndDelete({ _id: riderId })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Failed to delete rider. Rider not found" });
      return res.json({ riderId: result._id });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.updateRiderLocation = (req, res) => {
  const { riderId } = req.params;
  if (!riderId) return res.status(400).json({ error: "Invalid parameter value: rider ID" });
  if (!mongoose.Types.ObjectId.isValid(riderId)) return res.status(400).json({ error: "Invalid rider ID" });
  const { coordinates } = req.body;
  
  Rider.findByIdAndUpdate({ _id: riderId }, { $set: { "position.coordinates": coordinates, "position.type": "Point" }}, { new: true })
    .then(rider => {
      if (!rider) return res.status(404).json({ error: "Rider not found" });
      return res.json({ message: "Location updated", rider });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.emailSender = (req, res) => {
  const { riderId, subject, message } = req.body;
  if (!subject || !message) return res.status(400).json({ error: "All fields are required" });
  if (!riderId) return res.status(400).json({ error: "Rider's ID is required" });
  if (!mongoose.Types.ObjectId.isValid(riderId)) return res.status(400).json({ error: "Invalid rider ID" });

  Rider.findById({ _id: riderId })
    .then(rider => {
      console.log(rider)
      if (!rider) return res.status(404).json({ error: "Rider not found" });
      const receiver = rider.email;
      const sender = "ONTHEMOOV";
      const message = req.body.message;
      const subject = req.body.subject;
      const data = {
        receiver, sender, message, subject
      }

      const result = sendEmail(data);
      return res.json({ message: "Message sent", result });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}