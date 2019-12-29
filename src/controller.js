class controller{
	instance_ = null;
	constructor(){
        document.getElementById("dice_number").innerHTML = "0";
        document.getElementById("roll").onclick = this.roll_die;
	}


	roll_die(){
        document.getElementById("dice_number").innerHTML = "...";
        window.setTimeout(function() {model.instance().setNewDiceNumber(document.getElementById("dice_number"))}, 500);
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