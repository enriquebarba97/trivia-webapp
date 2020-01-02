class controller{
	instance_ = null;
	constructor(){
        var _this = this;

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
		    getQuestion(9);
		};

		document.getElementById("check_answer_button").onclick = async function(){
		    checkAnswer();
		    controller.instance().nextPlayer();
		    while(model.instance().current_player.cpu){
		    	controller.instance().cpuTurn();
				await sleep(2000);
		    	controller.instance().nextPlayer();
		    }
		};

        document.getElementById("start").addEventListener('click', _this.start)
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
            document.getElementById("player_config" + number.toString()).style.backgroundColor = "green";
        }
    }

    start()
    {
        console.log("start");
        var m = model.instance();
        var activations = [m.player1_active, m.player2_active, m.player3_active, m.player4_active];
        var counter = 1;

        var number_of_players = 0;
        for(var act of activations){
        	if(act){
        		number_of_players++;
        	}
        }

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
        document.getElementById("score_sheet")

        var turn_and_dice = document.getElementsByClassName("game_on");
        for (var i = 0; i < turn_and_dice.length; i++) {
          turn_and_dice[i].style.display = "block";
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


	async cpuTurn(){
		this.roll_die();
		getQuestion(9);
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


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}