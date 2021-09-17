var active_tab = "";

function navigate(tab) {
	document.getElementById("slimes").style.display = "none"
	document.getElementById("automation").style.display = "none"
	document.getElementById("upgrades").style.display = "none"
	document.getElementById("efficiencies").style.display = "none"
	document.getElementById("achievements").style.display = "none"
	if (tab == "slimes") {
		if (active_tab == "slimes") {
			active_tab = "";
			return
		}
		active_tab = "slimes";
		document.getElementById("slimes").style.display = "block"
	}
	if (tab == "automation") {
		if (active_tab == "automation") {
			active_tab = "";
			return
		}
		active_tab = "automation";
		document.getElementById("automation").style.display = "block"
	}
	if (tab == "upgrades") {
		if (active_tab == "upgrades") {
			active_tab = "";
			return
		}
		active_tab = "upgrades";
		document.getElementById("upgrades").style.display = "block"
	}
	if (tab == "efficiencies") {
		if (active_tab == "efficiencies") {
			active_tab = "";
			return
		}
		active_tab = "efficiencies";
		document.getElementById("efficiencies").style.display = "block"
	}
	if (tab == "achievements") {
		if (active_tab == "achievements") {
			active_tab = "";
			return
		}
		active_tab = "achievements";
		document.getElementById("achievements").style.display = "block"
	}

} // Use this function to call the different DIV screens.

/* function reactivate() {
		document.getElementById("b4").disabled = ""
} */ // Use this method to reactivate disabled buttons, replacing "b4" with another ID.

var game = {
	blue_slimes: 0,
	blue_slimes_per_second: 0,
	blueClickValue: 1,
	pink_slimes: 0,
	pink_slimes_per_second: 0,
	pinkClickValue: 1,
	
	addToBlueSlimes: function(amount) {
		this.blue_slimes += amount;
		display.updateBlueSlimes();
	},
	getBlueSlimesPerSecond: function() {
	var blueSlimesPerSecond = 0;
		for (i = 0; i < blueautomation.name.length; i++) {
			blueSlimesPerSecond += blueautomation.income[i] * blueautomation.count[i];
		}
		return blueSlimesPerSecond;
	},
	addToPinkSlimes: function(pink_amount) {
		this.pink_slimes += pink_amount;
		display.updatePinkSlimes();
	},
	getPinkSlimesPerSecond: function() {
	var pinkSlimesPerSecond = 0;
		for (i = 0; i < pinkautomation.name.length; i++) {
			pinkSlimesPerSecond += pinkautomation.income[i] * pinkautomation.count[i];
		}
		return pinkSlimesPerSecond;
	},
};

var blueautomation = {
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
			display.updateBlueShops();
		}
	}
};

var pinkautomation = {
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
		if (game.pink_slimes >= this.cost[index]) {
			game.pink_slimes -= this.cost[index];
			this.count[index]++;
			this.cost[index] = Math.ceil(this.cost[index] * 1.22);
			display.updatePinkSlimes();
			display.updatePinkShops();
		}
	}
};

var blueupgrades = {
	tooltip: [
		"Arrow Upgrade Mk I offers small incrememntal upgrades to clicking efficiency.",
		"Arrow Upgrade Mk II offers a slightly better return per click.",
		"A tenfold increase over the Mk I.",
		"A tenfold increase over the Mk II."
	],
	name: ["Arrow_Upgrade_I", "Arrow_Upgrade_II", "Arrow_Upgrade_III", "Arrow_Upgrade_IV"],
	count: [0, 0, 0, 0],
	cost: [5, 30, 700, 4000],
	efficiency: [1, 5, 100, 500],

	buying: function(index) {
		if (game.blue_slimes >= this.cost[index]) {
			game.blue_slimes -= this.cost[index];
			this.count[index]++;
			this.cost[index] = Math.ceil(this.cost[index] * 1.23);
			game.blueClickValue += blueupgrades.efficiency[index];
			display.updateBlueSlimes();
			display.updateBlueUpgrades();
		}
	}
};

