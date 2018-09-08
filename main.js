'use strict'

let mapNo = 0;

let ctx = null,
	currentSecond = 0,
	frameCount = 0,
	framesLastSecond = 0,
	lastFrameTime = 0,
	
	info = false,
	schedule = false,
	message = true;

const tileW = 40,
	  tileH = 40;

const keysDown = {
	16: false,
	
	37: false,
	38: false,
	39: false,
	40: false,
	
	101: false,
	
	87: false,
	83: false,
	65: false,
	68: false,
	
	69: false,
	
	81: false,
	27: false,
	
	72: false,
	84: false
};

const directions = {
	up: 0,
	rigth: 1,
	down: 2,
	left: 3
};

const floorTypes = {
	solid: 0,
	path: 1,
	water: 2,
	ice: 3
};

function Tile(tx, ty, tt) {
	this.x = tx;
	this.y = ty;
	this.type = tt;
	this.eventEnter = null;
	this.object = null;
}

function TileMap() {
	this.map = [];
	this.w = 0;
	this.h = 0;
	this.layer = 4;
}

TileMap.prototype.buildMapFromData = function(d, w, h) {
	this.w = w;
	this.h = h;
	if (d.length != (w * h)) {
		return false;
	}

	this.map.length = 0;
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			this.map.push(new Tile(x, y, d[((y * w) + x)]));
		}
	}
	return true;
}

MapObject.prototype.placeAt = function(nx, ny, mapN) {
	if (mapTileData[mapN].map[toIndex(this.x, this.y)].object == this) {
		mapTileData[mapN].map[toIndex(this.x, this.y)].object = null;
	}

	this.x = nx;
	this.y = ny;

	let tmp = mapNo;
	mapNo = mapN;

	mapTileData[mapN].map[toIndex(nx, ny)].object = this;

	mapNo = tmp;
};


let mapTileData = {}
mapTileData[0] = new TileMap();
mapTileData[1] = new TileMap();
mapTileData[2] = new TileMap();
mapTileData[3] = new TileMap();
mapTileData[4] = new TileMap();
mapTileData[5] = new TileMap();
mapTileData[6] = new TileMap();
mapTileData[7] = new TileMap();
mapTileData[8] = new TileMap();
mapTileData[9] = new TileMap();

let player = new Character();

const viewport = {
	screen: [0, 0],
	startTile: [0, 0],
	endTile: [0, 0],
	offset: [0, 0],

	update: function(px, py) {
		this.offset[0] = Math.floor((this.screen[0] / 2) - px);
		this.offset[1] = Math.floor((this.screen[1] / 2) - py);

		var tile = [
			Math.floor(px / tileW),
			Math.floor(py / tileH)
		];

		this.startTile[0] = tile[0] - 5 - Math.ceil((this.screen[0]) / tileW);
		this.startTile[1] = tile[1] - 5 - Math.ceil((this.screen[1]) / tileH);

		if (this.startTile[0] < 0) {
			this.startTile[0] = 0;
		}
		if (this.startTile[1] < 0) {
			this.startTile[1] = 0;
		}

		this.endTile[0] = tile[0] + 5 + Math.ceil((this.screen[0] / 2) / tileW);
		this.endTile[1] = tile[1] + 5 + Math.ceil((this.screen[1] / 2) / tileH);

		if (this.endTile[0] >= mapW[mapNo]) {
			this.endTile[0] = mapW[mapNo] - 1;
		}
		if (this.endTile[1] >= mapH[mapNo]) {
			this.endTile[1] = mapH[mapNo] - 1;
		}
	}
};

function toIndex(x, y) {
	return ((y * mapW[mapNo]) + x);
}

