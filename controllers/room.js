const { Room } = require("../models/room");

exports.join = async (socketId, customerId, username) => {
  if (!customerId) return { error: "No room name is given" };
  const user = await Room.findOne({ room: customerId });
  
  if (user && user.room === customerId && user.username === username) return { error: "User already taken." };
  let newUser = new Room({ socketId, room: customerId, username });
  newUser = await newUser.save();
  return { newUser, error };
}

exports.deleteRoom = (socketId) => {
  if (!socketId) return { error: "Invalid parameter values" };

  ChatRoom.findOneAndDelete({ socketId })
    .then(room => { 
      if (!room) return { error: `Room with the ID not found`};
      return { room, error }
    })
    .catch(err => {
      return { error: err.message };
    });
}