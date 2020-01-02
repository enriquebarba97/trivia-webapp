class view{
	instance_ = null;
	constructor(){
		this.canvas = document.getElementById("myCanvas");
		this.canvas.onmousedown = this.mouseDown;
		this.canvas.onmouseup = this.mouseUp;
		this.ctx = this.canvas.getContext("2d");

		this.player_size = 15;
		this.border_size = 2;	
		this.Xcenter = 370;
		this.Ycenter = 250;
		this.size = 50;
		this.numberOfSides = 6;
		this.allow_drag = false;
		this.inner_circle_radius = 195;
		this.outer_cirlce_radius = this.inner_circle_radius + this.size;
		
		this.field_colors = ["purple", "green", "yellow", "blue"]
		this.player_colors = ["black", "blue", "green", "red"];

		setInterval(this.draw, 10);

		var turn_and_dice = document.getElementsByClassName("game_on");
		for (var i = 0; i < turn_and_dice.length; i++) {
		  turn_and_dice[i].style.display = "none";
		}
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


	drawOuterFields(){
		var ctx = this.ctx
		var saved_color = ctx.fillStyle;
		var angle = Math.PI / (this.numberOfSides * 5);
		ctx.setTransform(1, 0, 0, 1, this.Xcenter, this.Ycenter);
		for(var i = 0; i < this.numberOfSides; ++i){
			
			for(var j = 0; j < 5; ++j){
				ctx.fillStyle = this.getFieldColor(i, j);
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.lineTo(this.outer_cirlce_radius * Math.cos(((2 * (i * 5 + j)) - 4) * angle), this.outer_cirlce_radius * Math.sin(((2 * (i * 5 + j)) - 4) * angle));
				ctx.lineTo(this.outer_cirlce_radius * Math.cos(((2 * (i * 5 + j)) - 2) * angle), this.outer_cirlce_radius * Math.sin(((2 * (i * 5 + j)) - 2) * angle));
				
				ctx.closePath();
				ctx.fill()
				ctx.stroke();
			}
		}

		ctx.resetTransform();
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
		for(var length = 4; length > 0; length--){
			ctx.fillStyle = this.getFieldColor();
			var segment_length = this.size * length;
			for(var i = 0; i < this.numberOfSides; ++i){
				ctx.fillStyle = this.getFieldColor(i, length);
				ctx.setTransform(1, 0, 0, 1, this.Xcenter + this.size * Math.cos(2 * i * angle), this.Ycenter + this.size * Math.sin(2 * i * angle));
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.lineTo(segment_length * Math.cos(((2 * i) + 1) * angle), segment_length * Math.sin(((2 * i) + 1) * angle));
				ctx.setTransform(1, 0, 0, 1, this.Xcenter + this.size * Math.cos(((2 * i) + 2) * angle), this.Ycenter + this.size * Math.sin(((2 * i) + 2) * angle));
				ctx.lineTo(segment_length * Math.cos(((2 * i) + 1) * angle), segment_length * Math.sin(((2 * i) + 1) * angle));
				ctx.lineTo(0, 0);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
			}
		}

	}


	drawPlayers(){
		var ctx = this.ctx;
		var border = this.border_size;
		ctx.resetTransform();
		for(player of model.instance().players){
			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.rect(player.x - this.player_size - border, player.y - this.player_size - border, this.player_size * 2 + 2 * border, this.player_size * 2 + 2 * border);
			ctx.closePath();
			ctx.fill();
			ctx.fillStyle = player.color;
			ctx.beginPath();
			ctx.rect(player.x - this.player_size, player.y - this.player_size, this.player_size * 2, this.player_size * 2);
			ctx.closePath();
			ctx.fill();
		}
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
		v.drawCircle(v.outer_cirlce_radius, "white");
		v.drawOuterFields();
		v.drawCircle(v.inner_circle_radius, "#4d4d4d");
		v.drawHexagon();
		v.drawSegments();
		v.drawPlayers();
	}


	getFieldColor(offset, index){
		var i = (offset + index) % 4;
		return this.field_colors[i];
	}


	mouseDown(e){
		var v = view.instance();
		var cp = model.instance().current_player;
		if(e.pageX < cp.x + v.player_size + v.canvas.offsetLeft && e.pageX > cp.x - v.player_size + v.canvas.offsetLeft 
			&& e.pageY < cp.y + v.player_size + v.canvas.offsetTop && e.pageY > cp.y -v.player_size + v.canvas.offsetTop){
			cp.x = e.pageX - v.canvas.offsetLeft;
			cp.y = e.pageY - v.canvas.offsetTop;
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
		var cp = model.instance().current_player;
		if(v.allow_drag){
			cp.x = e.pageX - v.canvas.offsetLeft;
			cp.y = e.pageY - v.canvas.offsetTop;
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