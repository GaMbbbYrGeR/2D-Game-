function drawGame() {

	if (ctx == null) {
		return;
	}
 	if (!isAllLoaded) {
		requestAnimationFrame(drawGame);
		return;
	}

	let currentFrameTime = Date.now(),
		timeElapsed = currentFrameTime - lastFrameTime;
	
	gameTime += Math.floor(timeElapsed * gameSpeeds[currentSpeed].mult);
	
	let sec = Math.floor(Date.now() / 1000);

	if (sec != currentSecond) {
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	} else {
		frameCount++;
	}


	if (keysDown[16]) {
		player.delayMove = 75;
	} else {
		player.delayMove = 150;
	}

	if (!player.processMovement(gameTime) && gameSpeeds[currentSpeed].mult != 0) {
		if (keysDown[38] || keysDown[87]) {
			if (player.direction != directions.up) {
				player.direction = directions.up;
			} else {
				if (player.canMoveUp()) {
					player.MoveUp(gameTime);
				}
			}
		} else if (keysDown[40] || keysDown[83]) {
			if (player.direction != directions.down) {
				player.direction = directions.down;
			} else {
				if (player.canMoveDown()) {
					player.MoveDown(gameTime);
				}
			}
		} else if (keysDown[39] || keysDown[68]) {
			if (player.direction != directions.right) {
				player.direction = directions.right;
			} else {
				if (player.canMoveRight()) {
					player.MoveRight(gameTime);
				}
			}
		} else if (keysDown[37] || keysDown[65]) {
			if (player.direction != directions.left) {
				player.direction = directions.left;
			} else {
				if (player.canMoveLeft()) {
					player.MoveLeft(gameTime);
				}
			}
		}
	}

	viewport.update(
		player.position[0] + (player.dimensions[0] / 2),
		player.position[1] + (player.dimensions[1] / 2),
	);

	ctx.fillStyle = '#424242';
	ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	for (let z = 0; z < mapTileData[mapNo].layer; z++) {
		for (let y = viewport.startTile[1]; y <= viewport.endTile[1]; y++) {
			for (let x = viewport.startTile[0]; x <= viewport.endTile[0]; x++) {
				if (z == 0) {
					ctx.drawImage(tileTypes[mapTileData[mapNo].map[toIndex(x, y)].type].sprite,
						viewport.offset[0] + x * tileW,
						viewport.offset[1] + y * tileH,
						tileW, tileH);
				} else if (z == 1) {
					const is = mapTileData[mapNo].map[toIndex(x, y)].itemStack;
					if (is != null) {
						const sprite = itemTypes[is.type].sprite;
						ctx.drawImage(tileset, sprite[0].x, sprite[0].y,
							sprite[0].w, sptite[0].h,
							viewport.offset[0] + (x * tileW) + itemTypes[is.type].offset[0],
							viewport.offset[1] + (y * tileH) + itemTypes[is.type].offset[1],
							sprite[0].w, sprite[0].h);
					}
				}
				const obj = mapTileData[mapNo].map[toIndex(x, y)].object;
				if (obj != null && objectTypes[obj.type].zIndex == z) {
					const objTypes = objectTypes[obj.type];
					ctx.drawImage(objTypes.sp,
						objTypes.sprite[0].x, objTypes.sprite[0].y,
						objTypes.sprite[0].w, objTypes.sprite[0].h,
						viewport.offset[0] + (x * tileW) + objTypes.offset[0],
						viewport.offset[1] + (y * tileH) + objTypes.offset[1],
						objTypes.sprite[0].w, objTypes.sprite[0].h);
				}
			}
		}
		if (z == 1) {
			const sprite = player.sprites[player.direction];
			ctx.drawImage(hero,
				sprite[0].x, sprite[0].y,
				sprite[0].w, sprite[0].h,
				viewport.offset[0] + player.position[0],
				viewport.offset[1] + player.position[1] - 10,
				player.dimensions[0], player.dimensions[1]);
		}
	}

	ctx.textAlign = "left";
	ctx.font = "bold 50pt helvetica";
	ctx.fillStyle = "#f90606";
	if (gameSpeeds[currentSpeed].name == "Paused") {
		ctx.fillText("Пауза", 235, 260);
	} else {
		ctx.fillText("", 10, 40);
	}
	
	ctx.fillStyle = '#ffffff';
	ctx.font = "bold 10pt helvetica";
	
	if (!(message || info || schedule)) {
		ctx.fillText('[E] Информация', 10, 20);
		ctx.fillText('[Q] Расписание', 10, 40);
		ctx.fillText('[Shift] Бег', 10, 60);
		
		if (dayNo < 13) {
			if (mapNo == 0) {
				ctx.fillText('Посидеть сегодня дома [H]', 450, 20);
			}
			if (mapNo == 2) {
				ctx.fillText('Телепорт домой [T]', 500, 20);
			}
		}
		if (mapNo == 0) {
			ctx.fillText('День ' + dayNo, 10, 470);
		}
	}
	
	if (info) {
		ctx.fillStyle = '#000000';
		ctx.fillRect(100, 100, 440, 280);
		
		ctx.font = 'bold 13pt helvetica';
		ctx.fillStyle = '#dbdbdb';
		ctx.fillText('День ' + dayNo, 125, 130);
		
		if (dayNo < 13) {
			ctx.fillText('Успеваемость: ', 125, 180);
			ctx.font = "11pt helvetica";
			
			ctx.fillText('Информатика  '
						 + Math.round(100/subject[subjects.CS].Lessons
									  * subject[subjects.CS].Points) + '%',
						 125, 205);
			ctx.fillText('Математический анализ  '
						 + Math.round(100/subject[subjects.MA].Lessons
									  * subject[subjects.MA].Points) + '%',
						 125, 225);
			ctx.fillText('Линейная алгебра  '
						 + Math.round(100/subject[subjects.LA].Lessons
									  * subject[subjects.LA].Points) + '%',
						 125, 245);
			ctx.fillText('Иностранный язык  '
						 + Math.round(100/subject[subjects.EN].Lessons
									  * subject[subjects.EN].Points) + '%',
						 125, 265);
			ctx.fillText('Социальные науки  '
						 + Math.round(100/subject[subjects.SS].Lessons
									  * subject[subjects.SS].Points) + '%',
						 125, 285);
			ctx.fillText('Языки программирования  '
						 + Math.round(100/subject[subjects.PR].Lessons
									  * subject[subjects.PR].Points) + '%',
						 125, 305);
			
			ctx.font = 'bold 12pt helvetica';
			if (13 - dayNo < 4) ctx.fillStyle = '#ff0000';
			ctx.fillText('Дней до сессии осталось: ' + (13 - dayNo), 125, 355);
			
			ctx.font = 'bold 12pt helvetica';
			ctx.fillText('[E] Закрыть', 420, 355);
			
		} else {
			
			ctx.fillStyle = '#dbdbdb';
			ctx.fillText('Успеваемость: ', 125, 180);
			ctx.font = "11pt helvetica";
			
			ctx.fillText('Информатика ', 125, 205);
			ctx.fillText('Математический анализ  ', 125, 225);
			ctx.fillText('Линейная алгебра  ', 125, 245);
			ctx.fillText('Иностранный язык  ', 125, 265);
			ctx.fillText('Социальные науки  ', 125, 285);
			ctx.fillText('Языки программирования  ', 125, 305);
			
			ctx.fillText(subject[subjects.CS].Res, 485, 205);
			ctx.fillText(subject[subjects.MA].Res, 485, 225);
			ctx.fillText(subject[subjects.LA].Res, 485, 245);
			ctx.fillText(subject[subjects.EN].Res, 485, 265);
			ctx.fillText(subject[subjects.SS].Res, 485, 285);
			ctx.fillText(subject[subjects.PR].Res, 485, 305);
			
			ctx.font = 'bold 12pt helvetica';
			ctx.fillText('Сессия ', 125, 355);
			
			ctx.font = 'bold 12pt helvetica';
			ctx.fillText('[E] Закрыть', 420, 355);
		}
	}
	
	if (schedule) {
		ctx.fillStyle = '#dbdbdb';
		ctx.fillRect(100, 100, 440, 280);
		
		ctx.fillStyle = '#333333';
		ctx.font = 'bold 17pt helvetica';
		ctx.fillText('РАСПИСАНИЕ', 240, 135);
		
		ctx.font = '16pt helvetica';
		ctx.fillText('Информатика', 125, 180);
		ctx.fillText('Математический анализ', 125, 210);
		ctx.fillText('Линейная алгебра', 125, 240);
		ctx.fillText('Иностранный язык', 125, 270);
		ctx.fillText('Социальные науки', 125, 300);
		ctx.fillText('Языки программирования', 125, 330);
		
		ctx.fillText('309', 480, 180);
		ctx.fillText('203', 480, 210);
		ctx.fillText('201', 480, 240);
		ctx.fillText('206', 480, 270);
		ctx.fillText('205', 480, 300);
		ctx.fillText('202', 480, 330);
		
		ctx.font = 'bold 12pt helvetica';
		ctx.fillText('[Q] Закрыть', 420, 365);
	}
	
	if (exams == 6) {
		info = false;
		schedule = false;
		message = true;
	}
	
	if (message) {
		if (dayNo == 1) {
			ctx.fillStyle = '#000000';
			ctx.fillRect(100, 150, 440, 200);
		
			ctx.font = 'bold 13pt helvetica';
			ctx.fillStyle = '#dbdbdb';
			ctx.fillText('До сессии две недели, а вы ничего не знаете!', 125, 200);
			ctx.fillText('Может, пора это исправить?', 125, 225);
			
			ctx.font = '11pt helvetica';
			ctx.fillText('За один день можно посетить три занятия,', 125, 265);
			ctx.fillText('но не более одного по каждой дисциплине', 125, 285);
			ctx.fillText('Минимум, необходимый для зачета - 60%', 125, 305);
		
			ctx.font = 'bold 13pt helvetica';
			ctx.fillText('[Esc] Закрыть', 400, 330);
		}
		if (dayNo == 13) {
			ctx.fillStyle = '#000000';
			ctx.fillRect(100, 150, 440, 200);
			
			ctx.font = 'bold 13pt helvetica';
			ctx.fillStyle = '#dbdbdb';
			
			if (exams == 6) {
				currentSpeed = 1;
				if (passed == 6) {
					ctx.fillText('Вы успешно сдали все экзамены!', 125, 200);
					ctx.fillText('[Esc] Новая игра', 380, 330);
				
				} else {
					ctx.fillText('Вы не закрыли сессию', 125, 200);
					
					ctx.font = '12pt helvetica';
					ctx.fillText('Видно не судьба', 125, 245);
					ctx.fillText('видно не судьба', 125, 265);
					
					ctx.font = 'bold 13pt helvetica';
					ctx.fillText('[Esc] Новая игра', 380, 330);
				}
			}
		}
	}
	
	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}
