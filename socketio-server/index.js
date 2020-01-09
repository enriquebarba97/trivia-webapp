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

socket.on("Moving Players", (data) => {
    socket.broadcast.emit("Moving Players", data);
  });

socket.on("Checking answer", () => {
    socket.broadcast.emit("Checking answer");
  });

socket.on("Selected Category1", () => {
    socket.broadcast.emit("Selected Category1");
  });

socket.on("Selected Category2", () => {
    socket.broadcast.emit("Selected Category2");
  });

socket.on("Selected Category3", () => {
    socket.broadcast.emit("Selected Category3");
  });

socket.on("Selected Category4", () => {
    socket.broadcast.emit("Selected Category4");
  });

socket.on("New question", () => {
    socket.broadcast.emit("New question");
  });

socket.on("Checking answer", () => {
    socket.broadcast.emit("Checking answer");
  });

socket.on("Answer selected", () => {
    socket.broadcast.emit("Answer selected");
  });


});