var pinkupgrades = {
	tooltip: [
		"Arrow Upgrade Mk I offers small incrememntal upgrades to clicking efficiency.",
		"Arrow Upgrade Mk II offers a slightly better return per click.",
		"A tenfold increase over the Mk I.",
		"A tenfold increase over the Mk II."
	],
	name: ["Arrow_Upgrade_I", "Arrow_Upgrade_II", "Arrow_Upgrade_III", "Arrow_Upgrade_IV"],
	count: [0, 0, 0, 0],
	cost: [5, 30, 700, 4000],
	efficiency: [1, 5, 100, 500],

	buying: function(index) {
		if (game.pink_slimes >= this.cost[index]) {
			game.pink_slimes -= this.cost[index];
			this.count[index]++;
			this.cost[index] = Math.ceil(this.cost[index] * 1.24);
			game.pinkClickValue += pinkupgrades.efficiency[index];
			display.updatePinkSlimes();
			display.updatePinkUpgrades();
		}
	}
};

var display = {
	updateBlueSlimes: function() {
		document.getElementById("blue_slimes").textContent = game.blue_slimes;
		document.getElementById("blue_slimes_per_second").textContent = game.getBlueSlimesPerSecond();
		document.getElementById("blue_slimes_per_click").textContent = game.blueClickValue;
		document.title = game.blue_slimes + " - Averting the Slime Apocalypse!";
	},

	updateBlueShops: function() {
		document.getElementById("blueSlimeAutomation").textContent = "";
		for (i = 0; i < blueautomation.name.length; i++) {
			document.getElementById("blueSlimeAutomation").innerHTML += '<table style="background-color: #0000ff;"><tr><td rowspan="4" style="border:1px solid #cfcfcf"><img title="'+blueautomation.tooltip[i]+'" class="img" onClick="blueautomation.buying('+i+')" src="images/'+blueautomation.name[i]+'.gif"></td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.name[i]+'</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">x'+blueautomation.income[i]+' multiplier</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.cost[i]+' blue slimes</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.count[i]+' owned</td></tr></table>';
		}
	},

	updateBlueUpgrades: function() {
		document.getElementById("blueSlimeUpgrades").textContent = "";
		for (i = 0; i < blueupgrades.name.length; i++) {
			document.getElementById("blueSlimeUpgrades").innerHTML += '<table style="background-color: #0000ff;"><tr><td rowspan="4" style="border:1px solid #cfcfcf"><img title="'+blueupgrades.tooltip[i]+'" class="img" onClick="blueupgrades.buying('+i+')" src="images/'+blueupgrades.name[i]+'.gif"></td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueupgrades.name[i]+'</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">adds '+blueupgrades.efficiency[i]+'</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">costs '+blueupgrades.cost[i]+' blue slimes</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">'+blueupgrades.count[i]+' owned</td></tr></table>';
		}
	},
	
	updatePinkSlimes: function() {
		document.getElementById("pink_slimes").textContent = game.pink_slimes;
		document.getElementById("pink_slimes_per_second").textContent = game.getPinkSlimesPerSecond();
		document.getElementById("pink_slimes_per_click").textContent = game.pinkClickValue;
	},

	updatePinkShops: function() {
		document.getElementById("pinkSlimeAutomation").textContent = "";
		for (i = 0; i < pinkautomation.name.length; i++) {
			document.getElementById("pinkSlimeAutomation").innerHTML += '<table style="background-color: #ffc0cb; color: #000000;"><tr><td rowspan="4" style="border:1px solid #000000"><img title="'+pinkautomation.tooltip[i]+'" class="img" onClick="pinkautomation.buying('+i+')" src="images/'+pinkautomation.name[i]+'.gif"></td><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.name[i]+'</td></tr><tr><td style="border:1px solid #000000; padding:3px;">x'+pinkautomation.income[i]+' multiplier</td></tr><tr><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.cost[i]+' pink slimes</td></tr><tr><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.count[i]+' owned</td></tr></table>';
		}
	},
	
	updatePinkUpgrades: function() {
		document.getElementById("pinkSlimeUpgrades").textContent = "";
		for (i = 0; i < pinkupgrades.name.length; i++) {
			document.getElementById("pinkSlimeUpgrades").innerHTML += '<table style="background-color: #ffc0cb; color: #000000;"><tr><td rowspan="4" style="border:1px solid #000000"><img title="'+pinkupgrades.tooltip[i]+'" class="img" onClick="pinkupgrades.buying('+i+')" src="images/'+pinkupgrades.name[i]+'.gif"></td><td style="border:1px solid #000000; padding:3px;">'+pinkupgrades.name[i]+'</td></tr><tr><td style="border:1px solid #000000; padding:3px;">adds '+pinkupgrades.efficiency[i]+'</td></tr><tr><td style="border:1px solid #000000; padding:3px;">costs '+pinkupgrades.cost[i]+' pink slimes</td></tr><tr><td style="border:1px solid #000000; padding:3px;">'+pinkupgrades.count[i]+' owned</td></tr></table>';
		}
	},
}

