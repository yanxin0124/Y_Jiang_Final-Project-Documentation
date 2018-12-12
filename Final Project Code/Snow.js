//Snow
function Snowflake(){
	this.position = createVector(random(-100, width + 100), random(-10, -100)); //beginning to snow
	this.velocity = createVector(0, 2);
	this.acceleration = createVector(0, 0.007); //snowflake gradually falls faster
	this.size = random(4, 5); //size of snowflake
	this.opacity = random(60, 220);
	this.fade = random(0.2, 0.5); //snowflake fades as it falls

	//Function Draw
	this.draw = function(){ //draws single snowflake
		fill(255, 255, 255, this.opacity); //white
		ellipse(this.position.x, this.position.y, this.size, this.size);
	} //function draw
		
	//Function Update
	this.update = function(){
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.opacity = this.opacity - this.fade; //snowflake fades as it falls
		if(this.position.y > height){ 
			snow.splice(this, 1); //takes out snowflake after it reaches bottom
		} //snowflake splice
	} //function update
} //function snowflake