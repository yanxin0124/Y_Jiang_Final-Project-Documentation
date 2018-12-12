//Fog
function Fog(){
	var x = random(-5000, -100); 
	var y = random(-height, height - 30); 
	this.position = createVector(x, y); //where fog start appearing
	this.velocity = 2; //how fast fog move
	this.fogLength = random(150, 300);
	this.fogHeight = random(60, 100); 
	this.opacity = random(2, 6);
	
	//Function Draw
	this.draw = function(){
		fill(color(220, 220, 220, this.opacity)); //see through gray fog
		ellipse(this.position.x, this.position.y, this.fogLength, this.fogHeight);
	} //function draw
	
	//Function Update 
	this.update = function(){
		this.position.add(this.velocity);
		if(this.position.x > width + 200){ //fog finishes floating across screen
			fog.splice(this, 1); //takes out fog
		} //fog splice
	} //function update
} //function fog