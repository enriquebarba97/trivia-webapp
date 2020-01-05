const path = require("path");
const express = require("express");
const app = express();

// settings 
app.set("port", process.env.PORT || 3000);

// static files 

app.use(express.static(path.join(__dirname, "public")));



// start the server
const server = app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});

// WebSockets
const SocketIO = require("socket.io");
const io = SocketIO(server);

io.on("connection", (socket) => {
  console.log("new connection" , socket.id);

// Hearing and Responsing to the clients

socket.on("Player1 added", (data) => {
    socket.broadcast.emit("Player1 added", data);
  });

socket.on("Player2 added", (data) => {
    socket.broadcast.emit("Player2 added", data);
  });

socket.on("Player3 added", (data) => {
    socket.broadcast.emit("Player3 added", data);
  });

socket.on("Player4 added", (data) => {
    socket.broadcast.emit("Player4 added", data);
  });

socket.on("Starting", () => {
    socket.broadcast.emit("Starting");
  });

socket.on("Rolling", (data) => {
    socket.broadcast.emit("Rolling", data);
  });


});
