const socket = io()


//DOM elements

let startgame = document.getElementById("start");
let player1 = document.getElementById("active1");
let player2 = document.getElementById("active2");
let player3 = document.getElementById("active3");
let player4 = document.getElementById("active4");
let name1 = document.getElementById("name1");
let name2 = document.getElementById("name2");
let name3 = document.getElementById("name3");
let name4 = document.getElementById("name4");
let roll = document.getElementById("roll");
let dice_number = document.getElementById("dice_number");



// Sending to the server notifications

player1.addEventListener("click", function() {
  socket.emit("Player1 added", name1.value);
});

player2.addEventListener("click", function() {
  socket.emit("Player2 added", name2.value);
});

player3.addEventListener("click", function() {
  socket.emit("Player3 added", name3.value);
});

player4.addEventListener("click", function() {
  socket.emit("Player4 added", name4.value);
});


startgame.addEventListener("click", function() {
  socket.emit("Starting");
});

roll.addEventListener("click", function() {
setTimeout(function() {
  socket.emit("Rolling", dice_number.innerHTML);
},600);
});


// Listening to the server and changing in all clients



socket.on("Player1 added", function(data) {
  name1.value = data;
   controller.instance().set_player_config_active(1);
	
});

socket.on("Player2 added", function(data) {
  name2.value = data;
   controller.instance().set_player_config_active(2);
	
});

socket.on("Player3 added", function(data) {
  name3.value = data;
   controller.instance().set_player_config_active(3);
	
});

socket.on("Player4 added", function(data) {
  name4.value = data;
   controller.instance().set_player_config_active(4);
	
});

socket.on("Starting", function() {
  controller.instance().start();
});

socket.on("Rolling", function(data) {
  console.log(data);
  dice_number.innerHTML = data;
});

