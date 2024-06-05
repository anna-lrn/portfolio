/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/867184

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

//Inspired by Shannon Downey
//https://twitter.com/ShannonDowney/status/1242189972792315912

const USE_MOUSE_AROUND_CENTER = true;

const minMouseDist = 150;
var minDist;

let size, radius, center, font, emojiSize, points, color1, color2;

var emojis = ["+","+","+"];

function setup() {
	
	var p5 = document.getElementById("p5");
	var p5Size = p5.getBoundingClientRect();
	var P5Width = p5Size.width;
	var P5Height = p5Size.height;
	console.log(P5Width + " " + P5Height);
	size = min(P5Width, P5Height)*2;


    let canvas = createCanvas(size, size); 
    canvas.parent('#canvas-container'); 
	
	center = createVector(width/2, height/2);
	radius = size/1.80;
	minDist = size / 20;
	
	color1 = color("#EBEAE5");
	color2 = color("rgba(0, 0, 0, 0.06)");
	
	init();
}

function init(){
	points = [];
	let total = size/30;
	emojiSize = size/10;
	for(let i = 0; i < total; i++){
		let v = createVector(random(width), random(height));
		points.push({
			dest: v,
			pos: v.copy(),
			size: emojiSize * 0.8,
			emoji: random(emojis)
		});
	}
}

function draw() {	
	background(color1);
	
	//update
	let mouse = createVector(mouseX, mouseY);
	for(let i = 0; i < points.length; i++){
		let d1 = points[i].dest;
		let s1 = points[i].size;
		
		//distance from mouse
		if(d1.dist(mouse) < minMouseDist){
			let a = atan2(d1.y - mouse.y, d1.x - mouse.x);
			d1.x = mouse.x + cos(a) * minMouseDist;
			d1.y = mouse.y + sin(a) * minMouseDist;
		}
		
		//distance from others
		for(let j = 0; j < points.length; j++){
			if(i == j) continue;
			let d2 = points[j].dest;
			let r = (s1 + points[j].size) * 0.5;
			if(d1.dist(d2) < minDist + r){
				let a = atan2(d2.y - d1.y, d2.x - d1.x);
				d2.x = d1.x + cos(a) * (minDist + r + 2);
				d2.y = d1.y + sin(a) * (minDist + r + 2);
			}
		}
		
		//circular constrain
		let maxRadius = radius * 0.9;
		if(d1.dist(center) > maxRadius){
			let a = atan2(d1.y - center.y, d1.x - center.x);
			d1.x = center.x + cos(a) * (maxRadius - s1);
			d1.y = center.y + sin(a) * (maxRadius - s1);
		}
		
		//smooth
		points[i].pos.x += (d1.x - points[i].pos.x) * 0.09;
		points[i].pos.y += (d1.y - points[i].pos.y) * 0.09;
	}
	
		//draw connections
		stroke(color2);
		strokeWeight(3);
		for(let i = 0; i < points.length; i++){
			for(let j = i+1; j < points.length; j++){
				let d = points[i].pos.dist(points[j].pos);
				if(d < minDist * 8){
					line(points[i].pos.x, points[i].pos.y,
							 points[j].pos.x, points[j].pos.y);
				}
			}
		}
	

	//draw emoji
	fill("#241D38");
	noStroke();
	textSize(emojiSize/2);
	textAlign(CENTER, CENTER);
	for(let i = 0; i < points.length; i++){
		text(points[i].emoji, points[i].pos.x, points[i].pos.y);
	}
}


function mousePressed(){
	init();
}