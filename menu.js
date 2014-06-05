menu.onmousedown = function(e) {
	console.log("clicked");
	

};


function drawButton() {
	var position = menu.width/4;
  
  if (menu.getContext) {
    var ctx = menu.getContext('2d');
    
    for(var i = 0; i < 4; i++){
    	ctx.fillStyle="red";
    	ctx.fillRect(position * i,0,menu.width/4,menu.height);
	}
  }
}

