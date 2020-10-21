const bcrypt = require("bcrypt");
const { Customer } = require("../models/customer");
const { Rider } = require("../models/rider");
const roles = [ "admin", "rider", "customer" ];

exports.createCustomer = (req, res) => {
  const { firstName, lastName, email, password, customerId, deviceToken } = req.body;
  const { userType } = req.params;
  if (!firstName || !lastName || !email || !password) return res.status(400).json({ error: "All input fields are required" });
  if (!userType) return res.status(400).json({ error: "User type is required" });
  if (userType !== "customer") return res.status(400).json({ error: "You don't have the right permission" });

  Customer.findOne({ email: email })
    .then(customer => {
      if (customer) return res.status(400).json({ error: "User already exists" });
      return bcrypt.hash(req.body.password, 12)
        .then(hashedPassword => {
          if (!hashedPassword) return res.status(400).json({ error: "Failed to hash password" });

          let newCustomer = new Customer({ 
            firstName, 
            lastName, 
            email, 
            password: hashedPassword, 
            customerId,
            role: req.params.userType 
          });
          
          newCustomer.save(( err, doc) => {
            if (err || !doc) return res.status(400).json({ error: err.message });
            return res.json({ message: "A new customer has been created", doc });
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

exports.getCustomers = (req, res) => {
  const { role } = req.params;

  if (!role) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin" && role !== "user") return res.status(400).json({ error: "You don't have the permission to fetch riders" });

  Customer.find({}, { imageUrl: 0 })
    .then(customers => {
      if (!customers) return res.status(400).json({ error: "No records found" });
      return res.json(customers);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getCustomer = (req, res) => {
  const { role, customerId } = req.params;
  if (!role || !customerId) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin" && role !== "rider" && role !== "user") return res.status(400).json({ error: "You don't have the permission to fetch rider information" });

  Customer.find({ _id: customerId }, { imageUrl: 0 })
    .then(customer => {
      if (!customer) return res.status(400).json({ error: "Customer not does not exist" });
      return res.json(customer);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.userPhoto = ( req, res, next ) => {
  const { userId, userType } = req.params;
  let User;
  switch(userType) {
    case "customer":
      User = Customer;
      break;
    case "rider":
      User = Rider;
      break;
    default: return res.status(400).json({ error: "Unknown user type" });
  }

  User.findById({ _id: userId })
    .then(user => {
      if (!user) return res.status(400).json({ error: "Failed to fetch customer's photo" });
      res.set("Content-Type", user.imageUrl.contentType);
      return res.send(user.imageUrl.data);
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}


exports.deleteCustomer = (req, res) => {
  const { customerId, role } = req.params;
  if (!role || !customerId) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "You don't have the permission to fetch riders" });

  Customer.findByIdAndDelete({ _id: customerId })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Failed to delete rider. Rider not found" });
      return res.json({ customerId: result._id });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}
