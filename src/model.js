class model{
	instance_ = null;
	constructor(){
        this.dice = {
            sides: 6,
            roll: function () {
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        }

        this.dice_value = 0;

        this.player1_active = false;
        this.player2_active = false;
        this.player3_active = false;
        this.player4_active = false;

        this.players = [];
	}



    setNewDiceNumber(field)
    {
        this.dice_value = this.dice.roll();
        field.innerHTML = this.dice_value;
    }


	static instance(){
		if(model.instance_ == null){
			model.instance_ = new model();
			return model.instance_;
		}
		else{
			return model.instance_;
		}
	}
}