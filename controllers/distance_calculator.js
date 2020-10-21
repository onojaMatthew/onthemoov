require("dotenv").config();
const distance = require('google-distance-matrix');

exports.distanceCalculator = (req, res) => {// 'San Francisco, CA', 'San Diego, CA'
  const { origin, destinations, vehicleType } = req.body;
  const origins = origin// ['San Francisco CA'];//, '40.7421,-73.9914'
  // const destinations = destinations//['New York NY', 'Montreal', '41.8337329,-87.7321554', 'Honolulu'];
  //'New York NY,Montreal,41.8337329,-87.7321554,Honolulu'
  if (!origin) return res.status(400).json({ error: "Pickup location is required" })
  if (!destinations) return res.status(400).json({ error: "Destinations are required" })
  if (!vehicleType) return res.status(400).json({ error: "Vehicle type is required" })
//  Bike - Base Fare - N400
// Price per distance - N30 per km (minimum N600)

// Car - Base Fare - N2000
// Price per distance - N60
// per km (minimum N2000)

// Van - Base Fare - N5000
// Price per distance - N100
// per km (minimum N5000)

// Truck - Base Fare - N10000
// Price per distance - N150 per km (minimum  N10000)
  distance.key(process.env.DIST_MATRIX_API_KEY);
  distance.units('imperial');
  let price;
  distance.matrix(origins, destinations, (err, distances) => {
    if (err) {
      return console.log(err);
    }
    if(!distances) {
      return console.log('no distances');
    }
    if (distances.status == 'OK') {
      for (let i=0; i < origins.length; i++) {
        for (let j = 0; j < destinations.length; j++) {
          const origin = distances.origin_addresses[i];
          const destination = distances.destination_addresses[j];
          if (distances.rows[0].elements[j] && distances.rows[0].elements[j].status === 'OK') { 
            const distance = distances.rows[i].elements[j].distance.value;
            if (vehicleType.toLowerCase() === "bike") {
              let calPrice = 0;
              calPrice += (Math.ceil(distance/1000) * 30) + 400;
              if (calPrice < 600) {
                price = 600;
              } else {
                price = calPrice;
              }
            } else if (vehicleType.toLowerCase() === "car") {
              let calPrice = 0;
              calPrice += (Math.ceil(distance/1000) * 60) + 2000;
              if (calPrice < 2000) {
                price = 2000;
              } else {
                price = calPrice;
              }
            } else if (vehicleType.toLowerCase() === "van") {
              let calPrice = 0;
              calPrice += (Math.ceil(distance/1000) * 100) + 5000;
              if (calPrice < 5000) {
                price = 5000;
              } else {
                price = calPrice;
              }
                
            } else if (vehicleType.toLowerCase() === "truck") {
              let calPrice = 0;
              calPrice += (Math.ceil(distance/1000) * 150) + 10000;
              if (calPrice < 10000) {
                price = 10000;
              } else {
                price = calPrice;
              }
            }
          } else {
            console.log(destination + ' is not reachable by land from ' + origin);
          }
        }
      return res.json({message: "The calculated cost of delivery is: ", price});
      }
    }
  });
}
