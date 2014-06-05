document.ontouchmove = function(e){ 
	e.preventDefault(); 
}
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.85;

var context = canvas.getContext("2d");

var frameRate = 60;
var frameLength	= 1000 / 60;

window.AudioContext = window.AudioContext||window.webkitAudioContext;

var audio = new AudioContext() || new webkitAudioContext();

var vol = audio.createGain();

var del = audio.createDelay();
del.delayTime.value = 115 / 1000;
var fb = audio.createGain();
fb.gain.value = .75;

var delScale = audio.createGain();
delScale.gain.value = .75;

var delMod = audio.createOscillator();
delMod.type = "sine";
delMod.frequency.value = .005;
delMod.start(0);

var delModAmp = audio.createGain();
delModAmp.gain.value = .06;

delScale.connect(del);

delMod.connect(delModAmp);
delModAmp.connect(del.delayTime);

del.connect(fb);
fb.connect(del);
fb.connect(vol);
vol.gain.value = 1;
vol.connect(audio.destination);	

var isUnlocked = false;
function unlock() {

	// create empty buffer and play it
	var buffer = audio.createBuffer(1, 1, 22050);
	var source = audio.createBufferSource();
	source.buffer = buffer;
	source.connect(audio.destination);
	source.noteOn(0);

	// by checking the play state after some time, we know if we're really unlocked
	setTimeout(function() {
		if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
			isUnlocked = true;
		}
	}, 0);

}


for(i = 0; i < 64; i++) {
	emitters.push(new emitter(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 10 + 2));
}

var update = function(dt) {
	var l = origins.length;
	for(i = 0; i < l; i++) {
		origins[i].update();
	}

	var l = emitters.length;
	for(i = 0; i < l; i++) {
		emitters[i].update(dt);
	}

	collide(origins, emitters);

	cleanup(origins);
	cleanup(emitters);
};

var draw = function() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	var l = origins.length;
	for(i = 0; i < l; i++) {
		origins[i].draw();
	}
	
	l = emitters.length;
	for(i = 0; i < l; i++) {
		emitters[i].draw();
	}




};

var dt = 0;
//var pt = window.performance.now();

var mainLoop = function() {
	window.requestAnimationFrame(mainLoop) || window.webKitRequestAnimationFrame(mainLoop);
	//dt = window.performance.now() - pt;
	//dt *= .01;
	//pt = window.performance.now();
	dt = 0;
	update(dt);
	draw();

	
};

mainLoop();



canvas.onmousedown = function(e) {

	if (!isUnlocked) {
		unlock();
	};
	origins.push(new origin(e.pageX, e.pageY));
};


