class controller{
	constructor(){
		this.model = new model();
		this.view = new view();
	}
	run(){
		this.view.draw();
	}
}