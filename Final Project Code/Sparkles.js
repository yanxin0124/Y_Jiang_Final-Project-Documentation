//Sparkles
class Sparkle{
	//Variables global to class 
	constructor(sparkleX, sparkleY){
		this.sparkleX = sparkleX; 
		this.sparkleY = sparkleY; 
		this.sparkleSize = random(2, 2.4);
		this.shimmerRate = random(10, 20); //amount shimmer level decreases or increases
		this.shimmer = random(20, 50); //starts at random shimmer level
		this.shine;
		this.fade;
		this.opacity;
	} //constructor sparkle
	
	show(){
		noStroke();
		fill(255, 255, 255, 250);
			ellipse(this.sparkleX, this.sparkleY, this.sparkleSize, this.sparkleSize);
	} //show sparkle
	
	update(){
		//Sparkle control
		if(this.shimmer >= 240){
			this.shine = true; 
			this.fade = false;
		}
		if(this.shimmer <= 10){
			this.shine = false;
			this.fade = true;
		}
		//Shimmer control
		if(this.shine){
			this.shimmer = this.shimmer - this.shimmerRate; //if shimmer level is high, sparkle fades
		}
		if(!this.shine){
			this.shimmer = this.shimmer + this.shimmerRate; //if shimmer level is low, sparkle shimmers
		}
	} //update sparkle
} //class sparkle

function createSparkle(){
	var Xsparkle = random(-width, width);
	var Ysparkle = random(height/6 * 4 + 5, height);
	var sparklyWater = new Sparkle(Xsparkle, Ysparkle);
	sparkle.push(sparklyWater);
} //function create sparkle