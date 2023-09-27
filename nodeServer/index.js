// node server which will handle socket io connections
// const io = require("socket.io")(8000);

// const users = {};

//  io.on('connection', socket=>{
//      socket.on('new-user-joined', name=>{
//          console.log("New user", name);
//          users[socket.id] = name;
//          socket.broadcast.emit('user-joined', name);
//      });

//      socket.on('send', message=>{
//          socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
//      });

//      socket.on('disconnect', message=>{
//         socket.broadcast.emit('left', users[socket.id]);
//         delete users[socket.id];
//     });
//  })
const io = require("socket.io")(8000);

const users = {};
// io. on intract with multiple connection where as socket.on hanlde a particular connection
io.on("connection", (socket) => {
  try {
    socket.on("new-user-joined", async (name) => {
      console.log("New user", name);
      users[socket.id] = name;
      // brodcast.emit emit the messege to all people except the current joiner
      socket.broadcast.emit("user-joined", name);
    });

      socket.on("send", async (message) => {
        // similarly here it is receiving the messgae by all the the user
      socket.broadcast.emit("receive", {
        message: message,
        name: users[socket.id],
      });
    });

    socket.on("disconnect", async () => {
      try {
        if (users[socket.id]) {
          socket.broadcast.emit("left", users[socket.id]);
          delete users[socket.id];
        }
      } catch (error) {
        console.error("Error handling disconnect:", error);
      }
    });
  } catch (error) {
    console.error("Error handling socket connection:", error);
  }
});
