//const socket = new WebSocket("wss://connect.websocket.in/v2/14?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVlMTc3Yjk0NzgwNzQ3NmRiOWYyNTQwYzI3M2I1MGVkZTIzN2RiMzNiOGVhODI3NjE3MjA0ZWZkNDRmZGE0M2MwZmU4MDcwMjhlNThmM2VkIn0.eyJhdWQiOiI4IiwianRpIjoiNWUxNzdiOTQ3ODA3NDc2ZGI5ZjI1NDBjMjczYjUwZWRlMjM3ZGIzM2I4ZWE4Mjc2MTcyMDRlZmQ0NGZkYTQzYzBmZTgwNzAyOGU1OGYzZWQiLCJpYXQiOjE1NzgyMjkyMjEsIm5iZiI6MTU3ODIyOTIyMSwiZXhwIjoxNjA5ODUxNjIxLCJzdWIiOiIyNDUiLCJzY29wZXMiOltdfQ.fXiYOMmb8mG-Zse8jQTYV_M8QOZm0o3MZ8NNTIlWrgMqbq4ZrzNpuCcsqxuRrGMTfvLhH_G3DoNCVI6JbyaYEKhjGZgXwd3sGJ_43Fjuh9lCWYKd5HDPcrPFK4LmTzM_qCZtBCh3t6lSREOuisnswdnABw-b9kGxGOPFzpZlDmRGa3xUoHyU6Fm-uQ6A6Se0TJKBrYngVYzQpceiNkLczEyUUiyzYfEjH5k9PDQ6BO3dlW6lWbl73plcS8KXN4KYxTUctq6gEJkOhVrL3vcnml4nleFwh4BTwCbFxNtxDbNOzfs4je28I-yoyTdDLcbO2YYl72ygZWKRQUYoeRYYAkbXrw74n4wlIbF2su2qOBSeb9tC_g41VU4Eex8fLUxs3Dp5gO7CF-Xpp5t_GEU7grjcm-t_Ctjz6uZUE93KGuMdYXeVffJh9lfb66GSffZ5wNS6SqG7FowRiTS0J7Isqhvspi8m-lu4vNio_ueCV_nLY5obIPDFWtSfNEDvKFO94E-IkNswvImBXOH4zNFjW3jxlbh8Zz-mMco6W8TkAhgQ_C8XHotn6ndHqp5461d4BOi9T0Z3KQWDm5PTaEpw1qHlKcAxBb2sS12ngiZeusQKt0TaCFQR8SzHioTwVAO0aNQhZ3PItG4NparPRg0cglsCPFfz6wXIudCkp53fPzc");
var socket = null;

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
let text_question = document.getElementById("text_question");
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
let answer_1 = document.getElementById("answer_1");
let answer_2 = document.getElementById("answer_2");
let answer_3 = document.getElementById("answer_3");




// Sending to the server notifications

