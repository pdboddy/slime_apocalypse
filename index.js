var active_tab = "";

function navigate(tab) {
	document.getElementById("slimes").style.display = "none"
	document.getElementById("automation").style.display = "none"
	document.getElementById("upgrades").style.display = "none"
	if (tab == "slimes") {
		if (active_tab == "slimes") {
			active_tab = ""
			return
		}
		active_tab = "slimes"
		document.getElementById("slimes").style.display = "block"
	}
	if (tab == "automation") {
		if (active_tab == "automation") {
			active_tab = ""
			return
		}
		active_tab = "automation"
		document.getElementById("automation").style.display = "block"
	}
	if (tab == "upgrades") {
		if (active_tab == "upgrades") {
			active_tab = ""
			return
		}
		active_tab = "upgrades"
		document.getElementById("upgrades").style.display = "block"
	}
} // Use this function to call the different DIV screens.

/* function reactivate() {
		document.getElementById("b4").disabled = ""
} */ // Use this method to reactivate disabled buttons, replacing "b4" with another ID.

var game = {
	blue_slimes: 0,
	blue_slimes_per_second: 0,
	clickValue: 1,
	
	addToBlueSlimes: function(amount) {
		this.blue_slimes += amount;
		display.updateBlueSlimes();
	},
	getBlueSlimesPerSecond: function() {
	var blueSlimesPerSecond = 0;
		for (i = 0; i < automation.name.length; i++) {
			blueSlimesPerSecond += automation.income[i] * automation.count[i];
		}
		return blueSlimesPerSecond;
	}
};

var automation = {
	tooltip: [
		"Agitators are the base form of slime multiplication.",
		"Pesterizers are more efficient than the agitators, but come at a higher cost.",
		"Threefers are more expensive still, but offer one of the best automation multipliers.",
		"The penultimate in slime multiplication, slappers also come with a delightful sound."
	],
	name: ["Agitators", "Pesterizers", "Threefers", "Slappers"],
	count: [0, 0, 0, 0],
	cost: [5, 30, 700, 4000],
	income: [1, 5, 100, 500],

	buying: function(index) {
		if (game.blue_slimes >= this.cost[index]) {
			game.blue_slimes -= this.cost[index];
			this.count[index]++;
			this.cost[index] = Math.ceil(this.cost[index] * 1.21);
			display.updateBlueSlimes();
			display.updateShops();
		}
	}
};

var display = {
	updateBlueSlimes: function() {
		document.getElementById("blue_slimes").textContent = game.blue_slimes;
		document.getElementById("blue_slimes_per_second").textContent = game.getBlueSlimesPerSecond();
		document.title = game.blue_slimes + " - Averting Slime Apocalypse!";
	},

	updateShops: function() {
		document.getElementById("blueSlimeAutomation").textContent = "";
		for (i = 0; i < automation.name.length; i++) {
			document.getElementById("blueSlimeAutomation").innerHTML += '<table style="background-color: #000080;"><tr><td rowspan="4" style="border:1px solid #cfcfcf"><img title="'+automation.tooltip[i]+'"class="img" onClick="automation.buying('+i+')" src="images/'+automation.name[i]+'.gif"></td><td style="border:1px solid #cfcfcf; padding:3px;">'+automation.name[i]+'</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">x'+automation.income[i]+' multiplier</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">'+automation.cost[i]+' blue slimes</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">'+automation.count[i]+' owned</td></tr></table>';
		}
	}
}; // Add a tooltip section to the array above, and add it as a title to the images to create an easy tooltip.

function saveGame() {
	var gameSave = {
		blue_slimes: game.blue_slimes,
		blue_slimes_per_second: game.blue_slimes_per_second,
		clickValue: game.clickValue,
		automationCount: automation.count,
		automationCost: automation.cost,
		automationIncome: automation.income
	}
	localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
	var savedGame = JSON.parse(localStorage.getItem("gameSave"));
	if (localStorage.getItem("gameSave") !== null) {
		if (typeof savedGame.blue_slimes !== "undefined") game.blue_slimes = savedGame.blue_slimes;
		if (typeof savedGame.blue_slimes_per_second !== "undefined") game.blue_slimes_per_second = savedGame.blue_slimes_per_second;
		if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
		if (typeof savedGame.automationCount !== "undefined") {
			for (i = 0; i < savedGame.automationCount.length; i++) {
				automation.count[i] = savedGame.automationCount[i];
			}
		}
		if (typeof savedGame.automationCost !== "undefined") {
			for (i = 0; i < savedGame.automationCost.length; i++) {
				automation.cost[i] = savedGame.automationCost[i];
			}
		}
		if (typeof savedGame.automationIncome !== "undefined") {
			for (i = 0; i < savedGame.automationIncome.length; i++) {
				automation.income[i] = savedGame.automationIncome[i];
			}
		}
		if (typeof savedGame.blue_1st !== "undefined") game.blue_1st = savedGame.blue_1st;
	}
}

function resetSlimeProgress() {
	if (confirm("Are you sure you want to reset your progress?")) {
		var gameSave = {};
		localStorage.setItem("gameSave", JSON.stringify(gameSave));
		location.reload();
	}
	alert("Your progress has been reset!");
}

var bttn1 = document.getElementById("b1");
var bttn2 = document.getElementById("b2");
var bttn3 = document.getElementById("b3");
var bttn98 = document.getElementById("b98");
var bttn99 = document.getElementById("b99");
var pic1 = document.getElementById("p1");
bttn1.addEventListener("click", function(){navigate('slimes'); });
bttn2.addEventListener("click", function(){navigate('automation')});
bttn3.addEventListener("click", function(){navigate('upgrades')});
bttn98.addEventListener("click", function(){saveGame(); alert("Your progress has been saved!")});
bttn99.addEventListener("click", function(){resetSlimeProgress();});
pic1.addEventListener("click", function(){game.addToBlueSlimes(game.clickValue);});

window.onload = function() {
	loadGame();
	display.updateBlueSlimes();
	display.updateShops();
	if (game.blue_slimes >= 5) {
		document.getElementById("b2").disabled = false;
	};
	if (game.blue_slimes >= 1000000) {
		document.getElementById("b3").disabled = false;
	};

};

setInterval(function() {
	game.blue_slimes += game.getBlueSlimesPerSecond();
	display.updateBlueSlimes();
	if (game.blue_slimes >= 5) {
		document.getElementById("b2").disabled = false;
	};
	if (game.blue_slimes >= 1000000) {
		document.getElementById("b3").disabled = false;
	};
}, 1000); // Updates currencies every 1 second.

setInterval (function() {
	saveGame();
}, 300000); //Saves every 5 minutes.