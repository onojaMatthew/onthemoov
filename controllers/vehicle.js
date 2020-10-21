const { Vehicle } = require("../models/vehicle");
const mongoose = require("mongoose");


exports.addVehicle = (req, res) => {
  const { type } = req.body;
  const { _id } = req.user;

  console.log(req.body)
  if (!type ) return res.status(400).json({ error: "All fields are required" });
  if (!_id) return res.status(400).json({ error: "Unauthorized access. Please log in to continue" });
  let newVehicle = new Vehicle({
    type,
    createdBy: _id,
  });

  newVehicle.save((err, doc) => {
    if (err || !doc) return res.status(400).json({ error: err.message });
    return res.json({ message: "New vehicle type created", doc });
  });
}

exports.getVehicles = (req, res) => {
  Vehicle.find()
    .populate("createdBy", "firstName lastName email")
    .then(vehicle => {
      if (!vehicle) return res.status(404).json({ error: "No records found" });
      return res.json(vehicle);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getVehicle = (req, res) => {
  const { vehicleId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(vehicleId)) return res.status(400).json({ error: "Invalid verhicle ID" });

  Vehicle.findById({ _id: vehicleId })
    .populate("createdBy", "firstName lastName email")
    .then(vehicle => {
      if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
      return res.json(vehicle); 
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.updateVehicle = (req, res) => {
  const { vehicleId, role } = req.params;
  if (!mongoose.Types.ObjectId.isValid(vehicleId)) return res.status(400).json({ error: "Invalid verhicle ID" });
  if (!role || role !== "admin") return res.status(403).json({ error: "Unauthorized access" });

  Vehicle.findByIdAndUpdate({ _id: vehicleId })
    .then(vehicle => {
      if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
      if (req.body.type) vehicle.type = req.body.type;
      if (req.body.baseFare) vehicle.baseFare = req.body.baseFare;
      if (req.body.per_distance_charge) vehicle.per_distance_charge = req.body.per_distance_charge;
      if (req.body.minimumFare) vehicle.minimumFare = req.body.minimumFare;
      vehicle.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ error: err.message });
        return res.json({ message: "Request complete", doc });
      });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteVehicle = (req, res) => {
  const { vehicleId, role } = req.params;
  if (!vehicleId || !role) return res.status(400).json({ error: "Invalid parameter values" });
  if (!mongoose.Types.ObjectId.isValid(vehicleId)) return res.status(400).json({ error: "Invalid vehicle ID" });
  if (role !== "admin") return res.status(403).json({ error: "Unauthorized access" });

  Vehicle.findByIdAndDelete({ _id: vehicleId })
    .then(vehicle => {
      if (!vehicle) return res.status(404).json({ error: "Vehicle ot found" });
      return res.json({ message: "Request complete", vehicle });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}