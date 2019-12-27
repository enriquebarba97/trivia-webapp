class view{
	constructor(){
		var canvas = document.getElementById("myCanvas");
		this.ctx = canvas.getContext("2d");

		this.ctx.fillStyle = "#4d4d4d";
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.ctx.fillStyle = "white";
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 3;
	}


	drawCircle1() {
		var ctx = this.ctx
		ctx.beginPath();
		ctx.arc(370,250,240,0,2*Math.PI);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.stroke();
	}


	drawCircle2() {
		var ctx = this.ctx
		ctx.beginPath();
		ctx.arc(370,250,190,0,2*Math.PI);
		ctx.fillStyle = "#4d4d4d";
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.stroke();
	}


	drawHexagon(){
		var ctx = this.ctx
		var numberOfSides = 6,
		    size = 40,
		    Xcenter = 370,
		    Ycenter = 250;

		ctx.beginPath();
		ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

		for (var i = 1; i <= numberOfSides;i += 1) {
		  ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
		}
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.stroke();
	}


	drawSegments(){
		var ctx = this.ctx
		var numberOfSides = 6,
		    size = 40,
		    Xcenter = 370,
		    Ycenter = 250;

		ctx.beginPath();

		ctx.moveTo (Xcenter -  size * Math.cos(0), Ycenter +  size *  Math.sin(0)); 

		ctx.lineTo(195,180);
		ctx.lineTo(212,145);
		ctx.lineTo (Xcenter + size * Math.cos(4 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(4 * 2 * Math.PI / numberOfSides));
		ctx.lineTo (Xcenter -  size * Math.cos(0), Ycenter +  size *  Math.sin(0));


		ctx.fillStyle = "white";
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.closePath();
	}


	drawSegments2(){
		var ctx = this.ctx
		var numberOfSides = 6,
		    size = 40,
		    Xcenter = 370,
		    Ycenter = 250;

		ctx.beginPath();
		ctx.moveTo (Xcenter + size * Math.cos(4 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(4 * 2 * Math.PI / numberOfSides)); 
		ctx.lineTo(Xcenter + size * Math.cos(4 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(4 * 2 * Math.PI / numberOfSides)- 154);
		ctx.lineTo(Xcenter + size * Math.cos(4 * 2 * Math.PI / numberOfSides)+40, Ycenter + size * Math.sin(4 * 2 * Math.PI / numberOfSides)- 154);
		ctx.lineTo(Xcenter + size * Math.cos(5 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(5 * 2 * Math.PI / numberOfSides));
		ctx.lineTo (Xcenter + size * Math.cos(4 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(4 * 2 * Math.PI / numberOfSides)); 

		ctx.fillStyle = "white";
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.closePath();
	}


	drawSegments3(){
		var ctx = this.ctx
		var numberOfSides = 6,
		    size = 40,
		    Xcenter = 370,
		    Ycenter = 250;

		ctx.beginPath();
		ctx.moveTo (Xcenter + size * Math.cos(5 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(5 * 2 * Math.PI / numberOfSides)); 
		ctx.lineTo(528,145);
		ctx.lineTo(548,180);
		ctx.lineTo(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
		ctx.lineTo (Xcenter + size * Math.cos(5 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(5 * 2 * Math.PI / numberOfSides)); 

		ctx.fillStyle = "white";
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.closePath();
	}


	drawSegments4(){
		var ctx = this.ctx
		var numberOfSides = 6,
		    size = 40,
		    Xcenter = 370,
		    Ycenter = 250;

		ctx.beginPath();
		ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0)); 
		ctx.lineTo(548,317);
		ctx.lineTo(525,360);
		ctx.lineTo(Xcenter + size * Math.cos(1 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(1 * 2 * Math.PI / numberOfSides));
		ctx.lineTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0)); 

		ctx.fillStyle = "white";
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.closePath();
	}


	drawSegments5(){
		var ctx = this.ctx
		var numberOfSides = 6,
		    size = 40,
		    Xcenter = 370,
		    Ycenter = 250;

		ctx.beginPath();
		ctx.moveTo (Xcenter + size * Math.cos(1 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(1 * 2 * Math.PI / numberOfSides)); 
		ctx.lineTo(Xcenter + size * Math.cos(1 * 2 * Math.PI / numberOfSides), Xcenter + size * Math.cos(1 * 2 * Math.PI / numberOfSides)+48);
		ctx.lineTo(Xcenter + size * Math.cos(2 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(2 * 2 * Math.PI / numberOfSides)+153);
		ctx.lineTo(Xcenter + size * Math.cos(2 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(2 * 2 * Math.PI / numberOfSides));
		ctx.lineTo (Xcenter + size * Math.cos(1 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(1 * 2 * Math.PI / numberOfSides)); 

		ctx.fillStyle = "white";
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.closePath();
	}


	drawSegments6(){
		var ctx = this.ctx
		var numberOfSides = 6,
		    size = 40,
		    Xcenter = 370,
		    Ycenter = 250;

		ctx.beginPath();
		ctx.moveTo (Xcenter + size * Math.cos(2 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(2 * 2 * Math.PI / numberOfSides)); 
		ctx.lineTo(215,360);
		ctx.lineTo(192,317);
		ctx.lineTo(Xcenter + size * Math.cos(3 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(3 * 2 * Math.PI / numberOfSides));
		ctx.lineTo (Xcenter + size * Math.cos(2 * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(2 * 2 * Math.PI / numberOfSides)); 

		ctx.fillStyle = "white";
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.closePath();
	}


	drawSegments6_2(){
		var ctx = this.ctx
		var size = 40,
			size_2 = 153,
		    Xcenter = 370,
		    Ycenter = 250,
		    angle = Math.PI / 6;

		ctx.setTransform(1, 0, 0, 1, Xcenter + size * Math.cos(4 * angle), Ycenter + size * Math.sin(4 * angle));
		ctx.moveTo(0, 0)
		ctx.lineTo(size_2 * Math.cos(5 * angle), size_2 * Math.sin(5 * angle))
		ctx.stroke();

		ctx.setTransform(1, 0, 0, 1, Xcenter + size * Math.cos(6 * angle), Ycenter + size * Math.sin(6 * angle));
		ctx.moveTo(0, 0)
		ctx.lineTo(size_2 * Math.cos(5 * angle), size_2 * Math.sin(5 * angle))
		ctx.stroke();

		ctx.fill()
	}


	draw(){
		this.drawCircle1();
		this.drawCircle2();
		this.drawHexagon();
		this.drawSegments();
		this.drawSegments2();
		this.drawSegments3();
		this.drawSegments4();
		this.drawSegments5();
		//this.drawSegments6();
		this.drawSegments6_2();
	}
}	