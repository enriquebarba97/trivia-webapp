class view{
	constructor(){
		var canvas = document.getElementById("myCanvas");
		this.ctx = canvas.getContext("2d");

		this.ctx.fillStyle = "#4d4d4d";
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.ctx.fillStyle = "white";
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 3;

		this.Xcenter = 370;
		this.Ycenter = 250;
		this.size = 40;
		this.size_2 = 153;
		this.numberOfSides = 6;
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


	draw(){
		this.drawCircle(240, "white");
		this.drawCircle(190, "#4d4d4d");
		this.drawHexagon();
		this.drawSegments();
	}
}	