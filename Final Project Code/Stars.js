//Stars
class Star{
	//Variables global to class
	constructor(starX, starY){
		this.starX = starX;
		this.starY = starY;
		this.lightLevel = random(50, 100); //star starts at random light level
		this.lightChange = random(5, 8); //random amount light level increases or decreases
		this.bright;
		this.size = random(1.8, 2.5); //size of star
	} //constructor star
	
	show(){
		//Draws star
		noStroke();
		fill(255, 255, 255, this.lightLevel);
		ellipse(this.starX, this.starY, this.size, this.size);
	} //show star
	
	update(){
		//Light level control
		if(this.bright){ 
			this.lightLevel = this.lightLevel - this.lightChange; //if star is bright, star dims
		} //bright light level control
		if(!this.bright){
			this.lightLevel = this.lightLevel + this.lightChange; //if star is dim, star brightens
		} //not bright light level control
		
		//Star light level identification
		if(this.lightLevel >= 240){
			this.bright = true; //identifies bright stars
		} //bright star identification
		if(this.lightLevel <= 10){
			this.bright = false; //identifies not bright stars
		} //not bright star identification
	} //update star
} //class star

function createStar(){
	var Xstar = random(-width * 4, width);
	var Ystar = random(-height * 3, height/6 * 4 - 10);
	var stars = new Star(Xstar, Ystar); //creates a variable with all single stars
	star.push(stars); //repeats single stars to create stars
} //function create star