document.getElementById("active-online").addEventListener("click", function () {

  var channel = document.getElementById("channel").value;
  if (channel == "" || channel < 1 || channel > 10000) {
    alert("Choose a code between 1 and 10000");
    return;
  }
  socket = new WebSocket("wss://connect.websocket.in/v2/" + channel + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVlMTc3Yjk0NzgwNzQ3NmRiOWYyNTQwYzI3M2I1MGVkZTIzN2RiMzNiOGVhODI3NjE3MjA0ZWZkNDRmZGE0M2MwZmU4MDcwMjhlNThmM2VkIn0.eyJhdWQiOiI4IiwianRpIjoiNWUxNzdiOTQ3ODA3NDc2ZGI5ZjI1NDBjMjczYjUwZWRlMjM3ZGIzM2I4ZWE4Mjc2MTcyMDRlZmQ0NGZkYTQzYzBmZTgwNzAyOGU1OGYzZWQiLCJpYXQiOjE1NzgyMjkyMjEsIm5iZiI6MTU3ODIyOTIyMSwiZXhwIjoxNjA5ODUxNjIxLCJzdWIiOiIyNDUiLCJzY29wZXMiOltdfQ.fXiYOMmb8mG-Zse8jQTYV_M8QOZm0o3MZ8NNTIlWrgMqbq4ZrzNpuCcsqxuRrGMTfvLhH_G3DoNCVI6JbyaYEKhjGZgXwd3sGJ_43Fjuh9lCWYKd5HDPcrPFK4LmTzM_qCZtBCh3t6lSREOuisnswdnABw-b9kGxGOPFzpZlDmRGa3xUoHyU6Fm-uQ6A6Se0TJKBrYngVYzQpceiNkLczEyUUiyzYfEjH5k9PDQ6BO3dlW6lWbl73plcS8KXN4KYxTUctq6gEJkOhVrL3vcnml4nleFwh4BTwCbFxNtxDbNOzfs4je28I-yoyTdDLcbO2YYl72ygZWKRQUYoeRYYAkbXrw74n4wlIbF2su2qOBSeb9tC_g41VU4Eex8fLUxs3Dp5gO7CF-Xpp5t_GEU7grjcm-t_Ctjz6uZUE93KGuMdYXeVffJh9lfb66GSffZ5wNS6SqG7FowRiTS0J7Isqhvspi8m-lu4vNio_ueCV_nLY5obIPDFWtSfNEDvKFO94E-IkNswvImBXOH4zNFjW3jxlbh8Zz-mMco6W8TkAhgQ_C8XHotn6ndHqp5461d4BOi9T0Z3KQWDm5PTaEpw1qHlKcAxBb2sS12ngiZeusQKt0TaCFQR8SzHioTwVAO0aNQhZ3PItG4NparPRg0cglsCPFfz6wXIudCkp53fPzc");

  socket.onopen = function () {
    document.getElementById("connected").innerHTML = "Connected";
    document.getElementById("game-online").style.backgroundColor = "green";
  }

  player1.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Player added";
    data.player = 1;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  player2.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Player added";
    data.player = 2;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  player3.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Player added";
    data.player = 3;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  player4.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Player added";
    data.player = 4;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  name1.addEventListener("keyup", function () {
    var mes = {};
    mes.event = "Name changed";
    var data = {};
    data.player = 1;
    data.name = this.value;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  name2.addEventListener("keyup", function () {
    var mes = {};
    mes.event = "Name changed";
    var data = {};
    data.player = 2;
    data.name = this.value;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  name3.addEventListener("keyup", function () {
    var mes = {};
    mes.event = "Name changed";
    var data = {};
    data.player = 3;
    data.name = this.value;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  name4.addEventListener("keyup", function () {
    var mes = {};
    mes.event = "Name changed";
    var data = {};
    data.player = 4;
    data.name = this.value;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });


  startgame.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Starting";
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  roll.addEventListener("click", function () {
    setTimeout(function () {
      var mes = {};
      var data = {};
      mes.event = "Rolling";
      data.roll = dice_number.innerHTML;
      mes.data = data;
      socket.send(JSON.stringify(mes));
    }, 600);
  });

  category1.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Selected Category";
    data.cat = 1;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  category2.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Selected Category";
    data.cat = 2;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  category3.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Selected Category";
    data.cat = 3;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  category4.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Selected Category";
    data.cat = 4;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  check_answer_button.addEventListener("click", function () {
    var mes = {};
    mes.event = "Checking answer";
    socket.send(JSON.stringify(mes));
  });

  cpu1.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Changing cpu";
    data.cpu = 1;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  cpu2.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Changing cpu";
    data.cpu = 2;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  cpu3.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Changing cpu";
    data.cpu = 3;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  cpu4.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Changing cpu";
    data.cpu = 4;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  human1.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Changing human";
    data.human = 1;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  human2.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Changing human";
    data.cpu = 2;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  human3.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Changing human";
    data.cpu = 3;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  human4.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Changing human";
    data.cpu = 4;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  answer_0.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Answer selected";
    data.ans = 0;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  answer_1.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Answer selected";
    data.ans = 1;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  answer_2.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Answer selected";
    data.ans = 2;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  answer_3.addEventListener("click", function () {
    var mes = {};
    var data = {};
    mes.event = "Answer selected";
    data.ans = 3;
    mes.data = data;
    socket.send(JSON.stringify(mes));
  });

  // // Listening to the server and changing in all clients


  socket.onmessage = function (e) {
    try {
      var mes = JSON.parse(e.data);
    } catch (err) {
      alert("Unexpected message from the server")
      return;
    }
    var data = mes.data;

    switch (mes.event) {
      case "Player added":
        controller.instance().set_player_config_active(data.player);
        break;
      case "Name changed":
        var data = mes.data;
        document.getElementById("name" + data.player).value = data.name;
        break;
      case "Starting":
        controller.instance().start();
        break;
      case "Rolling":
        dice_number.innerHTML = data.roll;
        break;
      case "Selected Category":
        document.getElementById("category" + data.cat).checked = true;
        break;
      case "New question":
        var result = data.question;
        var num = result.cpos;
        var j = 0;
        var letter = 'a';

        document.getElementById("question").innerHTML = result.question;

        for (var i = 0; i < 4; i++) {
          if (i == num) {
            var answer = letter + ": " + result.correct_answer;
            document.getElementById("label_" + i).innerHTML = answer;
            document.getElementById("answer_" + i).value = "correct";
          } else {
            var answer = letter + ": " + result.incorrect_answers[j];
            document.getElementById("label_" + i).innerHTML = answer;
            document.getElementById("answer_" + i).value = "incorrect";
            j++;
          }
          letter = String.fromCharCode(letter.charCodeAt(0) + 1);
        }

        document.getElementById("text_question").hidden=false;
        break;
      case "Checking answer":
        controller.instance().checkAnswerButtonClicked();
        break;
      case "Answer selected":
        document.getElementById("answer_" + data.ans).checked = true;
        break;
      case "Changing cpu":
        document.getElementById("cpu" + data.cpu).checked = true;
        break;
      case "Changing human":
        document.getElementById("human" + data.human).checked = true;
        break;
      case "Moving player":
        var cp = model.instance().current_player;
        cp.x = data.x;
        cp.y = data.y;
        break
    }
  };
});

