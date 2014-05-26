//ORIGIN---------------------------------------
var origins = [];
var origin = function(x, y) {
	this.x = x;
	this.y = y;
	this.size = 0;
	this.dead = false;
	this.maxSize = 125;
};

origin.prototype.update = function() {
	this.size += 1;
	if(this.size > this.maxSize) {
		this.dead = true;
	}
};

origin.prototype.hitByThing = function(thing) {

};

origin.prototype.draw = function() {
	context.lineWidth = 2;
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
	this.color = "#000000";
	this.hitLastTime = false;

	this.synth = new fmSynth();
	this.synth.carrier.frequency.value = (1 - (this.size / 12)) * 1000 + 60;
	this.synth.modulator.frequency.value = Math.random() * 1000 + 20;
	this.synth.lfo.frequency.value = 4;
	this.synth.lfoAmp.gain.value = Math.random() * 20;
	this.synth.mod.gain.value = Math.random() * 1000;
	this.synth.amp.gain.value = .25;

};


emitter.prototype.update = function() {
	if(this.hit && !this.hitLastTime) {
		this.synth.attack(.01);
		this.hitLastTime = true;
	}
	else if(!this.hiy && this.hitLastTime) {
		this.synth.release(.25);
		this.hitLastTime = false;
	}
	this.hit = false;
};

emitter.prototype.hitByThing = function(thing) {
	this.hit = true;
	var numThing = thing.size / thing.maxSize;
	this.synth.amp.gain.value = .25 * (1 - numThing);
	var c = numThing * 256;
	this.color = getColor(c, c, c);
};

emitter.prototype.draw = function() {
	context.lineWidth = 2;
	context.strokeStyle = "#000000";
	if(!this.hit) {
		context.fillStyle = "#FFFFFF";
	}
	else {
		context.fillStyle = this.color;
	}
		drawCircle(this.x, this.y, this.size, true);
};



