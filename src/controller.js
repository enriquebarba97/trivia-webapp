class controller{
	constructor(){
		this.model = new model();
		view.instance();
	}

	run(){
		//view.instance().draw();
        document.getElementById("dice_number").innerHTML = "0";

        document.getElementById("roll").onclick = function(){
            document.getElementById("dice_number").innerHTML = "...";
            window.setTimeout(function() {this.model.setNewDiceNumber(document.getElementById("dice_number"))}, 500);
        };
	}
}