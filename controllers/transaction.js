const { Transaction } = require("../models/transaction");
const roles = [ "admin", "customer", "user" ];

// create a new transaction;
exports.newTxn = (amount, txnType, txnTitle, customerId, role) => {
  if (!roles.includes(role)) return { error: "Only admin and customer can make transactions" };
  if (!amount || !txnType || !txnTitle || !customerId) return { error: "Incomplete transaction values" };
  let newTransaction = new Transaction({ amount, txnTitle, txnType, customerId });
  return newTransaction.save((err,doc) => {
    if (err || !doc) return { error: err.message };
    return { message: "Transaction complete" };
  });
}

// Fectch all transactions from the transaction model
exports.getTransactions = (req, res) => {
  const { _id, role } = req.user;
  if (!_id || !role) return res.status(400).json({ error: "Unauthorised access" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Only admin and customer are authorised for this operation" });
  Transaction.find()
    .populate("customerId", "firstName lastName email phone")
    .then(txn => {
      if (!txn) return res.status(400).json({ error: "Records empty" });
      return res.json(txn);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

// Fecth a single transaction with @params txnId
exports.getTransaction = (req, res) => {
  const { _id, role } = req.user;
  const { txnId } = req.params;
  if (!_id || !role) return res.status(400).json({ error: "Unauthorised access" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Only admin and customer are authorised for this operation" });
  if (!txnId) return res.status(400).json({ error: "Unknown transaction" });

  Transaction.findById({ _id: txnId })
    .populate("customerId", "firstName lastName email phone")
    .then(txn => {
      if (!txn) return res.status(400).json({ error: "Transaction not found" });
      return res.json(txn);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.txnByCustomer = (req, res) => {
  const { _id } = req.user;
  const { customerId } = req.params;
  if (!_id) return res.status(400).json({ error: "Unauthorized access. Please log in to continue" });
  if (!customerId) return res.status(400).json({ error: "Unknown customer" });
  Transaction.find({ customerId })
    .populate("customerId", "firstName lastName email phone")
    .then(txn => {
      if (!txn) return res.status(400).json({ error: "No transaction for this customer" });
      return res.json(txn);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.filterByAmount = (req, res) => {
  const query = req.params.amount;
  if (!query) return res.status(400).json({ error: "We don't know what you're looking for" });
  const toInt = Number(query);
  Transaction.find( { amount: toInt } )
    .then( txns => {
      if (!txns) return res.status(400).json({ error: "List empty" });
      res.json( { txns } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

exports.filterByTxnType = (req, res) => {
  const query = req.params.type;
  if (!query) return res.status(400).json({ error: "We don't know what you're looking for" });
  Transaction.find( { txnType: { $regex: new RegExp( query ) } } )
    .then( txns => {
      if (!txns) return res.status(400).json({ error: "List empty" });
      res.json( { txns } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

exports.filterByDate = (req, res) => {
  const query = req.params.date;
  if (!query) return res.status(400).json({ error: "We don't know what you're looking for" });
  Transaction.find( { "createdAt.getDate()": query } )
    .then( txns => {
      if (!txns) return res.status(400).json({ error: "List empty" });
      res.json( { txns } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

exports.deleteTxn = (req, res) => {
  const { txnId, role } = req.params;
  if (!txnId) return res.status(400).json({ error: "Unknown transaction" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin") return res.status(400).json({ error: "Only admin can delete a transaction" });
  Transaction.findByIdAndDelete({ _id: txnId })
    .then(txn => {
      if (!txn) return res.status(400).json({ error: "Transaction not found" });
      return res.json({ message: "Transaction deleted" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

