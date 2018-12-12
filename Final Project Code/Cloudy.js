//Clouds
function Cloud(){
	var x = random(-5000, -100); 
	var y = random(-50, 50); 
	this.position = createVector(x, y); //where clouds start appearing
	this.velocity = 2; //how fast clouds move
	this.cloudLength = random(100, 200);
	this.cloudHeight = random(20, 50); 
	this.opacity = random(0, 20);
	
	//Function Draw
	this.draw = function(){
		fill(color(255, 255, 255, this.opacity)); //see through white cloud
		ellipse(this.position.x, this.position.y, this.cloudLength, this.cloudHeight);
	} //function draw
	
	//Function Update 
	this.update = function(){
		this.position.add(this.velocity);
		if(this.position.x > width + 200){ //cloud finishes floating across screen
			clouds.splice(this, 1); //takes out cloud
		} //clouds splice
	} //function update
} //function cloud