function saveGame() {
	var gameSave = {
		blue_slimes: game.blue_slimes,
		blue_slimes_per_second: game.blue_slimes_per_second,
		blueClickValue: game.blueClickValue,
		blueautomationCount: blueautomation.count,
		blueautomationCost: blueautomation.cost,
		blueautomationIncome: blueautomation.income,
		blueupgradesCount: blueupgrades.count,
		blueupgradesCost: blueupgrades.cost,
		pink_slimes: game.pink_slimes,
		pink_slimes_per_second: game.pink_slimes_per_second,
		pinkClickValue: game.pinkClickValue,
		pinkautomationCount: pinkautomation.count,
		pinkautomationCost: pinkautomation.cost,
		pinkautomationIncome: pinkautomation.income,
		pinkupgradesCount: pinkupgrades.count,
		pinkupgradesCost: pinkupgrades.cost,

	}
	localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
	var savedGame = JSON.parse(localStorage.getItem("gameSave"));
	if (localStorage.getItem("gameSave") !== null) {
		if (typeof savedGame.blue_slimes !== "undefined") game.blue_slimes = savedGame.blue_slimes;
		if (typeof savedGame.blue_slimes_per_second !== "undefined") game.blue_slimes_per_second = savedGame.blue_slimes_per_second;
		if (typeof savedGame.blueClickValue !== "undefined") game.blueClickValue = savedGame.blueClickValue;
		if (typeof savedGame.blueautomationCount !== "undefined") {
			for (i = 0; i < savedGame.blueautomationCount.length; i++) {
				blueautomation.count[i] = savedGame.blueautomationCount[i];
			}
		}
		if (typeof savedGame.blueautomationCost !== "undefined") {
			for (i = 0; i < savedGame.blueautomationCost.length; i++) {
				blueautomation.cost[i] = savedGame.blueautomationCost[i];
			}
		}
		if (typeof savedGame.blueautomationIncome !== "undefined") {
			for (i = 0; i < savedGame.blueautomationIncome.length; i++) {
				blueautomation.income[i] = savedGame.blueautomationIncome[i];
			}
		}
		if (typeof savedGame.blueupgradesCount !== "undefined") {
			for (i = 0; i < savedGame.blueupgradesCount.length; i++) {
				blueupgrades.count[i] = savedGame.blueupgradesCount[i];
			}
		}
		if (typeof savedGame.blueupgradesCost !== "undefined") {
			for (i = 0; i < savedGame.blueupgradesCost.length; i++) {
				blueupgrades.cost[i] = savedGame.blueupgradesCost[i];
			}
		}
		if (typeof savedGame.pink_slimes !== "undefined") game.pink_slimes = savedGame.pink_slimes;
		if (typeof savedGame.pink_slimes_per_second !== "undefined") game.pink_slimes_per_second = savedGame.pink_slimes_per_second;
		if (typeof savedGame.pinkClickValue !== "undefined") game.pinkClickValue = savedGame.pinkClickValue;
		if (typeof savedGame.pinkautomationCount !== "undefined") {
			for (i = 0; i < savedGame.pinkautomationCount.length; i++) {
				pinkautomation.count[i] = savedGame.pinkautomationCount[i];
			}
		}
		if (typeof savedGame.pinkautomationCost !== "undefined") {
			for (i = 0; i < savedGame.pinkautomationCost.length; i++) {
				pinkautomation.cost[i] = savedGame.pinkautomationCost[i];
			}
		}
		if (typeof savedGame.pinkautomationIncome !== "undefined") {
			for (i = 0; i < savedGame.pinkautomationIncome.length; i++) {
				pinkautomation.income[i] = savedGame.pinkautomationIncome[i];
			}
		}
		if (typeof savedGame.pinkupgradesCount !== "undefined") {
			for (i = 0; i < savedGame.pinkupgradesCount.length; i++) {
				pinkupgrades.count[i] = savedGame.pinkupgradesCount[i];
			}
		}
		if (typeof savedGame.pinkupgradesCost !== "undefined") {
			for (i = 0; i < savedGame.pinkupgradesCost.length; i++) {
				pinkupgrades.cost[i] = savedGame.pinkupgradesCost[i];
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
	alert("Your progress has been reset!");
}

var bttn1 = document.getElementById("b1");
var bttn2 = document.getElementById("b2");
var bttn3 = document.getElementById("b3");
var bttn4 = document.getElementById("b4");
var bttn97 = document.getElementById("b97");
var bttn98 = document.getElementById("b98");
var bttn99 = document.getElementById("b99");
var pic1 = document.getElementById("p1");
var pic2 = document.getElementById("p2");
bttn1.addEventListener("click", function(){navigate('slimes');});
bttn2.addEventListener("click", function(){navigate('automation');});
bttn3.addEventListener("click", function(){navigate('upgrades');});
bttn4.addEventListener("click", function(){navigate('efficiencies')});
bttn97.addEventListener("click", function(){navigate('achievements');});
bttn98.addEventListener("click", function(){saveGame(); alert("Your progress has been saved!")});
bttn99.addEventListener("click", function(){resetSlimeProgress();});
pic1.addEventListener("click", function(){game.addToBlueSlimes(game.blueClickValue);});
pic1.addEventListener("mousemove", function(){game.addToBlueSlimes(game.blueClickValue);});
pic2.addEventListener("click", function(){game.addToPinkSlimes(game.pinkClickValue);});
pic2.addEventListener("mousemove", function(){game.addToPinkSlimes(game.pinkClickValue);});

window.onload = function() {
	loadGame();
	display.updateBlueSlimes();
	display.updateBlueShops();
	display.updateBlueUpgrades();
	display.updatePinkSlimes();
	display.updatePinkShops();
	display.updatePinkUpgrades();
};

setInterval(function() {
	game.blue_slimes += game.getBlueSlimesPerSecond();
	display.updateBlueSlimes();
	if (game.blue_slimes >= 5) {
		document.getElementById("b3").disabled = "";
	};
	if (game.blue_slimes >= 1000) {
		document.getElementById("b2").style.display = "block";
		document.getElementById("b2").disabled = "";
	};
	if (game.blue_slimes >= 5000) {
		document.getElementById("b4").style.display = "block";
		document.getElementById("b4").disabled = "";
	};
	if (game.blue_slimes >= 10000) {
		document.getElementById("pink_slimes_table_01").style.display = "";
		document.getElementById("pink_slimes_table_02").style.display = "";
		document.getElementById("pink_slimes_table_03").style.display = "";
		document.getElementById("ul_pink_slimes").style.display = "";
	};
	if (game.blue_slimes >= 100000) {
		document.getElementById("b97").disabled = false;
	};
	game.pink_slimes += game.getPinkSlimesPerSecond();
	display.updatePinkSlimes();
}, 1000); // Updates currencies every second.

setInterval (function() {
	saveGame();
}, 300000); //Saves every 5 minutes.