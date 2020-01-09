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
let myCanvas = document.getElementById("myCanvas");
let new_question_button = document.getElementById("new_question_button");
let category1 = document.getElementById("category1");
let category2 = document.getElementById("category2");
let category3 = document.getElementById("category3");
let category4 = document.getElementById("category4");
let check_answer_button = document.getElementById("check_answer_button");
let cpu1 = document.getElementById("cpu1");
let cpu2 = document.getElementById("cpu2");
let cpu3 = document.getElementById("cpu3");
let cpu4 = document.getElementById("cpu4");
let human1 = document.getElementById("human1");
let human2 = document.getElementById("human2");
let human3 = document.getElementById("human3");
let human4 = document.getElementById("human4");
let answer_0 = document.getElementById("answer_0");




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

myCanvas.addEventListener("click", function() {     //Not working yet
setTimeout(function() {  
  socket.emit("Moving Players", myCanvas);
},6);
});

category1.addEventListener("click", function() {
  socket.emit("Selected Category1");
});

category2.addEventListener("click", function() {
  socket.emit("Selected Category2");
});

category3.addEventListener("click", function() {
  socket.emit("Selected Category3");
});

category4.addEventListener("click", function() {
  socket.emit("Selected Category4");
});


new_question_button.addEventListener("click", function() {
  socket.emit("New question");
});

check_answer_button.addEventListener("click", function() {
  socket.emit("Checking answer");
});

cpu1.addEventListener("click", function() {
  socket.emit("Changing to cpu1");
});

cpu2.addEventListener("click", function() {
  socket.emit("Changing to cpu2");
});

cpu3.addEventListener("click", function() {
  socket.emit("Changing to cpu3");
});

cpu4.addEventListener("click", function() {
  socket.emit("Changing to cpu4");
});

human1.addEventListener("click", function() {
  socket.emit("Changing to human1");
});

human2.addEventListener("click", function() {
  socket.emit("Changing to human2");
});

human3.addEventListener("click", function() {
  socket.emit("Changing to human3");
});

human4.addEventListener("click", function() {
  socket.emit("Changing to human4");
});

//answer_0.addEventListener("click", function() {
//  socket.emit("answeeer");
//});


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
  dice_number.innerHTML = data;
});

socket.on("Moving Players", function(data) {
  console.log("moving");
  //myCanvas= data;
  //view.instance();
});


socket.on("Selected Category1", function() {
  category1.checked= true;
});

socket.on("Selected Category2", function() {
  category2.checked= true;
});

socket.on("Selected Category3", function() {
  category3.checked= true;
});

socket.on("Selected Category4", function() {
  category4.checked= true;
});


socket.on("New question", function() {
   controller.instance().newQuestionButtonClicked();
});

socket.on("Checking answer", function() {
  controller.instance().checkAnswerButtonClicked();  
});

socket.on("Answer selected", function() {
   console.log("Testing");
});

socket.on("Changing to cpu1", function() {
   cpu1.checked= true;
});

socket.on("Changing to cpu2", function() {
   cpu2.checked= true;
});

socket.on("Changing to cpu3", function() {
   cpu3.checked= true;
});

socket.on("Changing to cpu4", function() {
   cpu4.checked= true;
});

socket.on("Changing to human1", function() {
   human1.checked= true;
});

socket.on("Changing to human2", function() {
   human2.checked= true;
});

socket.on("Changing to human3", function() {
   human3.checked= true;
});

socket.on("Changing to human4", function() {
   human4.checked= true;
});


