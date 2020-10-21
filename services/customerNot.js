const { admin } = require("./firebase_admin");

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
  sound: "default"
};

exports.customerNotification = (data) => {
  const notification_message = {
    notification: {
      title: data.title, //"New ride request",
      body: data.message, //"Your delivery request was accepted",
      image: 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'
    },
    data: {
      rider: data.rider ? data.rider : null // "5f1861ad59bf516934d766a5"
    }
  };

  const message = notification_message;
  const options =  notification_options;
    
  admin.messaging().sendToDevice(data.deviceToken, message, options)
    .then( response => {
      console.log(JSON.stringify(response));
    })
    .catch( error => {
        console.log(error);
    });
}
