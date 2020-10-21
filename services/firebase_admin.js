let admin = require("firebase-admin");

const serviceAccount = require("./onthemoov-e9d4c-firebase-adminsdk-oui93-796e04e044.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env. CUSTOMER_FIREBASE_DATABASE_ADMIN_URL
  // "https://onthemoov-e9d4c.firebaseio.com"
}, process.env.CUSTOMER_FIREBASE_APP_NAME);

module.exports = admin;