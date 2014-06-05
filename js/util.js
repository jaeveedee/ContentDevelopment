var getColor = function(r, g, b) {
	r = Math.floor(r);
	g = Math.floor(g);
	b = Math.floor(b);
	return "rgb(" + r + "," + g +  "," + b + ")";
};


var drawCircle = function(x, y, r, filled) {
	context.beginPath();
	context.arc(x, y, r, 0, 2 * Math.PI);
	context.stroke();
	if(filled) {
		context.fill();
	}
}


var cleanup = function(objects) {
	var i = objects.length;
	while(i--) {
		if(objects[i].dead) {
			objects.splice(i, 1);
		}
	}
};

var circleCollision = function(o1, o2) {
	var a = o1.size - o2.size;
	a = a * a;
	
	var b1 = o1.x - o2.x;
	b1 = b1 * b1;

	var b2 = o1.y - o2.y;
	b2 = b2 * b2;

	var b = b1 + b2;

	var c = o1.size + o2.size;
	c = c * c;


	if(a <= b && b <= c) {
		return true;
	}
	else {
		return false;
	}
};

var collide = function(c1, c2) {

	var a1 = c1;	
	var l1 = c1.length;
	var l2 = c2.length;
	for(i = 0; i < l1; i++) {
		for(j = 0; j < l2; j++) {
			if(circleCollision(c1[i], c2[j])) {
			c1[i].hitByThing(c2[j]);
			c2[j].hitByThing(c1[i]);
			}	
		}
	}
};

