const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const winston = require("winston");
const db = require("./config/db");
const path = require("path");
const { join, getUser } = require("./controllers/room");
const { Chat } = require("./models/chat");

require("dotenv").config();

const {
  PORT,
} = process.env;

const port = PORT || 4200

//===========================================================================
// Instantiating the express application
const app = express();

//===========================================================================
// Connecting to the database
db();

app.use(express.static(path.join(__dirname, '/client/build')));
//============================================================================
// Setting up middlewares
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true , parameterLimit: 500000 }))
app.use(cookieParser());

//==================================================
// Setting up Cross Origin Resource Sharing
//==================================================

app.use( ( req, res, next ) => {
  res.header( "Access-Control-Allow-Origin", "*");
  res.header( "Access-Control-Allow-Credentials", true );
  res.header( "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH" );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, X-Auth-Token' );

  next();
} );

require("./middlware/prod")(app);
//=============================================================================
// Custom route configuration
require("./middlware/routes")(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});




//=============================================================================
// error logger
require("./config/error-log")();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": req.headers.origin, // or the specific origin you want to give access to,
        "Access-Control-Allow-Credentials": true
    };
    res.writeHead(200, headers);
    res.end();
  }
});

//==================================================================================================

io.on("connection", socket => {
  
  socket.on("join", async ({ customerId, riderId, username }, callback) => {
    const socketId = socket.id;
    const { error, newUser } = await join(socketId, customerId, riderId, username);
    if (error) {
      return callback(error);
    }

    socket.join(newUser.room);
    
    callback(error);
  });

  socket.on("sendMessage", async (data, callback) => {
    const { customerId, riderId, message, username } = data;
    const { error, user } = await getUser(customerid, username);

    let newMessage = new Chat({
      username: user.username,
      customerId,
      riderId,
      message,
    });
  
    newMessage = await newMessage.save();

    io.to(customerId).emit("message", newMessage);
    callback(error);
  });

  socket.on("disconnect", () => {
    deleteRoom(socket.id);
  });
});

//=============================================================================
// Starting the server and listening on a port address
server.listen(port, () => {
  winston.info(`🚀 Server ready at http://localhost:${ port }`);
});

//vultr accont username adetayo@onthemoov.com password sKbHpnwZpa.cf33

// vultr server = 45.32.34.219 pasword = *2gVz.!2wK!sDZ7#