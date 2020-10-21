const { Admin } = require("../models/admin");

const roles = [ "admin", "rider", "customer" ];

exports.getAdmins = (req, res) => {
  const { role } = req.params;

  if (!role) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "You don't have the permission to fetch riders" });

  Admin.find({})
    .then(admins => {
      if (!admins) return res.status(400).json({ error: "No records found" });
      return res.json(admins);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getAdmin = (req, res) => {
  const { role, adminId } = req.params;
  if (!role || adminId) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin" && role !== "rider") return res.status(400).json({ error: "You don't have the permission to fetch rider information" });

  Admin.find({ _id: adminId })
    .then(admin => {
      if (!admin) return res.status(400).json({ error: "Customer not does not exist" });
      return res.json(admin);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.adminPhoto = ( req, res, next ) => {
  const { adminId } = req.params;

  Admin.findById( { _id: adminId } )
    .then(admin => {
      if (!admin) return res.status( 400 ).json( { error: "Failed to fetch admin's photo" } );
      res.set( "Content-Type", admin.imageUrl.ContentType );
      return res.send( admin.imageUrl.data );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } )
}


exports.deleteAdmin = (req, res) => {
  const { adminId, role } = req.params;
  if (!role || !adminId) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "You don't have the permission to fetch riders" });

  Admin.findByIdAndDelete({ _id: adminId })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Failed to delete rider. Admin not found" });
      return res.json({ message: "You have deleted a customer" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}