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
        var activations = [model.instance().player1_active, model.instance().player2_active, model.instance().player3_active, model.instance().player4_active];
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

        model.instance().current_player = model.instance().players[0];
        document.getElementById("current_player").innerHTML = "Player " + model.instance().current_player.number.toString() + ": " + model.instance().current_player.name;

        document.getElementById("game_config").style.display = "none";

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