window.onload = function() {

	ctx = document.getElementById('game').getContext('2d');
	requestAnimationFrame(drawGame);

	window.addEventListener("keydown", function(e) {
		if ((e.keyCode >= 37 && e.keyCode <= 40) || (e.keyCode == 16) ||
			(e.keyCode == 83) || (e.keyCode == 87) || (e.keyCode == 65) || (e.keyCode == 68)) {
			keysDown[e.keyCode] = true;
		}
	});

	window.addEventListener("keyup", function(e) {
		if ((e.keyCode >= 37 && e.keyCode <= 40) || (e.keyCode == 16) ||
			(e.keyCode == 83) || (e.keyCode == 87) || (e.keyCode == 65) || (e.keyCode == 68)) {
			keysDown[e.keyCode] = false;
		}
		if (e.keyCode == 80) {
			currentSpeed = (currentSpeed >= (gameSpeeds.length - 1) ? 0 : currentSpeed + 1)
		}
		if (e.keyCode == 69 && !schedule && !message) {
			info = !info;
		}
		if (e.keyCode == 81 && !info && !message) {
			schedule = !schedule;
		}
		if (e.keyCode == 27) {
			if (dayNo == 1) message = false;
			if (dayNo == 13) newGame();
		}
		if (e.keyCode == 72 && mapNo == 0) {
			nextDay();
		}
		if (e.keyCode == 84 && mapNo != 0) {
			mapNo = 0;
			player.placeAt(1, 1);
			nextDay();
		}
	});

	viewport.screen = [
		document.getElementById('game').width,
		document.getElementById('game').height
	];

	mapTileData[0].buildMapFromData(gameMap[0], mapW[0], mapH[0]);
	mapTileData[1].buildMapFromData(gameMap[1], mapW[1], mapH[1]);
	mapTileData[2].buildMapFromData(gameMap[2], mapW[2], mapH[2]);
	mapTileData[3].buildMapFromData(gameMap[3], mapW[3], mapH[3]);
	mapTileData[4].buildMapFromData(gameMap[4], mapW[4], mapH[4]);
	mapTileData[5].buildMapFromData(gameMap[5], mapW[5], mapH[5]);
	mapTileData[6].buildMapFromData(gameMap[6], mapW[6], mapH[6]);
	mapTileData[7].buildMapFromData(gameMap[7], mapW[7], mapH[7]);
	mapTileData[8].buildMapFromData(gameMap[8], mapW[8], mapH[8]);
	mapTileData[9].buildMapFromData(gameMap[9], mapW[9], mapH[9]);
	
	mapTileData[0].map[((5 * mapW[0]) + 6)].eventEnter = function(c) {
		if (player.direction == directions.right) {
			mapNo = 1;
			player.direction = directions.up;
			c.placeAt(5, 22);
		}
	};

	function f(c) {
		if (player.direction == directions.down && dayNo != 13) {
			mapNo = 0;
			player.direction == directions.left;
			c.placeAt(5, 5);
			nextDay();
		}
	};
	mapTileData[1].map[((23 * mapW[1]) + 5)].eventEnter = f;
	mapTileData[1].map[((23 * mapW[1]) + 4)].eventEnter = f;
	mapTileData[1].map[((23 * mapW[1]) + 3)].eventEnter = f;
	mapTileData[1].map[((23 * mapW[1]) + 2)].eventEnter = f;
	mapTileData[1].map[((23 * mapW[1]) + 37)].eventEnter = f;
	mapTileData[1].map[((23 * mapW[1]) + 38)].eventEnter = f;
	mapTileData[1].map[((23 * mapW[1]) + 39)].eventEnter = f;
	mapTileData[1].map[((23 * mapW[1]) + 40)].eventEnter = f;
    
    
	
    mapTileData[1].map[((0 * mapW[1]) + 18)].eventEnter = function(c)
    { if (player.direction == directions.up) { mapNo = 2; c.placeAt(12, 42); } };
    mapTileData[1].map[((0 * mapW[1]) + 19)].eventEnter = function(c)
    { if (player.direction == directions.up) { mapNo = 2; c.placeAt(13, 42); } };
    mapTileData[1].map[((0 * mapW[1]) + 20)].eventEnter = function(c)
    { if (player.direction == directions.up) { mapNo = 2; c.placeAt(14, 42); } };
    mapTileData[1].map[((0 * mapW[1]) + 21)].eventEnter = function(c)
    { if (player.direction == directions.up) { mapNo = 2; c.placeAt(15, 42); } };
    mapTileData[1].map[((0 * mapW[1]) + 22)].eventEnter = function(c)
    { if (player.direction == directions.up) { mapNo = 2; c.placeAt(16, 42); } };
    mapTileData[1].map[((0 * mapW[1]) + 23)].eventEnter = function(c)
    { if (player.direction == directions.up) { mapNo = 2; c.placeAt(17, 42); } };
    mapTileData[1].map[((0 * mapW[1]) + 24)].eventEnter = function(c)
    { if (player.direction == directions.up) { mapNo = 2; c.placeAt(18, 42); } };
    
    mapTileData[2].map[((43 * mapW[2]) + 12)].eventEnter = function(c)
    { if (player.direction == directions.down) { mapNo = 1; c.placeAt(18, 1); } };
    mapTileData[2].map[((43 * mapW[2]) + 13)].eventEnter = function(c)
    { if (player.direction == directions.down) { mapNo = 1; c.placeAt(19, 1); } };
    mapTileData[2].map[((43 * mapW[2]) + 14)].eventEnter = function(c)
    { if (player.direction == directions.down) { mapNo = 1; c.placeAt(20, 1); } };
    mapTileData[2].map[((43 * mapW[2]) + 15)].eventEnter = function(c)
    { if (player.direction == directions.down) { mapNo = 1; c.placeAt(21, 1); } };
    mapTileData[2].map[((43 * mapW[2]) + 16)].eventEnter = function(c)
    { if (player.direction == directions.down) { mapNo = 1; c.placeAt(22, 1); } };
    mapTileData[2].map[((43 * mapW[2]) + 17)].eventEnter = function(c)
    { if (player.direction == directions.down) { mapNo = 1; c.placeAt(23, 1); } };
    mapTileData[2].map[((43 * mapW[2]) + 18)].eventEnter = function(c)
    { if (player.direction == directions.down) { mapNo = 1; c.placeAt(24, 1); } };
	
	
	/* Перемещение с карты 2 на карту 3 и обратно */
	mapTileData[2].map[((32 * mapW[2]) + 9)].eventEnter = function(c) {
		if (player.direction == directions.right && visit[subjects.LA] == false && events < 3) {
			mapNo = 3;
			c.placeAt(1, 2);
			
			if(dayNo < 13) {
				visit[subjects.LA] = true;
				subject[subjects.LA].Points++;
				events++;
				
			} else {
				setRes(subjects.LA);
			}
		}
	};
	mapTileData[2].map[((33 * mapW[2]) + 9)].eventEnter = function(c) {
		if (player.direction == directions.right && visit[subjects.LA] == false && events < 3) {
			mapNo = 3;
			c.placeAt(1, 3);
			
			if(dayNo < 13) {
				visit[subjects.LA] = true;
				subject[subjects.LA].Points++;
				events++;
				
			} else {
				setRes(subjects.LA);
			}
		}
	};
	mapTileData[3].map[((2 * mapW[3]) + 0)].eventEnter = function(c)
    { if (player.direction == directions.left) { mapNo = 2; c.placeAt(8, 32); } };
	mapTileData[3].map[((3 * mapW[3]) + 0)].eventEnter = function(c)
    { if (player.direction == directions.left) { mapNo = 2; c.placeAt(8, 33); } };
	
	
	/* Перемещение с карты 2 на карту 4 и обратно */
	mapTileData[2].map[((26 * mapW[2]) + 9)].eventEnter = function(c) {
		if (player.direction == directions.right && visit[subjects.MA] == false && events < 3) {
			mapNo = 4;
			c.placeAt(1, 11);
			
			if(dayNo < 13) {
				visit[subjects.MA] = true;
				subject[subjects.MA].Points++;
				events++;
				
			} else {
				setRes(subjects.MA);
			}
		}
	};
	mapTileData[2].map[((27 * mapW[2]) + 9)].eventEnter = function(c) {
		if (player.direction == directions.right && visit[subjects.MA] == false && events < 3) {
			mapNo = 4;
			c.placeAt(1, 12);
			
			if(dayNo < 13) {
				visit[subjects.MA] = true;
				subject[subjects.MA].Points++;
				events++;
				
			} else {
				setRes(subjects.MA);
			}
		}
	};
	mapTileData[4].map[((11 * mapW[4]) + 0)].eventEnter = function(c)
    { if (player.direction == directions.left) { mapNo = 2; c.placeAt(8, 26); } };
	mapTileData[4].map[((12 * mapW[4]) + 0)].eventEnter = function(c)
    { if (player.direction == directions.left) { mapNo = 2; c.placeAt(8, 27); } };
	
	
	/* Перемещение с карты 2 на карту 5 и обратно */
	mapTileData[2].map[((32 * mapW[2]) + 21)].eventEnter = function(c) {
		if (player.direction == directions.left && events < 3) {
			mapNo = 5;
			c.placeAt(10, 2);
			events++;
		}
	};
	mapTileData[2].map[((33 * mapW[2]) + 21)].eventEnter = function(c) {
		if (player.direction == directions.left && events < 3) {
			mapNo = 5;
			c.placeAt(10, 3);
			events++;
		}
	};
	
	mapTileData[5].map[((2 * mapW[5]) + 11)].eventEnter = function(c)
    { if (player.direction == directions.right) { mapNo = 2; c.placeAt(22, 32); } };
	mapTileData[5].map[((3 * mapW[5]) + 11)].eventEnter = function(c)
    { if (player.direction == directions.right) { mapNo = 2; c.placeAt(22, 33); } };
	
	
	/* Перемещение с карты 2 на карту 6 и обратно */
	mapTileData[2].map[((26 * mapW[2]) + 21)].eventEnter = function(c) {
		if (player.direction == directions.left && visit[subjects.EN] == false && events < 3) {
			mapNo = 6;
			c.placeAt(10, 11);
			
			if(dayNo < 13) {
				visit[subjects.EN] = true;
				subject[subjects.EN].Points++;
				events++;
				
			} else {
				setRes(subjects.EN);
			}
		}
	};
	mapTileData[2].map[((27 * mapW[2]) + 21)].eventEnter = function(c) {
		if (player.direction == directions.left && visit[subjects.EN] == false && events < 3) {
			mapNo = 6;
			c.placeAt(10, 12);
			
			if(dayNo < 13) {
				visit[subjects.EN] = true;
				subject[subjects.EN].Points++;
				events++;
				
			} else {
				setRes(subjects.EN);
			}
		}
	};
	mapTileData[6].map[((11 * mapW[6]) + 11)].eventEnter = function(c)
    { if (player.direction == directions.right) { mapNo = 2; c.placeAt(22, 26); } };
	mapTileData[6].map[((12 * mapW[6]) + 11)].eventEnter = function(c)
    { if (player.direction == directions.right) { mapNo = 2; c.placeAt(22, 27); } };
	
	
	/* Перемещение с карты 2 на карту 7 и обратно */
	mapTileData[2].map[((13 * mapW[2]) + 5)].eventEnter = function(c) {
		if (player.direction == directions.right && visit[subjects.CS] == false && events < 3) {
			mapNo = 7;
			c.placeAt(1, 11);
			
			if(dayNo < 13) {
				visit[subjects.CS] = true;
				subject[subjects.CS].Points++;
				events++;
				
			} else {
				setRes(subjects.CS);
			}
		}
	};
	mapTileData[2].map[((14 * mapW[2]) + 5)].eventEnter = function(c) {
		if (player.direction == directions.right && visit[subjects.CS] == false && events < 3) {
			mapNo = 7;
			c.placeAt(1, 12);
			
			if(dayNo < 13) {
				visit[subjects.CS] = true;
				subject[subjects.CS].Points++;
				events++;
				
			} else {
				setRes(subjects.CS);
			}
		}
	};
	mapTileData[7].map[((11 * mapW[7]) + 0)].eventEnter = function(c)
    { if (player.direction == directions.left) { mapNo = 2; c.placeAt(4, 13); } };
	mapTileData[7].map[((12 * mapW[7]) + 0)].eventEnter = function(c)
    { if (player.direction == directions.left) { mapNo = 2; c.placeAt(4, 14); } };
	
	
	/* Перемещение с карты 2 на карту 8 и обратно */
	mapTileData[2].map[((29 * mapW[2]) + 4)].eventEnter = function(c) {
		if (player.direction == directions.left && visit[subjects.PR] == false && events < 3) {
			mapNo = 8;
			c.placeAt(12, 4);
			
			if(dayNo < 13) {
				visit[subjects.PR] = true;
				subject[subjects.PR].Points++;
				events++;
				
			} else {
				setRes(subjects.PR);
			}
		}
	};
	mapTileData[2].map[((30 * mapW[2]) + 4)].eventEnter = function(c) {
		if (player.direction == directions.left && visit[subjects.PR] == false && events < 3) {
			mapNo = 8;
			c.placeAt(12, 5);
			
			if(dayNo < 13) {
				visit[subjects.PR] = true;
				subject[subjects.PR].Points++;
				events++;
				
			} else {
				setRes(subjects.PR);
			}
		}
	};
	mapTileData[8].map[((4 * mapW[8]) + 13)].eventEnter = function(c)
    { if (player.direction == directions.right) { mapNo = 2; c.placeAt(5, 29); } };
	mapTileData[8].map[((5 * mapW[8]) + 13)].eventEnter = function(c)
    { if (player.direction == directions.right) { mapNo = 2; c.placeAt(5, 30); } };
	
	
	/* Перемещение с карты 2 на карту 9 и обратно */
	mapTileData[2].map[((29 * mapW[2]) + 26)].eventEnter = function(c) {
		if (player.direction == directions.right && visit[subjects.SS] == false && events < 3) {
			mapNo = 9;
			c.placeAt(1, 4);
			
			if(dayNo < 13) {
				visit[subjects.SS] = true;
				subject[subjects.SS].Points++;
				events++;
				
			} else {
				setRes(subjects.SS);
			}
		}
	};
	mapTileData[2].map[((30 * mapW[2]) + 26)].eventEnter = function(c) {
		if (player.direction == directions.right && visit[subjects.SS] == false && events < 3) {
			mapNo = 9;
			c.placeAt(1, 5);
			
			if(dayNo < 13) {
				visit[subjects.SS] = true;
				subject[subjects.SS].Points++;
				events++;
				
			} else {
				setRes(subjects.SS);
			}
		}
	};
	mapTileData[9].map[((4 * mapW[9]) + 0)].eventEnter = function(c)
    { if (player.direction == directions.left) { mapNo = 2; c.placeAt(25, 29); } };
	mapTileData[9].map[((5 * mapW[9]) + 0)].eventEnter = function(c)
    { if (player.direction == directions.left) { mapNo = 2; c.placeAt(25, 30); } };
	
	
	objectsMap0();
	objectsMap1();
	objectsMap2();
	
	objectsMap3();
	objectsMap4();
	
	objectsMap5();
	objectsMap6();
	
	objectsMap7();
	objectsMap8();
	objectsMap9();

	npcsMap1();
	npcsMap2();
	npcsMap3();
	npcsMap4();
	npcsMap5();
	npcsMap6();
	npcsMap7();
	npcsMap8();
	npcsMap9();
};
