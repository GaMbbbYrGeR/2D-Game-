let passed = 0,
	exams = 0;

const subjects = {
	CS: 0, //Информатика
	MA: 1, //Математический анализ
	LA: 2, //Линейная алгебра
	EN: 3, //Иностранные языки
	SS: 4, //Социальные науки
	PR: 5, //Языки и методы программирования
}

let subject = {};
subject[subjects.CS] = {
	Lessons: 8,
	Points: 0,
	Res: 'н/а'
};
subject[subjects.MA] = {
	Lessons: 6,
	Points: 0,
	Res: 'н/а'
};
subject[subjects.LA] = {
	Lessons: 6,
	Points: 0,
	Res: 'н/а'
};
subject[subjects.EN] = {
	Lessons: 2,
	Points: 0,
	Res: 'н/а'
};
subject[subjects.SS] = {
	Lessons: 3,
	Points: 0,
	Res: 'н/а'
};
subject[subjects.PR] = {
	Lessons: 7,
	Points: 0,
	Res: 'н/а'
};

function setRes(a) {
	visit[a] = true;
	
	if(a == 3 || a == 4) {
		if(100 / subject[a].Lessons * subject[a].Points < 60) {
			subject[a].Res = 'незачет';
			exams++;
		} else {
			subject[a].Res = 'зачет';
			passed++;
			exams++;
		}
	} else {
		if(100 / subject[a].Lessons * subject[a].Points < 60) {
			subject[a].Res = 'неуд';
			exams++;
		}
		if(100 / subject[a].Lessons * subject[a].Points >= 60 &&
		   100 / subject[a].Lessons * subject[a].Points < 71) {
			subject[a].Res = 'уд';
			passed++;
			exams++;
		}
		if (100 / subject[a].Lessons * subject[a].Points >= 71 &&
			100 / subject[a].Lessons * subject[a].Points < 85) {
			subject[a].Res = 'хор';
			passed++;
			exams++;
		}
		if (100 / subject[a].Lessons * subject[a].Points >= 85) {
			subject[a].Res = 'отл';
			passed++;
			exams++;
		}
	}
}
