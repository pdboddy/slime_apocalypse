var active_tab = "";

function navigate(tab) {
	document.getElementById("slimes").style.display = "none"
	document.getElementById("automation").style.display = "none"
	document.getElementById("upgrades").style.display = "none"
	document.getElementById("screen_4").style.display = "none"
	document.getElementById("screen_5").style.display = "none"
	document.getElementById("screen_6").style.display = "none"
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
	if (tab == "screen_4") {
		if (active_tab == "screen_4") {
			active_tab = ""
			return
		}
		active_tab = "screen_4"
		document.getElementById("screen_4").style.display = "block"
	}
	if (tab == "screen_5") {
		if (active_tab == "screen_5") {
			active_tab = ""
			return
		}
		active_tab = "screen_5"
		document.getElementById("screen_5").style.display = "block"
	}
	if (tab == "screen_6") {
		if (active_tab == "screen_6") {
			active_tab = ""
			return
		}
		active_tab = "screen_6"
		document.getElementById("screen_6").style.display = "block"
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
		document.title = game.blue_slimes + game.blue_slimes_per_second + "/s - Averting Slime Apocalypse!";
	},

	updateShops: function() {
		document.getElementById("blueSlimeAutomation").innerHTML = "";
		for (i = 0; i < automation.name.length; i++) {
			document.getElementById("blueSlimeAutomation").innerHTML += '<table style="background-color: #000080; width: 15%;"><tr><td rowspan="4" style="border:1px solid #cfcfcf"><img class="img" onClick="automation.buying('+i+')" src="images/'+automation.name[i]+'.gif"></td><td style="border:1px solid #cfcfcf; padding:3px;">'+automation.name[i]+'</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">x'+automation.income[i]+' multiplier</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">'+automation.cost[i]+' blue slimes</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">'+automation.count[i]+' owned</td></tr></table>';
		}
	}
};

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
	}
}

function resetSlimeProgress() {
	if (confirm("Are you sure you want to reset your progress?")) {
		var gameSave = {};
		localStorage.setItem("gameSave", JSON.stringify(gameSave));
		location.reload();
	}
}

window.onload = function() {
	loadGame();
	display.updateBlueSlimes();
	display.updateShops();
};

setInterval(function() {
	game.blue_slimes += game.getBlueSlimesPerSecond();
	display.updateBlueSlimes();
}, 1000); // Updates currencies every 1 second.

setInterval (function() {
	saveGame();
}, 300000); //Saves every 5 minutes.