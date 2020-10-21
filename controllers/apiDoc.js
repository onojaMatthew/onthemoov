
exports.apiDoc = (req, res) => {
  res.json({
    authRoutes: {

      verifyPhone: 'post("/auth/verify", verifyPhone). This route verifies phone number and it takes phone number as req body',

      signup: 'post("/api/v1/signup/:userType")',

      signupfieldName: "firstName, lastName, phone, email, password",

      login: 'post("/api/v1/login/:userType") field names are email and password. userType params is either customer, rider or admin',

      resetRoute: 'put("/api/v1/auth/reset_password/:token/:userType")',

      uploadPhoto: 'put("/auth/photo/:userId/:userType", upload.single("file"), uploadPhoto). This route is customer and admin profile photo upload. It takes userType and userId as req params. userType could be admin or customer depending who is consuming the route.',

      resetFieldName: "password",

      resetFieldParams: "admin, rider, customer"
    },
    customerRoutes: {

      createCustomer: 'post("/customer/new", createCustomer). This route creates a new customer and the field names are: firstName, lastName, email, password, customerId and deviceToken. deviceToken is the ID of the device being used to register. It also takes customer as req params.',

      singleCustomerRoute: 'get("/customer/:role/:customerId", requireLogin). The route takes role and customerId as req params. Role could be customer or admin and the user must be logged in to access this router',

      allCustomerRoute: 'get("/customer/:role", requireLogin) This route can be accessed by the admin alone. The role must must be admin and login token must be sent to the backend',

      customerPhotoRoutes: 'get("/customer/photo/:customerId", requireLogin). This route gets the customer\'s the photo. It takes the customerId as req params',

      deleteCustomerRoute: 'delete("/customer/delete/:customerId/:role", requireLogin). The delete route is available to only the admin. Role must be admin and customerId must be the customer\'s ID',

      devicetoken: 'put("/device_token"). The endpoint updates the user\'s device token. Field names are: userType=customer, deviceToken, userId. The field names are sent to the backend as request body'
    },
    adminRoute: {
      getSingleAdmin: 'get("/admin/:adminId/:role", requireLogin). This route gets single admin using the adminId and role as req params',

      getAllAdmin: 'get("/admin/:role", requireLogin). The route gets all admins and role must be admin',

      adminPhoto: 'get("/admin/photo/:adminId", requireLogin). This route gets the admin photo and adminId is required as req.params',

      delete: 'delete("/admin/delete/:adminId/:role", requireLogin). The route deletes admin from the model. It takes adminId and admin as role in the req.params.'
    },
    riderRoutes: {
    
      riderRegistration: 'post("/rider/registration", registration). This route handles new rider registration. It takes firstName, lastName, email, password, phone and role as field names. The role parameter must be rider',
      
      uploadVehicleData: 'put("/rider/upload/documents/:role/:riderId"). This route uploads vehicle documents. it takes the role and riderId as req params. It\'s field names are: insurance, vehicleImage, riderPhoto, driving_license, model, vehicleType, vehicleNumber.',

      uploadDriverPhoto: 'put("/rider/upload_rider_photo/:role/:riderId"). This route is for uploading the rider photo. It takes the role of the driver and the rider\'s ID as req params. The file input field name must be spelt as: image',

      updateRiderData: 'put("/rider/create/:role", createRider) ',

      updateRiderLocation: 'put("/rider/update/location/:riderId", requireLogin, updateRiderLocation). This api updates the current location of the rider. It takes the rider\'s location coordinates in the form coordinates = [lat, long] in the request body. It also takes the rider\'s ID as req params',

      getSingleRider: 'get("/rider/:riderId/:role", requireLogin, getRider) This route gets a single rider and requires the riderId and role as req params. The role param could be admin or rider. The user accessing this route must be logged in',

      getAllRider: 'get("/rider/:role", requireLogin, getRiders), Gets all riders in the rider model. It takes role as req params and the user accessing this route must be logged in',

      activateRider: 'put("/rider/activate/:role/:riderId", requireLogin). This route is available to only the admin. It takes the admin role and riderId as req params. The admin must be logged in to activate a rider',

      deactivateRider: 'put("/rider/deactivate/:role/:riderId", deactivateRider). This route is available to only the admin. It takes the admin role and riderId as req params. The admin must be logged in to deactivate a rider',

      getRiderPhoto: 'get("/rider/rider/photo/:riderId", requireLogin, riderPhoto) this route is for fetching the rider\'s image from the rider model. It takes the rider\'s ID @riderId as req params',

      getVehicleImage: 'get("/rider/vehicle/riderId") this route fetches the rider\'s vehicle image. It takes the riderId as the req params',

      getVehicleInsurance: 'get("/rider/insurance/photo/:riderId"). this route fetches the rider\'s vehicle image. It takes the riderId as the req params',

      getLicense: 'get("/rider/license/photo/:riderId"). this route fetches the driving license of the rider. It takes the riderId as the req params',

      deleteRider: 'delete("/rider/delete/:riderId/:role", requireLogin, deleteRider) this route deletes a rider from the database. It is only available to the admin. riderId and the admin role must be provided as req params',

      devicetoken: 'put("/device_token"). The endpoint updates the user\'s device token. Field names are: userType=customer, deviceToken, userId. The field names are sent to the backend as request body'
    },
    orderRoutes: {
      CreateOrder: 'post("/order/create", createOrder) This route creates new order by saving the order image. Ensure that the input field name is image',

      GetOrder: 'get("/order/:orderId/:role", requireLogin) This route fetches a particular order using the order Id and user role as req params. The role could be customer or admin depending on who is making the call and the user must be logged in.',

      orderImage: 'get("/order/photo/order_photo/:orderId", getOrderImage)',

      GetAllOrder: 'get("/order/all/:role", requireLogin, getOrders). The route fetches all order. It takes the admin role as req params and the admin must be logged in to fetch the orders.',

      GetRidersOrder: 'get("/order/rider_orders/:riderId/:role", requireLogin, orderByRider) The route gets a rider\'s orders and it takes the rider\'s role as req params. The caller of this route must be logged in',

      GetCustomerOrders: 'get("/order/customer/:customerId", requireLogin, orderByCustomer) This route fetches a customer\'s orders and the customer ID as req params',

      deleteOrder: 'delete("/order/delete/:orderId/:role", requireLogin, deleteOrder). This deletes an order and it takes the orderId and the admin role as req params. The admin must be logged in to delete an order',

      updateOrder: 'put("/order/update", requireLogin). This endpoint updates the order details',

      preDeliveryImageUpload: 'put("/order/pre_delivery_image_upload/:orderId", requireLogin, preDeliveryImageUpload). The endpoint uploads the order image just before the rider starts the trip. It takes the orderId as req params and comment as req.body. The image field name is image',

      postDeliveryImageUpload: 'put("/order/post_delivery_image_upload/:orderId", requireLogin, postDeliveryImageUpload). The endpoint uploads the order image at the point of delivery. It takes the orderId as req params and comment as req.body. The image field name is image',

      getPredeliveryImage: 'get("/order/pre_delivery_image/:orderId", requireLogin). The endpoint takes the orderId as req params.',

      getPostdeliveryImage: 'get("/order/post_delivery_image/:orderId", requireLogin). The endpoint takes the orderId as req params',

      cancelTrip: 'put("/order/cancel_trip/:orderId/:customerId", requireLogin, cancelTrip). This endpoint is used by the customer to cancel a trip. It takes the orderId and customerId as req.params',

      completeTrip: 'put("/order/complete_trip/:orderId/:riderId", requireLogin, completeTrip). This endpoint is used by the rider to complete a ride. It takes the riderId and the orderId as req.params',

      acceptRequest: 'put("/order/accepted_request/:riderId/orderId", requireLogin, acceptRequest). The API endpoint is used by the rider to accept a ride request. It takes the riderId and the orderId as req.params',

      startRide: 'put("/start_trip/:customerId/:orderId", requireLogin, startRide). This API starts a ride and requires the customer Id and the order ID as request params to be executed successfully'
    },

    costCalculator: 'post("/cost"). This api calculates the cost for a trip. It takes array of destinations and array of origins and the vehicle type as req body. The field names are: origin, destinations and vehicleType respectively.',
    smsRoutes: {
      sendSMS: 'post("/sms", sms). This API is used to send SMS to the receiver. It takes the phone number of the receiver and the message in the request body.'
    },
    ratingApis: {
      getAverageRating: 'get("/rating/:riderId"). This route calculates and returns the average rating of a driver. It takes the rider\'s id as req.params',
      postRating: 'post("/rating", ratingRider). This is used for rating a driver. It takes customerId, riderId and rating as req body'
    },
    claimRoutes: {
      getCustomerClaims: 'get("/claims/:customerId/customer", requireLogin). The API is used for fetching claims related to a customer. It takes the ID of the customer as customerId in the req params',

      getAllClaim: 'get("/claims/:role", requireLogin, getClaims). This API fetches all claims for the admin. It takes admin role as req params',

      getSingleClaim: 'get("/claims/:claimId/:role", requireLogin). This route fetches a single claim using the claim ID as claimId and the admin role in the req params',

      postNewClaim: 'post("/claims/new", requireLogin). This route creates new claim. The field names are: senderId, email, subject, and message as req body',

      updateClaimStatus: 'put("/claims/status", requireLogin). The route is used by the admin to update the status of a claim. Status could be pending, resolved or unresolvable. The default value is: pening. The field names are status and claimId and they are passed in the req body',

      deleteClaim: 'delete("/claims/delete/:claimId/:role", requireLogin). The delete API deletes a particular claim using the ID of the claim. It takes the claimId and role as req params',
    },
    riderContactus: {
      postHelp: 'post("/contact/new", requireLogin, create). This API creates new help. It takes senderId, subject, email, message as field names',

      getARiderHelp: 'get("/contact/rider/:riderId", requireLogin, getContactByRider). This route gets helps related to a rider. It takes the riderId as req params',

      getAllHelp: 'get("/contact/:role", requireLogin, getContacts). This route gets all helps and it takes the admin role as req params',

      getSingleHelp: 'get("/contact/:role/:helpId", requireLogin, getContact). The API get a single help using the helpId as req params',

      updateHelpStatus: 'put("/contact/status/:role/:helpId", requireLogin, updateStatus). the route updates the status a particuler and it takes the admin role and helpId as req params',

      deleteHelp: 'delete("/contact/:role/:helpId", requireLogin, deleteHelp). this route deletes a help using the helpId and admin role as req params',
    },
    vehicleManagementRoutes: {
      addVehicle: 'post("/vehicle/new", requireLogin). Creates a new vehicle type. The field names: type, baseFare, minimumFare, per_distance_charge. The user accessing this API must be logged in.',

      getVehicles: 'get("/vehicle/all", requireLogin). Fetches all vehicle types',

      getSingleVehicle: 'get("/vehicle/:vehicleId" requireLogin). Fetches a single vehicle details. It takes the ID of that vehicle as req params',

      updateVehicle: 'put("/vehicle/update/:vehicleId/:role", requireLogin). Updates a vehicle data. It takes the vehicleId as req params',

      deleteVehicle: 'delete("/vehicle/delete/:vehicleId/:role", requireLogin). Deletes a vehicle. It takes the vehicle ID as req params',
    },
    earningRoutes: {
      getAllEarnings: 'get("/earning/all/:role", getEarnings). req.params: role = admin role',

      getSingleEarning: 'get("/earning/:earningId", getEanrning). req.params earningId = ID of earning',

      getAdriverEarnings: 'get("/earning/rider/:riderId", getEarningsByRider) req.params riderId is the rider ID. The API fetches all earning of a rider.',
      
      deleteEarning: 'delete("/earning/delete/:earningId", deleteEarning). The route deletes an earning. req.params earningId = earning ID',
    }
  });
}

