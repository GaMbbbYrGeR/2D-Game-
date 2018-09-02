function Character() {
	this.tileFrom = [1, 1];
	this.tileTo = [1, 1];
	this.timeMoved = 0;
	this.dimensions = [38, 60];
	this.position = [41, 30];
	this.delayMove = 150;
	this.direction = directions.down;
	this.sprites = {};
	
	this.sprites[directions.down] = [{
		x: 8,
		y: 40,
		w: 40,
		h: 60
	}];
	this.sprites[directions.up] = [{
		x: 8,
		y: 640,
		w: 40,
		h: 60
	}];
	this.sprites[directions.left] = [{
		x: 8,
		y: 240,
		w: 36,
		h: 60
	}];
	this.sprites[directions.right] = [{
		x: 8,
		y: 440,
		w: 36,
		h: 60
	}];
	this.inventory = new Inventory(0);
}

