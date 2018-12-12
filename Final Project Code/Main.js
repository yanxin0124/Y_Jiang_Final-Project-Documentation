//***************************
//* Final Project by Yanxin *
//***************************
//Global Variables
//Uploaded files
var fontBlogger;
var weatherIcon;
var snowflakeIcon;
var raindropIcon;
var cloudIcon;
var resetIcon;
var lotusLeft;
var lotusRight;
var lilypadLeft;
var lilypadRight;
var land;
var pianoMusic; //from "https://www.youtube.com/watch?v=lCOF9LN_Zxs&t=1873s"
var musicNote;
var treeLight;
var treeDark;
//Data
var temperature = '';
var condition = '';
var region = '';
var timeAndDate = '';
let star = []; //refer to "Stars"
var shootingStarX = -5;
var shootingStarY = 20;
let sparkle = [];
var gradientStep = 500; //for gradient colors
var lightsOn;
//Weather
let snow = []; //refer to "Snow"
var snowAmount = 550;
var snowing;
let fog = []; //refer to "Fog"
var fogAmount = 500;
var foggy;
let rain = []; //refer to "Rain"
var rainAmount = 3000;
var raining;
let clouds = []; //refer to "Clouds"
var cloudsAmount = 2000;
var cloudy;
//Time of day
var sunrise;
var daylight;
var sunset;
var night;
//Control Panel
var rainStatus; //button 1
var rainOn;
var snowStatus; //button 2
var snowOn;
var cloudsStatus; //button 3
var cloudsOn;
var lightbulbStatus; //button 4
var lightbulbOn;
var musicStatus; //button 5 
var musicOn;
// var sunriseStatus; //button 5
// var sunriseOn;
// var daylightStatus; //button 6
// var daylightOn;
// var sunsetStatus; //button 7
// var sunsetOn;
// var nightStatus; //button 8
// var nightOn;
//*********************************************************************
//Function Preload
function preload(){
	//Fonts
	fontBlogger = loadFont('Blogger_Sans-Medium.otf'); //font for data
	//Images
	weatherIcon = loadImage('https://cdn.apixu.com/weather/64x64/day/113.png'); //loads weather icon
	snowflakeIcon = loadImage('snowflake.png'); //loads snowflake icon
	raindropIcon = loadImage('raindrop.png'); //loads raindrop icon
	cloudIcon = loadImage('cloud.png'); //loads cloud icon
	lightbulbIcon = loadImage('lightbulb.png'); //loads lightbulb icon
	bridge = loadImage('bridge.png'); //loads bridge
	resetIcon = loadImage('reset.png'); //loads reset icon
	lotusLeft = loadImage('lotusLeft.png'); //loads flower facing left
	lotusRight = loadImage('lotusRight.png'); //loads flower facing right
	lilypadLeft = loadImage('lilypadLeft.png'); //loads lilypad facing left
	lilypadRight = loadImage('lilypadRight.png'); //loads lilypad facing right
	land = loadImage('land.png'); //loads land
	musicNote = loadImage('musicNote.png'); //loads music note icon
	treeLight = loadImage('treeLight.png'); //loads tree light	
	treeDark = loadImage('treeDark.png'); //loads tree dark
	
	//Sounds
	rainSound = loadSound('Rain.mp3'); //plays rain sounds
	onSound = loadSound('On.mp3'); //plays on sound
	offSound = loadSound('Off.mp3'); //plays off sound
	pianoMusic = loadSound('Piano.wav'); //plays piano music
} //function preload
//Function Setup

function setup(){
	createCanvas(1350, 600); //size of window frame
	background(30); //light black
	
	//Audio
	//Rain sound
	if(raining == true){
		rainSound.loop = true; //loops rain sound
	} //rain sound if raining
	
	//Data retrieval
	getData(); //refer to "Data"
	setInterval(getData, 5000); //updates data every 5 seconds
} //function setup
//*********************************************************************
function getData(){
	var url = 'https://api.apixu.com/v1/current.json?';
  var key = 'key=f44510b5ba154816b7601540172011';
  var NYC = '&q=NYC';
	var locations = [NYC]; //array of different locations
	var call = url + key + locations; //gets information from API
	loadJSON(call, gotData); 
} //function get data

