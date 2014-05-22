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

setInterval(mainLoop, frameLength);


canvas.onmousedown = function(e) {
	origins.push(new origin(e.pageX, e.pageY));
};


