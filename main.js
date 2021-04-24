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
		for (i = 0; i < upgrades.name.length; i++) {
			blueSlimesPerSecond += upgrades.income[i] * upgrades.count[i];
		}
		return blueSlimesPerSecond;
	}
};

var upgrades = {
	name: ["Agitators", "Multifingers", "Feeders", "L. Potion N&#176;9"],
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
		document.getElementById("blueSlimeUpgrades").innerHTML = "";
		for (i = 0; i < upgrades.name.length; i++) {
			document.getElementById("blueSlimeUpgrades").innerHTML += '<table><tr><td><button class="button noselect" style="width:100px;" onClick="upgrades.buying('+i+')">'+upgrades.name[i]+' <br/>[<span>'+upgrades.cost[i]+'</span>] => <span>'+upgrades.count[i]+'</span></td></tr></table>';
		}
	}
};

function saveGame() {
	var gameSave = {
		blue_slimes: game.blue_slimes,
		blue_slimes_per_second: game.blue_slimes_per_second,
		clickValue: game.clickValue,
		upgradesCount: upgrades.count,
		upgradesCost: upgrades.cost,
		upgradesIncome: upgrades.income
	}
	localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
	var savedGame = JSON.parse(localStorage.getItem("gameSave"));
	if (localStorage.getItem("gameSave") !== null) {
		if (typeof savedGame.blue_slimes !== "undefined") game.blue_slimes = savedGame.blue_slimes;
		if (typeof savedGame.blue_slimes_per_second !== "undefined") game.blue_slimes_per_second = savedGame.blue_slimes_per_second;
		if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
		if (typeof savedGame.upgradesCount !== "undefined") {
			for (i = 0; i < savedGame.upgradesCount.length; i++) {
				upgrades.count[i] = savedGame.upgradesCount[i];
			}
		}
		if (typeof savedGame.upgradesCost !== "undefined") {
			for (i = 0; i < savedGame.upgradesCost.length; i++) {
				upgrades.cost[i] = savedGame.upgradesCost[i];
			}
		}
		if (typeof savedGame.upgradesIncome !== "undefined") {
			for (i = 0; i < savedGame.upgradesIncome.length; i++) {
				upgrades.income[i] = savedGame.upgradesIncome[i];
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