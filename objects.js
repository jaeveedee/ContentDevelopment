//ORIGIN---------------------------------------
var origins = [];
var origin = function(x, y) {
	this.x = x;
	this.y = y;
	this.size = 0;
	this.dead = false;
	this.maxSize = 250;
};

origin.prototype.update = function() {
	this.size += .5;
	if(this.size > this.maxSize) {
		this.dead = true;
	}
};

origin.prototype.hitByThing = function() {

};

origin.prototype.draw = function() {
	c = 255 * this.size / this.maxSize;
	context.strokeStyle = getColor(c,c,c);
	drawCircle(this.x, this.y, this.size);	
};

//EMITTER------------------------------------
var emitters = [];
var emitter = function(x, y, size) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.dead = false;
	this.hit = false;

	this.osc = audio.createOscillator();
	this.osc.type = "sine";
	this.osc.frequency.value = Math.random() * 500 + 400;
	this.amp = audio.createGain();
	this.amp.gain.value = 0;
	this.osc.connect(this.amp);
	this.amp.connect(vol);
	this.osc.start(0);

};


emitter.prototype.update = function() {
	if(this.hit) {
		this.amp.gain.value = 1;
	}
	else {
		this.amp.gain.value = 0;
	}
	this.hit = false;
};

emitter.prototype.hitByThing = function() {
	this.hit = true;
};

emitter.prototype.draw = function() {
	context.strokeStyle = "#000000";
	if(!this.hit) {
		drawCircle(this.x, this.y, this.size, false);
	}
	else {
		drawCircle(this.x, this.y, this.size, true);
	}
	
};




