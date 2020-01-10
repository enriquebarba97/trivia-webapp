class controller{
	instance_ = null;
	constructor(){
        document.getElementById("dice_number").innerHTML = "0";

        model.instance().player1_active = false;
        model.instance().player2_active = false;
        model.instance().player3_active = false;
        model.instance().player4_active = false;

        document.getElementById("roll").onclick = function(){
        	controller.instance().roll_die();
        };

        document.getElementById("active1").onclick = function(){
           controller.instance().set_player_config_active(1);
        };

        document.getElementById("active2").onclick = function(){
            controller.instance().set_player_config_active(2);
        };

        document.getElementById("active3").onclick = function(){
            controller.instance().set_player_config_active(3);
        };

        document.getElementById("active4").onclick = function(){
            controller.instance().set_player_config_active(4);
        };

        document.getElementById("new_question_button").onclick = function(){
            var question = controller.instance().newQuestionButtonClicked();
                window.setTimeout(function(){
                socket.emit("New question", question);
                }, 100)
		};

		document.getElementById("check_answer_button").onclick = function(){
            controller.instance().checkAnswerButtonClicked();
		};

        document.getElementById("start").onclick = function(){
        	controller.instance().start();
        };

        document.getElementById("doc").onclick = function() {
            controller.instance().showDoc();
        }

        this.question_history_counter = 1;
	}

    showDoc()
    {
        alert(documentation);
    }

    newQuestionButtonClicked()
    {
        var c = controller.instance();
        var category_buttons = document.getElementsByName("category");
        c.desired_category = 0;
        for(var cat of category_buttons)
        {
            if (cat.checked) 
            {
                c.desired_category = parseInt(cat.value);
            }
        }
        if (c.desired_category == 0)
        {
            alert("No Category Selected!");
            return;
        }
        var question = model.instance().getQuestion(c.desired_category);
        if(model.instance().current_player.cpu){
            console.log("CPU Turn")
            window.setTimeout(controller.instance().cpuPick, 2000);
        }
        return question;
    }

    checkAnswerButtonClicked()
    {
        var c = controller.instance();
        var check = c.sanityCheck();
        if (check == false) {return;}

        var correct = model.instance().checkAnswer();
        if (correct){view.instance().answerCorrect();}
        else{view.instance().answerWrong();}


        var new_question    = document.createElement("div");

        if (correct) {new_question.className = "qh_question_true";}
        else{new_question.className = "qh_question_false";}
        
        var question_text = document.createTextNode((controller.instance().question_history_counter).toString() + ".) " + document.getElementById("question").innerHTML);
        controller.instance().question_history_counter++;
        new_question.appendChild(question_text);

        document.getElementById("q_history").insertBefore(new_question, document.getElementById("q_history").firstChild);


        view.instance().uncheckCategories();
        view.instance().clearQuestion();
        
        var win = c.checkScore()
        if (win) {
            alert("Player " + model.instance().current_player.number + ": " + model.instance().current_player.name + " has won! Congratulations!");
            window.setTimeout(view.instance().reset, 1000);
            return;
        }

        controller.instance().nextPlayer();
        if(model.instance().current_player.cpu){
            alert("Player " + model.instance().current_player.number + ": " + model.instance().current_player.name + " is rolling the dice. Please move the player's token accordingly and fetch a question.");
            controller.instance().roll_die();
        }
    }

    checkScore()
    {
        for(var value of model.instance().current_player.categories_correct) {
            if(value == 0)
            {
                return false;
            }
        }
        return true;
    }

    sanityCheck()
    {
        var answers = document.getElementsByName("answer");
        if (answers.length == 0) {
            //alert("No Question Fetched!");
            return false;
        }
        return true;
    }


	roll_die(){
        document.getElementById("dice_number").innerHTML = "...";
        window.setTimeout(function() {model.instance().setNewDiceNumber(document.getElementById("dice_number"))}, 500);
    }


    set_player_config_active(number)
    {
        if (document.getElementById("player_config" + number.toString()).style.backgroundColor == "green") 
        {
            switch(number) {
                case 1:
                  model.instance().player1_active = false;
                  break;
                case 2:
                  model.instance().player2_active = false;
                  break;
                case 3:
                  model.instance().player3_active = false;
                  break;
                case 4:
                  model.instance().player4_active = false;
                  break;
                default:
            } 
            document.getElementById("player_config" + number.toString()).style.backgroundColor = "#4d4d4d";
            document.getElementById("player_config" + number.toString()).style.border = "1px solid #4d4d4d";
        }
        else
        {
            switch(number) {
                case 1:
                  model.instance().player1_active = true;
                  break;
                case 2:
                  model.instance().player2_active = true;
                  break;
                case 3:
                  model.instance().player3_active = true;
                  break;
                case 4:
                  model.instance().player4_active = true;
                  break;
                default:
            }
            document.getElementById("player_config" + number.toString()).style.backgroundColor = "green"
            document.getElementById("player_config" + number.toString()).style.border = "1px solid #000000";
        }
    }

    start()
    {
        var m = model.instance();
        var activations = [m.player1_active, m.player2_active, m.player3_active, m.player4_active];
        var counter = 1;

        var number_of_players = 0;
        for(var act of activations){
        	if(act){
        		number_of_players++;
        	}
        }

        if(number_of_players == 0){return;}

        for (var i = 0; i < activations.length; i++) {
            if (activations[i] == true)
            {
                var name = document.getElementById("name" + (i+1).toString()).value;
                var cpu = false;
                var radioButtons = document.getElementsByName("config" + (i+1).toString());
                if(radioButtons[0].checked){
                	cpu = true;
                }

                model.instance().players.push(new player(counter, name, cpu, view.instance().player_colors[i], number_of_players))

                counter = counter + 1;
            };
        }

        m.current_player = m.players[0];
        document.getElementById("current_player").innerHTML = "Player " + m.current_player.number.toString() + ": " + m.current_player.name;
        document.getElementById("color_indicator").style.backgroundColor = m.current_player.color;

        document.getElementById("game_config").style.display = "none";

        for(var play of m.players)
        {
            var newPlayer = document.createElement("div");
            var red       = document.createElement("div");
            var yellow    = document.createElement("div");
            var blue      = document.createElement("div");
            var green     = document.createElement("div");
            var name      = document.createElement("div");

            newPlayer.className = "player_score";
            name.className      = "score_name";

            red.className       = "red";
            yellow.className    = "yellow";
            blue.className      = "blue";
            green.className     = "green";

            red.id          = "red_" + play.number.toString();
            yellow.id       = "yellow_" + play.number.toString();
            blue.id         = "blue_" + play.number.toString();
            green.id        = "green_" + play.number.toString();

            var text_name = document.createTextNode("Player " + play.number.toString() + ": " + play.name);
            name.appendChild(text_name);

            newPlayer.appendChild(name);
            newPlayer.appendChild(red);
            newPlayer.appendChild(yellow);
            newPlayer.appendChild(blue);
            newPlayer.appendChild(green);

            document.getElementById("score_sheet").appendChild(newPlayer);
        }

        view.instance().turnGameModeOn();


        if (m.current_player.cpu){
            alert("Player " + m.current_player.number + ": " + m.current_player.name + " is rolling the dice. Please move the player's token accordingly and fetch a question.");
            controller.instance().roll_die();
        }
    }


	nextPlayer(){
		var m = model.instance();
		for(var i = 0; i < m.players.length; ++i){
			if(m.players[i] == m.current_player){
				if(i == m.players.length - 1){
					m.current_player = m.players[0];
					break;
				}
				else{
					m.current_player = m.players[i + 1];
					break;
				}
			}
		}
		document.getElementById("current_player").innerHTML = "Player " + m.current_player.number.toString() + ": " + m.current_player.name;
        document.getElementById("color_indicator").style.backgroundColor = m.current_player.color;
	}


	cpuPick(){
		var random = Math.floor(Math.random() * 4);
		var answers = document.getElementsByName("answer");
        answers[random].checked = true;
        view.instance().highlightAnswer(random);
        window.setTimeout(function() {view.instance().lowlightAnswer(random)}, 1000);
	}

	static instance(){
		if(controller.instance_ == null){
			controller.instance_ = new controller();
			return controller.instance_;
		}
		else{
			return controller.instance_;
		}
	}
}