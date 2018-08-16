'use strict'
var ADJECTIVES = fetchAdjectives(),
	NOUNS = fetchNouns(),
	FISH_NAME = "";
// yes this is definitely bad i'm sure. i hate it too.
ADJECTIVES.then( result => ADJECTIVES=result);
NOUNS.then( result => NOUNS=result);
function fetchAdjectives() {
	'use strict'
	var adjectives = new Promise((resolve, reject) => {
		let adjectivesRequest = new XMLHttpRequest();
		adjectivesRequest.addEventListener("load", function() {
			let adjectivesArr = adjectivesRequest.responseText.split("\n");
			//trim off trailing blank lines
			while(!adjectivesArr[adjectivesArr.length-1]){
				adjectivesArr.pop();
			}
			resolve(adjectivesArr);
		});
		adjectivesRequest.addEventListener("error", function() {
			// give up and fallback to a default list
			resolve(["cool", "good", "big", "smart", "gay", "clever", "lovely"]);
		});
		adjectivesRequest.open("GET", "https://raw.githubusercontent.com/dizzy-labs/FishyWords/master/adjectives.txt");
		adjectivesRequest.send();
	});

	return (adjectives);
}
function fetchNouns() {
	'use strict'
	var nouns = new Promise((resolve, reject) => {
		let nounsRequest = new XMLHttpRequest();
		nounsRequest.addEventListener("load", function() {
			let nounsArr = nounsRequest.responseText.split("\n");
			//trim off trailing blank lines
			while(!nounsArr[nounsArr.length-1]){
				nounsArr.pop();
			}
			resolve(nounsArr);
		});
		nounsRequest.addEventListener("error", function() {
			// give up and fallback to a default list
			resolve(["fish", "starfish", "sponge", "squid", "crab", "plankton", "squirrel"]);
		});
		nounsRequest.open("GET", "https://raw.githubusercontent.com/dizzy-labs/FishyWords/master/nouns.txt");
		nounsRequest.send();
	});

	return (nouns);
}
function getFishName(adjective1, adjective2, noun, adjectivesArr, nounsArr) {
	'use strict'
	if (adjective1 === "") {
		adjective1 = adjectivesArr[Math.floor(Math.random() * adjectivesArr.length)];
	}
	if (adjective2 === "") {
		adjective2 = adjectivesArr[Math.floor(Math.random() * adjectivesArr.length)];
	}
	if (noun === "") {
		noun = nounsArr[Math.floor(Math.random() * nounsArr.length)];
	}
	return ([adjective1, adjective2, noun].join(" "));
}
function buildFishNameView(fishName) {
	'use strict'
	var fishNameView = document.createElement("div"),
		nameSpan = document.createElement("span");
	nameSpan.textContent = fishName;
	fishNameView.classList.add("fish-name");
	fishNameView.appendChild(nameSpan);
	return fishNameView;
}

document.getElementById("regen-button").addEventListener("click", () => {
	'use strict'
	var keepAdjective1 = document.getElementById("keep-adjective1").checked,
	 	keepAdjective2 = document.getElementById("keep-adjective2").checked,
		keepNoun = document.getElementById("keep-noun").checked,
		oldView =  document.querySelector(".fish-name"),
		oldNameArr = FISH_NAME.split(" "),
		adjective1 = (keepAdjective1) ? oldNameArr[0] : "",
		adjective2 = (keepAdjective2) ? oldNameArr[1] : "",
		noun = (keepNoun) ? oldNameArr[2] : "",
		newName = getFishName(adjective1,adjective2,noun, ADJECTIVES, NOUNS),
		newView = buildFishNameView(newName);
	oldView.parentNode.replaceChild(newView, oldView);
	FISH_NAME = newName;
});
