#!/usr/bin/env node

//http://trekguide.com/Stardates.htm

// 34367056.4 milliseconds = 1.0 Stardate
const onestardate = 34367056.4;
const stardatenull= "July 5, 2318 12:00:00";

var stardate1 = stardate();
console.log('stardate: '+ stardate1);
console.log('stardate: '+ alexafy(stardate1));
console.log('stardate: '+ stardate('2015-10-25'));

function stardate(dateIn){
	var StardateOrigin = new Date(stardatenull);
	var StardateInput = new Date();

	if(typeof dateIn !== "undefined" && typeof dateIn === "string"){
		StardateInput = new Date(dateIn);
	}

	var findMilliseconds = StardateInput.getTime() - StardateOrigin.getTime();
	var findStarYear = findMilliseconds / (onestardate);

	findStarYear = Math.floor(findStarYear * 100);
	findStarYear = findStarYear / 100

	return findStarYear;
}


function alexafy(stardate) {
	var sNumber = stardate.toString();
	var output = "";

	for (var i = 0, len = sNumber.length; i < len; i += 1) {
		output += sNumber.charAt(i) + " ";
	}
	output = output.replace(".","Komma");
	output = output.trim();
	return output;
}
