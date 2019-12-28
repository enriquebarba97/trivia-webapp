class model{
	constructor(){
        this.dice = {
            sides: 6,
            roll: function () {
                var randomNumber = Math.floor(Math.random() * this.sides) + 1;
                return randomNumber;
            }
        }

        this.dice_value = 0;
	}
    setNewDiceNumber(field)
    {
        this.dice_value = this.dice.roll();
        field.innerHTML = this.dice_value;
    }
}