class controller{
	instance_ = null;
	constructor(){
        var _this = this;
        document.getElementById("dice_number").innerHTML = "0";
        document.getElementById("roll").onclick = this.roll_die;

        model.instance().player1_active = false;
        model.instance().player2_active = false;
        model.instance().player3_active = false;
        model.instance().player4_active = false;

        document.getElementById("active1").addEventListener('click', function(){
                controller.instance().set_player_config_active(1);
            }
        );
        document.getElementById("active2").addEventListener('click', function(){
                controller.instance().set_player_config_active(2);
            }
        );
        document.getElementById("active3").addEventListener('click', function(){
                controller.instance().set_player_config_active(3);
            }
        );
        document.getElementById("active4").addEventListener('click', function(){
                controller.instance().set_player_config_active(4);
            }
        );

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

        for (var i = 0; i < activations.length; i++) {
            if (activations[i] == true)
            {
                var name = document.getElementById("name" + (i+1).toString()).value;
                var cpu = false;
                var radioButtons = document.getElementsByName("config" + (i+1).toString());
                if(radioButtons[0].checked) {cpu = true;}
                model.instance().players.push(new player(counter, name, cpu))
                counter = counter + 1;
            };
        }

        this.current_player = model.instance().players[0];
        document.getElementById("current_player").innerHTML = "Player " + this.current_player.number.toString() + ": " + this.current_player.name;

        document.getElementById("game_config").style.display = "none";

        var turn_and_dice = document.getElementsByClassName("game_on");
        for (var i = 0; i < turn_and_dice.length; i++) {
          turn_and_dice[i].style.display = "block";
        }
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