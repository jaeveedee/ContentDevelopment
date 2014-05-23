var isUnlocked = false;
function unlock() {
			
	if(isIOS || this.unlocked)
		return;

	// create empty buffer and play it
	var buffer = myContext.createBuffer(1, 1, 22050);
	var source = myContext.createBufferSource();
	source.buffer = buffer;
	source.connect(myContext.destination);
	source.noteOn(0);

	// by checking the play state after some time, we know if we're really unlocked
	setTimeout(function() {
		if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
			isUnlocked = true;
		}
	}, 0);

}


for(i = 0; i < 8; i++) {
	emitters.push(new emitter(Math.random() * 400, Math.random() * 300, Math.random() * 15 + 10));
}

var update = function() {
	var l = origins.length;
	for(i = 0; i < l; i++) {
		origins[i].update();
	}

	var l = emitters.length;
	for(i = 0; i < l; i++) {
		emitters[i].update();
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

var mainLoop = function() {
	update();
	draw();
};

setInterval(mainLoop, frameLength);//request animation frame , paul irish article


canvas.onmousedown = function(e) {
	origins.push(new origin(e.pageX, e.pageY));
};


