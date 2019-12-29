class view{
	instance_ = null;
	constructor(){
		this.canvas = document.getElementById("myCanvas");
		this.canvas.onmousedown = this.mouseDown;
		this.canvas.onmouseup = this.mouseUp;
		this.ctx = this.canvas.getContext("2d");

		this.Xcenter = 370;
		this.Ycenter = 250;
		this.size = 40;
		this.size_2 = 154;
		this.numberOfSides = 6;
		this.allow_drag = false;

		this.x = this.Xcenter;
		this.y = this.Ycenter;

		setInterval(this.draw, 10);
	}


	drawCircle(radius, color) {
		var ctx = this.ctx
		var saved_color = ctx.fillStyle;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(this.Xcenter, this.Ycenter, radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.fillStyle = saved_color;
	}


	drawHexagon(){
		var ctx = this.ctx
		ctx.beginPath();
		ctx.moveTo(this.Xcenter +  this.size * Math.cos(0), this.Ycenter +  this.size *  Math.sin(0));          
		for (var i = 1; i <= this.numberOfSides;i += 1) {
		  ctx.lineTo (this.Xcenter + this.size * Math.cos(i * 2 * Math.PI / this.numberOfSides), this.Ycenter + this.size * Math.sin(i * 2 * Math.PI / this.numberOfSides));
		}
		ctx.fill();
		ctx.stroke();
	}


	drawSegments(){
		var ctx = this.ctx
		var angle = Math.PI / this.numberOfSides;
		for(var i = 0; i < this.numberOfSides; ++i){
			ctx.beginPath();
			ctx.setTransform(1, 0, 0, 1, this.Xcenter + this.size * Math.cos(2 * i * angle), this.Ycenter + this.size * Math.sin(2 * i * angle));
			ctx.moveTo(0, 0)
			ctx.lineTo(this.size_2 * Math.cos(((2 * i) + 1) * angle), this.size_2 * Math.sin(((2 * i) + 1) * angle))
			ctx.setTransform(1, 0, 0, 1, this.Xcenter + this.size * Math.cos(((2 * i) + 2) * angle), this.Ycenter + this.size * Math.sin(((2 * i) + 2) * angle));
			ctx.lineTo(this.size_2 * Math.cos(((2 * i) + 1) * angle), this.size_2 * Math.sin(((2 * i) + 1) * angle))
			ctx.lineTo(0, 0)
			ctx.closePath();
			ctx.fill()
			ctx.stroke();
		}
	}


	drawPlayers(){
		var ctx = this.ctx;
		//todo draw players
		ctx.resetTransform();
		ctx.fillStyle = "#222222";
		ctx.beginPath();
		ctx.rect(this.x - 15, this.y - 15, 30, 30);
		ctx.closePath();
		ctx.fill();
	}


	draw(){
		var v = view.instance();
		var ctx = v.ctx
		ctx.resetTransform();
		ctx.fillStyle = "#4d4d4d";
		ctx.fillRect(0, 0, v.canvas.width, v.canvas.height);
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		v.drawCircle(240, "white");
		v.drawCircle(190, "#4d4d4d");
		v.drawHexagon();
		v.drawSegments();
		v.drawPlayers();
	}


	mouseDown(e){
		var v = view.instance();
		if(e.pageX < v.x + 15 + v.canvas.offsetLeft && e.pageX > v.x - 15 + v.canvas.offsetLeft 
			&& e.pageY < v.y + 15 + v.canvas.offsetTop && e.pageY > v.y -15 + v.canvas.offsetTop){

			v.x = e.pageX - v.canvas.offsetLeft;
			v.y = e.pageY - v.canvas.offsetTop;
			v.allow_drag = true;
			v.canvas.onmousemove = v.mouseMove;
		}
	}


	mouseUp(e){
		var v = view.instance();
		v.allow_drag = false;
 		v.canvas.onmousemove = null;
	}


	mouseMove(e){
		var v = view.instance();
		if(v.allow_drag){
			v.x = e.pageX - v.canvas.offsetLeft;
			v.y = e.pageY - v.canvas.offsetTop;
		}
	}


	static instance(){
		if(view.instance_ == null){
			view.instance_ = new view();
			return view.instance_;
		}
		else{
			return view.instance_;
		}
	}
}	