function gotData(data){ //creates variables out of selected information from API
	temperature = data.current.temp_f; 
	condition = data.current.condition.text;
	region = data.location.name;
	timeAndDate = data.location.localtime;
	icon = loadImage("https://" + data.current.condition.icon);
} //function got data
//*********************************************************************
//Function Draw
function draw(){

	// //Mouse GPS
	// if(mouseIsPressed){ 
	// print("  X:"); 
	// print(mouseX);
	// print("  Y:");
	// print(mouseY);
	// } //mouse GPS

	//Date
	var splitTimeAndDate = split(timeAndDate, ' '); //time and date are split into different pieces
	var date = splitTimeAndDate[0]; //variable holds date
	var splitDate = split(date, '-'); //year, month, and day are split into different pieces
	var day = splitDate[2]; //variable holds day
	var month = splitDate[1]; //variable holds month
	var year = splitDate[0]; //variable holds year
	//Time of Day
	var time = splitTimeAndDate[1]; //variable holds time
	if(time){ //defines time
		var splitTime = split(time, ':'); //hour and minute are split into different pieces
		var minute = parseInt(splitTime[1]); //variable holds minute
		if(minute < 10){ //fixes single digit problem
			minute = "0" + minute;
		} //fixes single digit problem
		var hour = parseInt(splitTime[0]); //variable holds hour
		
		//Time of day
		//Sunrise
		//Winter sunrise time
		if(month == 12 || month == 1 || month == 2){ //December, January, February
			if(hour == 7){ //sunrise is at 7am for winter months
				sunrise = true;
			} //identifies winter sunrises
		} //identifies winter months
	
		//Spring sunrise time
		if(month == 3 || month == 4 || month == 5){ //March, April, May
			if(hour == 6){ //sunrise is at 6am for spring months
				sunrise = true;
			} //identifies spring sunrises
		} //identifies spring months
		
		//Summer sunrise time
		if(month == 6 || month == 7 || month == 8){ //June, July, August
			if(hour == 5){ //sunrise is at 5am for summer months
				sunrise = true;
			} //identifies summer sunrises
		} //identifies summer months
		
		//Autumn sunrise time
		if(month == 9 || month == 10 || month == 11){ //September, October, November
			if(hour == 6){ //sunrise is at 6am for autumn months
				sunrise = true;
			} //identifies autumn sunrises
		} //identifies autumn months
		
		//Daylight
		//Winter daylight time
		if(month == 12 || month == 1 || month == 2){ //December, January, February
			if(hour > 7 && hour <= 15){ //daylight is from 8am to 3pm for winter months
				daylight = true;
			} //identifies winter daylights
		} //identifies winter months
		
		//Spring daylight time
		if(month == 3 || month == 4 || month == 5){ //March, April, May
			if(hour > 6 && hour <= 18){ //daylight is from 7am to 6pm for spring months
				daylight = true;
			} //identifies spring daylights
		} //identifies spring months
		
		//Summer daylight time
		if(month == 6 || month == 7 || month == 8){ //June, July, August
			if(hour > 5 && hour <= 19){ //daylight is from 6am to 7pm for summer months
				daylight = true;
			} //identifies summer daylights
		} //identifies summer months

		//Autumn daylight time
		if(month == 9 || month == 10 || month == 11){ //September, October, November
			if(hour > 6 && hour <= 19){ //daylight is from 7am to 7pm for autumn months
				daylight = true;
			} //identifies autumn daylights
		} //identifies autumn months
		
		//Sunset
		//Winter sunset time
		if(month == 12 || month == 1 || month == 2){ //December, January, February
			if(hour == 16){ //sunset is 4pm for winter months
				sunset = true;
			} //identifies winter sunsets
		} //identifies winter months
		
		//Spring sunset time
		if(month == 3 || month == 4 || month == 5){ //March, April, May
			if(hour == 19){ //sunset is 7pm for spring months
				sunset = true;
			} //identifies spring sunsets
		} //identifies spring months
		
		//Summer sunset time
		if(month == 6 || month == 7 || month == 8){ //June, July, August
			if(hour == 20){ //sunset is 8pm for summer months
				sunset = true;
			} //identifies summer sunsets
		} //identifies summer months
		
		//Autumn sunset time
		if(month == 9 || month == 10 || month == 11){ //September, October, November
			if(hour == 18){ //sunset is 6pm for autumn months
				sunset = true;
			} //identifies autumn sunsets
		} //identifies autumn months
		
		//Night
		if(hour == 24 || hour == 0 || hour == 1){ //fixes script bug
			night = true;
		} //fixes script bug
		
		//Winter night time
		if(month == 12 || month == 1 || month == 2){ //December, January, February
			if(hour > 16 && hour < 24){ //night starts at 5pm for winter months
				night = true;
			} //night 5pm start
			if(hour > 1 && hour < 7){ //night ends at 6am for winter months
				night = true;
			} //night 6am end
		} //identifies winter months
		
		//Spring night time
		if(month == 3 || month == 4 || month == 5){ //March, April, May
			if(hour > 19 && hour < 24){ //night starts at 8pm for spring months
				night = true;
			} //night 8pm start
			if(hour > 1 && hour < 6){ //night ends at 5am for spring months
				night = true;
			} //night 5am end
		} //identifies spring months
		
		//Summer night time
		if(month == 6 || month == 7 || month == 8){ //June, July, August
			if(hour > 20 && hour < 24){ //night starts at 9pm for summer months
				night = true;
			} //night 9pm start
			if(hour > 1 && hour < 5){ //night ends at 4am for summer months
				night = true;
			} //night 4am end
		} //identifies summer months
		
		//Autumn night time
		if(month == 9 || month == 10 || month == 11){ //September, October, November
			if(hour > 18 && hour < 24){ //night starts at 7pm for autumn months
				night = true;
			} //night 7pm start
			if(hour > 1 && hour < 6){ //night ends at 5am for autumn months
				night = true;
			} //night 5am end
		} //identifies autumn months

	//Background according to time of day and light toggle
	noStroke();
		for(var i = 0; i < gradientStep; i++){ //gradient color
			var lerpDegree = i/gradientStep //lerp percentage from start color to end color

			//Sunrise background
			if(sunrise == true){
				var startColor = color(255, 119, 110); //coral
				var endColor = color(255, 218, 210); //light orange
				if(mouseX < 22 && mouseY < 22){ //reset trigger
					lightsOn = false; //turns lights off
					lightbulbOn = false; //turns button off
				} else { //real time status
					mousePressed();
				} //lights not on at sunrise
			} //sunrise
			
			//Daylight background
			if(daylight == true){
				if(raining == true || snowing == true || foggy == true || cloudy == true){
					var startColor = color(46, 103, 153); //dark cyan
					var endColor = color(167, 202, 255); //light blue
				} else { //if raining, snowing, foggy, or cloudy, darker sky
					var startColor = color(167, 202, 255); //blue
					var endColor = color(210, 228, 255); //light blue
				} //if not raining, snowing, foggy, or cloudy, brighter sky
				if(mouseX < 22 && mouseY < 22){ //reset trigger
					lightsOn = false; //turns lights off
					lightbulbOn = false; //turns button off
				} else { //real time status
					mousePressed();
				} //lights not on at daylight
			} //daylight
	
			//Sunset background
			if(sunset == true){
				var startColor = color(62, 91, 127); //dull blue
				var endColor = color(102, 151, 212); //blue
				if(mouseX < 22 && mouseY < 22){ //reset trigger
					lightsOn = true; //turns lights on
					lightbulbOn = true; //turns button on
				} else { //real time status
					mousePressed(); 
				} //lights on at sunset
			} //sunset background

			//Night background
			if(night == true){
				var startColor = color(0, 9, 25); //black
				var endColor = color(41, 75, 120); //dull blue
				if(mouseX < 22 && mouseY < 22){ //reset trigger
					lightsOn = true; //turns lights on
					lightbulbOn = true; //turns button on
				} else { //real time status
					mousePressed(); 
				} //toggle lights
			} //night background
			
			//Sky canvas
			var currentColor = lerpColor(startColor, endColor, lerpDegree);
			var fragmentHeight = height/gradientStep;
			fill(currentColor);
			rect(0, i*fragmentHeight, width, height); 
		} //gradient color	
		
		//Stars
		if(night == true || sunset == true){
			if(!raining || !snowing){ 
				createStar(); //refer to "Stars"
				for(var i = 0; i < star.length; i = i + 1){ //keeps adding single star
				star[i].show();
				star[i].update();
				if(star[i].dim)
					star.splice(i, 1); //deletes dimmed stars 
				} //stars 
				//Shooting star
				var shootingStarOpacity = random(180, 200);
				var fade = 100;
				fade = fade + 50;
				noStroke();
				fill(255, 255, 255, shootingStarOpacity - fade); //white
				ellipse(shootingStarX, shootingStarY, 2, 2); //draws star
				triangle(shootingStarX, shootingStarY - 2, shootingStarX, shootingStarY + 2, shootingStarX - 40, shootingStarY - 12); //star tail
				shootingStarX += 250; //moves star across sky
				shootingStarY += 35;
				if(shootingStarX > width + 100){ //star boundaries
					shootingStarX = random(-2000, 500); //new shooting star position
					shootingStarY = random(-1200, 50);
				} //loops shooting star
			} //stars when not raining or snowing
		} //stars when night or sunset
	
		//Water
		noStroke();
		for(var i = 0; i < gradientStep; i++){
			var lerpDegree = i/gradientStep //lerp percentage from start color to end color

			//Sunrise water
			if(sunrise == true){
				var startColor = color(255, 218, 210); //light orange
				var endColor = color(255, 20, 0); //red
			} //water at sunrise

			//Daylight water
			if(daylight == true){
				if(temperature <= 32){ //water frozen on or below 32 degrees
					var startColor = color(208, 233, 255); //icy blue
					var endColor = color(0, 44, 94); //dark blue
				} //frozen water 
				if(temperature > 32){ //normal water
					var startColor = color(159, 197, 255); //light blue
					var endColor = color(0, 44, 94); //dark blue
				} //water above 32 degrees
			} //water at daylight

			//Sunset water
			if(sunset == true){
				var startColor = color(73, 106, 166); //blue
				var endColor = color(10, 15, 23); //dark cyan
			} //water at sunset

			//Night water
			if(night == true){
				if(temperature <=32){ //water frozen on or below 32 degrees
					var startColor = color(7, 27, 76); //turquoise
					var endColor = color(0); //black
				} //frozen water
				if(temperature > 32){ //normal water
					var startColor = color(0, 25, 69); //dark navy blue
					var endColor = color(0); //black
				} //water above 32 degrees
			}  //water at night
		
		//Water canvas
		var currentColor = lerpColor(startColor, endColor, lerpDegree);
		var fragmentHeight = i/gradientStep;
		fill(currentColor);
		rect(0, i*fragmentHeight + height/6 * 4, width, height);	
		} //water
		
		//Sparkles
		if(night == false || sunset == false || sunrise == true || daylight == true){
			createSparkle(); //refer to "Sparkles" tab
			for(var sprk = 0; sprk < sparkle.length; sprk++){
				sparkle[sprk].show();
				sparkle[sprk].update();
				if(sparkle[sprk].fade)
					sparkle.splice(sprk, 1);
			} //sparkles
		} //sparkles don't show at night, distracts from stars
		
		//Water Decorations	
		//Lilypad
		image(lilypadLeft, width/2 - 140, height/2 + 100, lilypadLeft.width/8, lilypadLeft.height/16); //bridge right
		image(lilypadRight, width/2 - 180, height/2 + 105, lilypadRight.width/8, lilypadRight.height/16); //bridge 2nd to right
		image(lilypadRight, width/2 - 400, height/2 + 130, lilypadLeft.width/6, lilypadLeft.height/9); //bridge left
		image(lilypadLeft, width/2 - 330, height/2 + 150, lilypadLeft.width/5, lilypadLeft.height/7); //bridge left
		image(lilypadRight, width/2 - 720, height/2 + 180, lilypadRight.width/3.5, lilypadRight.height/4); //bottom left
		image(lilypadLeft, width/2 - 810, height/2 + 160, lilypadLeft.width/3.5, lilypadLeft.height/4); //bottom most left
		image(lilypadLeft, width/2 - 740, height/2 + 195, lilypadLeft.width/4, lilypadLeft.height/5); //bottom most left bottom
		image(lilypadLeft, width/2 - 90, height/2 + 205, lilypadLeft.width/4, lilypadLeft.height/6); //bottom middle facing left
		image(lilypadRight, width/2 + 80, height/2 + 175, lilypadRight.width/4, lilypadRight.height/6); //bottom middle facing right
		image(lilypadLeft, width/2 + 380, height/2 + 135, lilypadLeft.width/6, lilypadLeft.height/9); //bottom right of land
		image(lilypadRight, width/2 - 450, height/2 + 215, lilypadRight.width/3.5, lilypadRight.height/5.2); //bottom left of control box
		image(lilypadRight, width/2 + 460, height/2 + 110, lilypadRight.width/8, lilypadRight.height/17); //right top
		image(lilypadLeft, width/2 + 540, height/2 + 130, lilypadLeft.width/8, lilypadLeft.height/13); //right 2nd to top
		image(lilypadRight, width/2 + 220, height/2 + 240, lilypadRight.width/3.5, lilypadRight.height/4); //bottom right
		image(lilypadRight, width/2 + 500, height/2 + 185, lilypadRight.width/3.5, lilypadRight.height/6); //most right cut off
		
		//Lotus
		image(lotusRight, width/2 - 650, height/2 + 160, lotusRight.width/5.5, lotusRight.height/5.5); //bottom left
		image(lotusLeft, width/2 - 92, height/2 + 87, lotusLeft.width/14, lotusLeft.height/14); //under bridge
		image(lotusRight, width/2 + 450, height/2 + 118, lotusRight.width/10, lotusRight.height/10); //bottom right of land
		
		//Land
		image(land, width/2 - 1230, height/2 - 87, land.width/7, land.height/14); //right land
		image(land, width/2 - 130, height/2 - 55, land.width/10, land.height/16); //center land
		
		//Tree
		if(sunrise == true || daylight == true){
			image(treeLight, width/2 + 40, height/2 - 300, treeLight.width/10, treeLight.height/10.4); 
		} //brightness adjustment for sunrise and daylight
		if(sunset == true || night == true){
			image(treeDark, width/2 + 40, height/2 - 300, treeDark.width/10, treeDark.height/10.4); 
		} //brightness adjustment for sunset and night
		//************************************************** Data **************************************************
		//Condition
		fill(200); //gray
		console.log(condition); //lists current condition in code's console
	
		//Weather Identification
		//Rain
		if(condition == "Light rain" || "Moderate rain"){
			raining = true;
		} //identifies rain from API

		//Fog
		if(condition == "Mist"){
			foggy = true;
		} //identifies foggy from API

		//Snow
		if(condition == "Light snow" || "Moderate snow"){
			snowing = true;
		} //identifies snow from API

		//Cloudy
		if(condition == "Overcast" || "Partly cloudy" ){
			cloudy = true;
		} //identifies cloudy from API

		//Clear
		if(condition == "Clear" || "Sunny"){
			clear = true;
		} //identifies clear from API
		if(clear == true){
			cloudy = false;
			foggy = false;
			snowing = false;
			raining = false;
		} //clear weather is clear

		//Information display
		//Icon
		//image(weatherIcon, width/50 * 47, height/20 * 2); //placement of icon

		//Temperature
		textAlign(CENTER, CENTER);
		textFont(fontBlogger);
		if(night == true || sunset == true){ 
			fill(255); //white
		} //makes text visible in night/sunset background
		if(daylight == true || sunrise == true){
			fill(20); //dark gray
		} //makes text visible in daylight/sunrise background
		textSize(26);
		text(round(temperature) + "°", width/50 * 48, height/20); //placement of temperature rounded to nearest degree text

		//Region
		textAlign(CENTER, CENTER);
		if(night == true || sunset == true){ 
			fill(200); //gray
		} //makes text visible in night/sunset background
		if(daylight == true || sunrise == true){
			fill(40); //dark gray
		} //makes text visible in daylight/sunrise background
		textSize(14);
		text(region, width/50 * 48, height/12); //placement of region text
	
		//Date
		//Single digit date alteration
		if(day == "01"){
			day = "1"
		} //1st of month
		if(day == "02"){
			day = "2"
		} //2nd of month
		if(day == "03"){
			day = "3"
		} //3rd of month
		if(day == "04"){
			day = "4"
		} //4th of month
		if(day == "05"){
			day = "5"
		} //5th of month
		if(day == "06"){
			day = "6"
		} //6th of month
		if(day == "07"){
			day = "7"
		} //7th of month
		if(day == "08"){
			day = "8"
		} //8th of month
		if(day == "09"){
			day = "9"
		} //9th of month
		//Month name alteration
		if(month == "1"){ 
			month = "January"
		} //month of January
		if(month == "2"){ 
			month = "February"
		} //month of February
		if(month == "3"){ 
			month = "March"
		} //month of March
		if(month == "4"){ 
			month = "April"
		} //month of April
		if(month == "5"){ 
			month = "May"
		} //month of May
		if(month == "6"){ 
			month = "June"
		} //month of June
		if(month == "7"){ 
			month = "July"
		} //month of July
		if(month == "8"){ 
			month = "August"
		} //month of August
		if(month == "9"){ 
			month = "September"
		} //month of September
		if(month == "10"){ 
			month = "October"
		} //month of October
		if(month == "11"){ 
			month = "November"
		} //month of November
		if(month == "12"){ 
			month = "December"
		} //month of December
		textAlign(CENTER, CENTER);
		if(night == true || sunset == true){ 
			fill(200); //gray
		} //makes text visible in night/sunset background
		if(daylight == true || sunrise == true){
			fill(40); //dark gray
		} //makes text visible in daylight/sunrise background
		textSize(16); 
		text(month + ' ' + day + ',' + ' ' + year, width/50 * 46.5, height/20 * 19); //placement of date text

		//Time
		textAlign(CENTER, CENTER);
		if(night == true || sunset == true){ 
			fill(255); //white
		} //makes text visible in night/sunset background
		if(daylight == true || sunrise == true){
			fill(20); //dark gray
		} //makes text visible in daylight/sunrise background
		textSize(46);
		//Changes time from 24-hour clock to 12-hour
		if(hour == 0){
			hour = "12";
		} //12am
		if(hour == 13){
			hour = "1";
		} //1pm
		if(hour == 14){
			hour = "2";
		} //2pm
		if(hour == 15){
			hour = "3";
		} //3pm
		if(hour == 16){
			hour = "4";
		} //4pm
		if(hour == 17){
			hour = "5";
		} //5pm
		if(hour == 18){
			hour = "6";
		} //6pm
		if(hour == 19){
			hour = "7";
		} //7pm
		if(hour == 20){
			hour = "8";
		} //8pm
		if(hour == 21){
			hour = "9";
		} //9pm
		if(hour == 22){
			hour = "10";
		} //10pm
		if(hour == 23){
			hour = "11";
		} //11pm
		if(hour == 24){
			hour = "12";
		} //12pm
		text(hour + ':' + minute + " ", width/50 * 46.5, height/20 * 18); //12-hour clock, placement of time text
	} //defines time
	//Depedents on time
	
	//Bridge lights
	if(lightsOn){
		noStroke();
		var radius = random(60, 62); //creates subtle glow effect
		var fragmentRadius = radius/gradientStep;
		var opacity; //creates flicker effect

		//Glow
		for(var i = gradientStep; i > 0; i--){
			if(sunset == true){
				opacity = random(1, 3);
			} //glow intensity at sunset
			if(night == true){
				opacity = random(1, 2.1);
			} //glow intensity at night
			if(daylight == true || sunrise == true){
				opacity = random(1, 2);
			} //glow intensity at daylight and sunrise
			var lerpDegree = i/gradientStep;
			var startColor = color(247, 236, 109, opacity); //yellow
			var endColor = color(247, 236, 153, opacity); //pale yellow
			var currentColor = lerpColor(startColor, endColor, lerpDegree);
			var currentRadius = i*fragmentRadius
			if(night == true || sunset == true){
			fill(currentColor);
			ellipse(200, 262 - 4, currentRadius, currentRadius); //back light 1
			ellipse(348, 222 - 4, currentRadius, currentRadius); //back light 2
			ellipse(556, 220 - 4, currentRadius, currentRadius); //back light 3
			ellipse(702, 275 - 4, currentRadius, currentRadius); //back light 4
			ellipse(253, 258 - 4, currentRadius, currentRadius); //front light 1
			ellipse(369, 214 - 4, currentRadius, currentRadius); //front light 2
			ellipse(537, 213 - 4, currentRadius, currentRadius); //front light 3
			ellipse(648, 269 - 4, currentRadius, currentRadius); //front light 4
			} //decides when glow shows
		} //gradient color
		//Lightbulb
		fill(color(247, 236, 101)); //yellow
		ellipse(200, 262, 24, 16); //back light 1
		ellipse(348, 222, 24, 16); //back light 2
		ellipse(556, 220, 24, 16); //back light 3
		ellipse(702, 275, 24, 16); //back light 4
		ellipse(253, 258, 24, 16); //front light 1
		ellipse(369, 214, 24, 16); //front light 2
		ellipse(537, 213, 24, 16); //front light 3
		ellipse(648, 269, 24, 16); //front light 4
	} //lights on at night
	if(!lightsOn){
		fill(134, 138, 143); //grayish
	} //lights not on at daylight
	//Lightbulb
		ellipse(200, 262, 24, 16); //back light 1
		ellipse(348, 222, 24, 16); //back light 2
		ellipse(556, 220, 24, 16); //back light 3
		ellipse(702, 275, 24, 16); //back light 4
		ellipse(253, 258, 24, 16); //front light 1
		ellipse(369, 214, 24, 16); //front light 2
		ellipse(537, 213, 24, 16); //front light 3
		ellipse(648, 269, 24, 16); //front light 4
	//Bridge
	image(bridge, width/8, height/30 * 8, bridge.width/9, bridge.height/10.4); 
	//************************************************** Weather **************************************************
	//Snow
	if(snowing == true){
		if(snow.length <= snowAmount){ //number of snowflakes on screen
			snow.push(new Snowflake()); //refer to "Snow"
		} //snow push
		for(var i = snow.length - 1; i > 0; i--){
			snow[i].draw();
			snow[i].update();
		} //snow array
	} //if snowing
	
	//Rain
	if(raining == true){
		if(rain.length <= rainAmount){ //number of raindrops on screen
			rain.push(new Raindrop()); //refer to "Rain"
		} //rain push
		for(var i = rain.length - 1; i > 0; i--){
			rain[i].draw();
			rain[i].update();
		} //rain array
	} //if raining
	
	//Clouds
	if(cloudy == true){
		if(clouds.length <= cloudsAmount){ //number of clouds on screen
			clouds.push(new Cloud()); //refer to "Clouds"
		} //cloud push
		for(var i = clouds.length - 1; i > 0; i--){
			clouds[i].draw();
			clouds[i].update();
		} //clouds array
	} //if cloudy
	
	//Fog
	if(foggy == true){
		if(fog.length <= fogAmount){ //number of fog on screen
			fog.push(new Fog()); //refer to "Fog"
		} //fog push
		for(var i = fog.lenth - 1; i > 0; i--){
			fog[i].draw();
			fog[i].update();
		} //fog array
	} //if foggy
	//*********************************************** Control Panel ***********************************************
	var outerRing = 30;
	var innerRing = 22;
	var on = color(136, 255, 173); //light green
	var off = color(109, 123, 135); //gray
	
	//Rain
	if(raining == true){
		rainOn = true;
	} //identifies when raining is on
	if(rainOn == true){
		rainSound.loop = true;
		rainSound.play();
		rainStatus = on;
		if(rain.length <= rainAmount){ //number of raindrops on screen
			rain.push(new Raindrop()); //refer to "Rain"
		} //rain push
		for(var i = rain.length - 1; i > 0; i--){
			rain[i].draw();
			rain[i].update();
		} //rain array;
	} //if raining is on, button is green
	if(!rainOn){
		rainStatus = off;
		rainSound.stop();
	} //if raining is not on, button is gray
	
	//Snow
	if(snowing == true){
		snowOn = true;
	} //identifies when snowing is on
	if(snowOn){
		snowStatus = on;
	} //if snowing is on, button is green
	if(!snowOn){
		snowStatus = off;
	} //if snowing is not on, button is gray

	//Cloudy 
	if(clouds == true){
		cloudsOn = true;
	} //identifies when clouds are on
	if(cloudsOn){
		cloudsStatus = on;
	} //if clouds are on, button is green 
	if(!cloudsOn){ 
		cloudsStatus = off;
	} //if clouds are not on, button is gray
	
	//Lightbulb
	if(lightsOn == true){
		lightbulbOn = true;
	} //identifies when lights are on
	if(lightbulbOn){
		lightbulbStatus = on;
	} //if lightbulb is on, button is green
	if(!lightbulbOn){
		lightbulbStatus = off;
	} //if lightbulb is not on, button is gray
	if(mouseIsPressed){ 
		if(mouseX > 37 + 120 && mouseX < 67 + 120 && mouseY > 550 && mouseY < 570){ //lightbulb button
			if(lightbulbOn){
				onSound.play();
			} //on sound
			if(!lightbulbOn){
				offSound.play();
			} //off sound
		} //lightbulb button
	} //mouse is pressed

	//Music
	if(mouseX < 22 && mouseY < 22){ //reset trigger
		musicOn = false; 
		pianoMusic.stop();
	} //reset trigger
	if(pianoMusic.isPlaying == true){
		musicOn = true;
	} //identifies when lights are on
	if(pianoMusic.isPlaying == false){
		musicOn = false;
	} //identifies when lights are not on
	if(musicOn){
		musicStatus = on;
	} //if music is on, button is green
	if(!musicOn){
		musicStatus = off;
	} //if music is off, button is gray
	if(mouseIsPressed){ 
		if(mouseX > 37 + 160 && mouseX < 67 + 160 && mouseY > 550 && mouseY < 570){ //music button
			musicOn = !musicOn;
			if(musicOn == true){
				pianoMusic.loop = true; //loops piano music
				pianoMusic.play(); //plays piano music
			} //piano music on
			if(musicOn == false){
				pianoMusic.stop();
			} //piano music not on
		} //music button
	} //mouse is pressed
	
// 	//Sunrise
// 	if(sunrise == true){
// 		sunriseOn = true;
// 	} //identifies when sunrise
// 	if(sunriseOn){
// 		sunriseStatus = on;
// 	} //if sunrise, button is green
// 	if(!sunriseOn){
// 		sunriseStatus = off;
// 	} //if not sunrise, button is gray
	
// 	//Daylight
// 	if(daylight == true){
// 		daylightOn = true;
// 	} //identifies when daylight
// 	if(daylightOn){
// 		daylightStatus = on;
// 	} //if daylight, button is green
// 	if(!daylightOn){
// 		daylightStatus = off;
// 	} //if not daylight, button is gray
	
// 	//Sunset 
// 	if(sunset == true){
// 		sunsetOn = true;
// 	} //identifies when sunset
// 	if(sunsetOn){
// 		sunsetStatus = on;
// 	} //if sunset, button is green
// 	if(!sunsetOn){
// 		sunsetStatus = off;
// 	} //if not sunset, button is gray
	
// 	//Night
// 	if(night == true){
// 		nightOn = true;
// 	} //identifies when night
// 	if(nightOn){
// 		nightStatus = on;
// 	} //if night, button is green
// 	if(!nightOn){
// 		nightStatus = off;
// 	} //if not night, button is gray

	//Control Box
	if(daylight || sunrise){
		fill(40); //dark gray
	} //if daylight or sunrise
	if(night || sunset){
		fill(30); //light black
	} //if night or sunset
	rect(width/50, height/20 * 18, 210, 40, 10); //control box
		
	//Rain Icon 1
	push();
	rectMode(CENTER);
	fill(rainStatus);
	rect(52, 560, outerRing, outerRing, 10);//outer ring 1
	fill(255); //white
	rect(52, 560, innerRing, innerRing, 8); //inner ring 1
	imageMode(CENTER);
	image(raindropIcon, 52, 560, raindropIcon.width/12, raindropIcon.height/12);
		
	//Snow Icon 2
	fill(snowStatus);
	rect(52 + 40, 560, outerRing, outerRing, 10);//outer ring 2
	fill(255); //white
	rect(52 + 40, 560, innerRing, innerRing, 8); //inner ring 2
	image(snowflakeIcon, 52 + 40, 560, snowflakeIcon.width/22.24, snowflakeIcon.height/22.24); //snowflake icon
	if(snowOn == true){
		if(snow.length <= snowAmount){ //number of snowflakes on screen
			snow.push(new Snowflake()); //refer to "Snow"
		} //snow push
		for(var i = snow.length - 1; i > 0; i--){
			snow[i].draw();
			snow[i].update();
		} //snow array
	} //snow if snow button is on
	
	//Cloud Icon 3
	fill(cloudsStatus);
	rect(52 + 80, 560, outerRing, outerRing, 10);//outer ring 2
	fill(255); //white
	rect(52 + 80, 560, innerRing, innerRing, 8); //inner ring 2
	image(cloudIcon, 52 + 80, 560, cloudIcon.width/35, cloudIcon.height/35); //cloud icon
	if(cloudsOn == true){
		if(clouds.length <= cloudsAmount){ //number of clouds on screen
			clouds.push(new Cloud()); //refer to "Clouds"
		} //cloud push
		for(var i = clouds.length - 1; i > 0; i--){
			clouds[i].draw();
			clouds[i].update();
		} //clouds array
	} //if cloudy
	
	//Lightbulb Icon 4
	fill(lightbulbStatus);
	rect(52 + 120, 560, outerRing, outerRing, 10);//outer ring 2
	fill(255); //white
	rect(52 + 120, 560, innerRing, innerRing, 8); //inner ring 2
	image(lightbulbIcon, 52 + 120, 560, lightbulbIcon.width/22.24, lightbulbIcon.height/22.24); //lightbulb icon
	
	//Music Icon 5
	fill(musicStatus);
	rect(52 + 160, 560, outerRing, outerRing, 10);//outer ring 2
	fill(255); //white
	rect(52 + 160, 560, innerRing, innerRing, 8); //inner ring 2
	image(musicNote, 52 + 160, 559.5, musicNote.width/32, musicNote.height/32); //music note icon
	
// 	//Sunrise Icon 5
// 	fill(sunriseStatus);
// 	rect(52 + 160, 560, outerRing, outerRing, 10);//outer ring 2
// 	fill(255); //white
// 	rect(52 + 160, 560, innerRing, innerRing, 8); //inner ring 2
// 	fill(0);
// 	textSize(21);
// 	text("1", 52 + 160, 559.5); //number 1
	
// 	//Daylight Icon 6
// 	fill(daylightStatus);
// 	rect(52 + 200, 560, outerRing, outerRing, 10);//outer ring 2
// 	fill(255); //white
// 	rect(52 + 200, 560, innerRing, innerRing, 8); //inner ring 2
// 	fill(0);
// 	textSize(21);
// 	text("2", 52 + 200, 559.5); //number 2
	
// 	//Sunset Icon 7
// 	fill(sunsetStatus);
// 	rect(52 + 240, 560, outerRing, outerRing, 10);//outer ring 2
// 	fill(255); //white
// 	rect(52 + 240, 560, innerRing, innerRing, 8); //inner ring 2
// 	fill(0);
// 	textSize(21);
// 	text("3", 52 + 240, 559.5); //number 3
	
// 	//Night Icon 8
// 	fill(nightStatus);
// 	rect(52 + 280, 560, outerRing, outerRing, 10);//outer ring 2
// 	fill(255); //whit;
// 	rect(52 + 280, 560, innerRing, innerRing, 8); //inner ring 2
// 	fill(0);
// 	textSize(21);
// 	text("4", 52 + 280, 559.5); //number 4
 	pop();
	
	//Reset Trigger
	if(sunrise == true || daylight == true){
		fill(255, 255, 255, 225); //white
	} //sunrise and daylight visibility
	if(night == true || sunset == true){
		fill(255, 255, 255, 180); //white
	} //night and sunset visibility
	rect(0, 0, 22, 22, 5);
	push();
	imageMode(CENTER);
	image(resetIcon, 11, 11, resetIcon.width/25, resetIcon.height/25);
	pop();
} //function draw
//*********************************************************************
 function mousePressed(){ //toggle effects
	 
	//Rain button
 	if(mouseX > 37 && mouseX < 67 && mouseY > 550 && mouseY < 570){ //rain button
		rainOn = !rainOn; //turns button on and off
 	} //rain button 1
	 
	//Snow button
	if(mouseX > 37 + 40 && mouseX < 67 + 40 && mouseY > 550 && mouseY < 570){ //snow button
		snowOn = !snowOn; //turns button on and off
	} //snow button 2
	 
	//Cloud button
	if(mouseX > 37 + 80 && mouseX < 67 + 80 && mouseY > 550 && mouseY < 570){ //cloud button
		cloudsOn = !cloudsOn; //turns button on and off
	} //cloud button 3
	 
	//Lightbulb button
	if(mouseX > 37 + 120 && mouseX < 67 + 120 && mouseY > 550 && mouseY < 570){ //lightbulb button
		lightbulbOn = !lightbulbOn; //turns lights on and off
		lightsOn = !lightsOn; //turns button on and off
	} //lightbulb button 4
	 
// 	 //Music button
// 	 if(mouseX > 37 + 160 && mouseX < 67 + 160 && mouseY > 550 && mouseY < 570){ //music button
// 		 musicOn = !musicOn; //turns button on and off
// 	 } //music button 5
	 
// 	//Sunrise button
// 	if(mouseX > 37 + 160 && mouseX < 67 + 160 && mouseY > 550 && mouseY < 570){ //sunrise button
// 		sunriseOn = !sunriseOn; //turns button on and off
// 	} //sunrise button 5
	 
// 	//Daylight button
// 	if(mouseX > 37 + 200 && mouseX < 67 + 200 && mouseY > 550 && mouseY < 570){ //daylight button
// 		daylightOn = !daylightOn; //turns button on and off
// 	} //daylight button 6
	 
// 	//Sunset button
// 	if(mouseX > 37 + 240 && mouseX < 67 + 240 && mouseY > 550 && mouseY < 570){ //sunset button
// 		sunsetOn = !sunsetOn; //turns button on and off
// 	} //sunset button 7
	
// 	//Night button
// 	if(mouseX > 37 + 280 && mouseX < 67 + 280 && mouseY > 550 && mouseY < 570){ //night button
// 		nightOn = !nightOn; //turns button on and off
// 	} //night button 8
 } //function mouse pressed