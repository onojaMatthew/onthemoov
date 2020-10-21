const admin = require("./firbase_rider_admin");
const winston = require("winston-mongodb");

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
  sound: "default"
};

exports.notification = (data) => {
  const notification_message = {
    notification: {
      title: data.title ? data.title :"New ride request",
      body: data.body ? data.body : "You have a new ride request from onthemoov",
      image: 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'
    },
    data: {
      orderId: JSON.stringify(data.orderId) //"5f1861ad59bf516934d766a5"
    }
  };

  const message = notification_message;
  const options =  notification_options;

  admin.messaging().sendToDevice(data.deviceToken, message, options)
    .then( response => {
      winston.info(`the notification response is: ${response}`);
    })
    .catch( err => {
      winston.error(err.message, err);
    });
}


