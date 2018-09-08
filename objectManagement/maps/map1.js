const roof01 = new MapObject(4),
	  roof02 = new MapObject(4),

	  roof1 = new MapObject(5),
	  roof2 = new MapObject(6),
	  roof3 = new MapObject(7),
	  roof31 = new MapObject(8),
	  roof32 = new MapObject(8),

	  tree11 = new MapObject(1),
	  tree12 = new MapObject(1),
	  tree13 = new MapObject(1),
	  tree14 = new MapObject(1),
	  tree15 = new MapObject(1),
		  
	  fountain = new MapObject(9),
      
      	  stud1_1 = new MapObject(31),
     	  stud1_2 = new MapObject(35),
     	  stud1_3 = new MapObject(40),
      	  stud1_4 = new MapObject(43),
      	  stud1_5 = new MapObject(44),
      	  stud1_6 = new MapObject(24),
      	  stud1_7 = new MapObject(49),
      	  stud1_8 = new MapObject(29),
      	  stud1_9 = new MapObject(25),
      	  stud1_10 = new MapObject(32),
     	  stud1_11 = new MapObject(39);

function objectsMap1() {
	
	roof01.placeAt(1, 23, 1);
	roof02.placeAt(36, 23, 1);

	roof1.placeAt(0, 0, 1);
	roof2.placeAt(30, 0, 1);
	roof3.placeAt(18, 0, 1);
	roof31.placeAt(13, 0, 1);
	roof32.placeAt(25, 0, 1);

	tree11.placeAt(12, 20, 1);
	tree12.placeAt(13, 17, 1);
	tree13.placeAt(29, 18, 1);
	tree14.placeAt(31, 21, 1);
	tree15.placeAt(27, 20, 1);

	fountain.placeAt(21, 19, 1);
}

function npcsMap1() {
    stud1_1.placeAt(15, 4, 1);
    stud1_2.placeAt(16, 4, 1);
    stud1_3.placeAt(14, 5, 1);
    stud1_4.placeAt(27, 8, 1);
    stud1_5.placeAt(28, 9, 1);
    stud1_6.placeAt(35, 17, 1);
    stud1_7.placeAt(17, 21, 1);
    stud1_8.placeAt(18, 22, 1);
    stud1_9.placeAt(4, 18, 1);
    stud1_10.placeAt(3, 19, 1);
    stud1_11.placeAt(5, 19, 1);
}
