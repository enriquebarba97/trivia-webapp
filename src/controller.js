class controller{
	constructor(){
		this.model = new model();
		view.instance();
	}

	run(){
		var _this = this;
        document.getElementById("dice_number").innerHTML = "0";

        document.getElementById("roll").onclick = function(){
            document.getElementById("dice_number").innerHTML = "...";
            window.setTimeout(function() {_this.model.setNewDiceNumber(document.getElementById("dice_number"))}, 500);
        };
	}
}