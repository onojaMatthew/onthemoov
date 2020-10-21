const admin = require("firebase-admin");

const serviceAccount = require("./onthemooverider-firebase-adminsdk-2vkf0-6c0ea65c9f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.RIDER_FIREBASE_DATABASE_ADMIN_URL
  // "https://onthemooverider.firebaseio.com"
});
// , process.env.RIDER_FIREBASE_APP_NAME
module.exports = admin;
