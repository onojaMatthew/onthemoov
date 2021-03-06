const mongoose = require( "mongoose" );
const winston = require( "winston" );
require( "dotenv" ).config();

let db_url;
const env = process.env.NODE_ENV || 'development';
if ( env === "development" ) {
  db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@onthemoov.wfw7e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
} else {
  db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@onthemoov.wfw7e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;;
}


module.exports = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect( db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    poolSize: 5,
    socketTimeoutMS: 45000,
  } )
    .then( () => {
      winston.info("Connection to database established");
    } )
    .catch( err => {
      winston.error(`Connection failed. ${ err.message }`);
    } );
  
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
}