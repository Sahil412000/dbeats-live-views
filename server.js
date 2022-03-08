const express = require("express");
const app = express();
const server = require("http").createServer(app);
const port = 8000;
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    transports: ["websocket"],
    credentials: true,
  },
  allowEIO3: true,
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

var count = 0;
let users = [];

io.on("connection", (socket) => {
  var numClients = {};

  socket.on("joinlivestream", async (room) => {
    await socket.join(room.toString());
    console.log(room);
    console.log(io.sockets.adapter.rooms.get(room).size);
    let roomSize = io.sockets.adapter.rooms.get(room).size;
    let details = {
      room: room,
      roomSize,
      roomSize,
    };
    socket.emit("count", details);
    // socket.room = room;
    // if (numClients[room] == undefined) {
    //   numClients[room] = 1;
    // } else {
    //   numClients[room]++;
    // }
    // console.log(numClients);
    // if (io.sockets.adapter.rooms[username]) {
    //   // result
    //   console.log(io.sockets.adapter.rooms[username].length);
    // }
    //   const user = users.find((element) => {
    //     if (username === element.username) {
    //       return element;
    //     }
    //   });
    //   if (user) {
    //     for (let i = 0; i < users.length; i++) {
    //       if (user.username === users[i].username) {
    //         users[i].count++;
    //     }
    //   }
    // }
    //   else{
    //     let temp = {
    //       username: username,
    //       count:1
    //     }
    //     users.push(temp);
    //   }
  });

  socket.emit("count", {
    success: true,
    num: count,
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    // numClients[socket.room]--;
  });
});

// io.on("disconnect", (socket) => {
//   console.log("User Disconnected", socket.id);
// });

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
