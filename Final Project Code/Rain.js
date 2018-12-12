//Rain
function Raindrop(){
	this.position = createVector(random(width), random(-10, -100)); //beginning to rain
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 1.5); //raindrop gradually falls faster
	this.size = random(1.4, 1.6); //size of raindrop
	this.length = random(40, 60); //length of raindrop
	this.opacity = random(80, 100);
	this.fade = random(1, 2); //rain fades as it falls
	
	//Function Draw
	this.draw = function(){
		fill(color(255, 255, 255, this.opacity)); //white
		ellipse(this.position.x, this.position.y, this.size, this.size + this.length);
	} //function draw
	
	//Function Update
	this.update = function (){
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.opacity = this.opacity - this.fade; //raindrop fades as it falls
		if(this.position.y > height){
			rain.splice(this, 1); //takes out raindrop after it reaches bottom
		} //raindrop splice 
	} //function update
} //function raindrop