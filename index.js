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
		"Automation Upgrade Mk I for blue slimes.",
		"Automation Upgrade Mk II for blue slimes.",
		"Automation Upgrade Mk III for blue slimes.",
		"Automation Upgrade Mk IV for blue slimes."
	],
	name: ["Agitators", "Pesterizers", "Threefers", "Slappers"],
	count: [0, 0, 0, 0],
	cost: [5, 30, 700, 4000],
	income: [1, 5, 100, 500],

	buying: function(index) {
		if (game.blue_slimes >= this.cost[index]) {
			game.blue_slimes -= this.cost[index];
			this.count[index]++;
			this.cost[index] = Math.ceil(this.cost[index] * 1.01);
			display.updateBlueSlimes();
			display.updateBlueShops();
		}
	}
};

var pinkautomation = {
	tooltip: [
		"Automation Upgrade Mk I for pink slimes.",
		"Automation Upgrade Mk II for pink slimes.",
		"Automation Upgrade Mk III for pink slimes.",
		"Automation Upgrade Mk IV for pink slimes."
	],
	name: ["Agitators", "Pesterizers", "Threefers", "Slappers"],
	count: [0, 0, 0, 0],
	cost: [5, 30, 700, 4000],
	income: [1, 5, 100, 500],

	buying: function(index) {
		if (game.pink_slimes >= this.cost[index]) {
			game.pink_slimes -= this.cost[index];
			this.count[index]++;
			this.cost[index] = Math.ceil(this.cost[index] * 1.02);
			display.updatePinkSlimes();
			display.updatePinkShops();
		}
	}
};

var blueupgrades = {
	tooltip: [
		"Clicking Upgrade Mk I for blue slimes.",
		"Clicking Upgrade Mk II for blue slimes.",
		"Clicking Upgrade Mk III for blue slimes.",
		"Clicking Upgrade Mk IV for blue slimes."
	],
	name: ["Arrow_Upgrade_I", "Arrow_Upgrade_II", "Arrow_Upgrade_III", "Arrow_Upgrade_IV"],
	count: [0, 0, 0, 0],
	cost: [5, 30, 700, 4000],
	efficiency: [1, 5, 100, 500],

	buying: function(index) {
		if (game.blue_slimes >= this.cost[index]) {
			game.blue_slimes -= this.cost[index];
			this.count[index]++;
			this.cost[index] = Math.ceil(this.cost[index] * 1.03);
			game.blueClickValue += blueupgrades.efficiency[index];
			display.updateBlueSlimes();
			display.updateBlueUpgrades();
		}
	}
};

var pinkupgrades = {
	tooltip: [
		"Clicking Upgrade Mk I for pink slimes.",
		"Clicking Upgrade Mk II for pink slimes.",
		"Clicking Upgrade Mk III for pink slimes.",
		"Clicking Upgrade Mk IV for pink slimes."
	],
	name: ["Arrow_Upgrade_I", "Arrow_Upgrade_II", "Arrow_Upgrade_III", "Arrow_Upgrade_IV"],
	count: [0, 0, 0, 0],
	cost: [5, 30, 700, 4000],
	efficiency: [1, 5, 100, 500],

	buying: function(index) {
		if (game.pink_slimes >= this.cost[index]) {
			game.pink_slimes -= this.cost[index];
			this.count[index]++;
			this.cost[index] = Math.ceil(this.cost[index] * 1.04);
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
		document.getElementById("bs1_1_name").innerHTML = blueupgrades.name[0];
		document.getElementById("bs1_1_efficiency").innerHTML = blueupgrades.efficiency[0];
		document.getElementById("bs1_1_cost").innerHTML = blueupgrades.cost[0];
		document.getElementById("bs1_1_count").innerHTML = blueupgrades.count[0];
		document.getElementById("bs1_1_tooltip").innerHTML = blueupgrades.tooltip[0];
		document.getElementById("bs2_1_name").innerHTML = blueautomation.name[0];
		document.getElementById("bs2_1_income").innerHTML = blueautomation.income[0];
		document.getElementById("bs2_1_cost").innerHTML = blueautomation.cost[0];
		document.getElementById("bs2_1_count").innerHTML = blueautomation.count[0];
		document.getElementById("bs2_1_tooltip").innerHTML = blueautomation.tooltip[0];
	},

	updateBlueShops: function() {
		document.getElementById("blueSlimeAutomation").textContent = "";
		for (i = 0; i < blueautomation.name.length; i = i+4) {
			document.getElementById("blueSlimeAutomation").innerHTML += '<table style="background-color: #0000ff;"><tr><td rowspan="4" style="border:1px solid #cfcfcf"><img title="'+blueautomation.tooltip[i]+'" class="img" onClick="blueautomation.buying('+i+')" src="images/'+blueautomation.name[i]+'.gif"></td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.name[i]+'</td><td rowspan="4" style="border:1px solid #cfcfcf"><img title="'+blueautomation.tooltip[i+1]+'" class="img" onClick="blueautomation.buying('+[i+1]+')" src="images/'+blueautomation.name[i+1]+'.gif"></td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.name[i+1]+'</td><td rowspan="4" style="border:1px solid #cfcfcf"><img title="'+blueautomation.tooltip[i+2]+'" class="img" onClick="blueautomation.buying('+[i+2]+')" src="images/'+blueautomation.name[i+2]+'.gif"></td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.name[i+2]+'</td><td rowspan="4" style="border:1px solid #cfcfcf"><img title="'+blueautomation.tooltip[i+3]+'" class="img" onClick="blueautomation.buying('+[i+3]+')" src="images/'+blueautomation.name[i+3]+'.gif"></td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.name[i+3]+'</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">x'+blueautomation.income[i]+' multiplier</td><td style="border:1px solid #cfcfcf; padding:3px;">x'+blueautomation.income[i+1]+' multiplier</td><td style="border:1px solid #cfcfcf; padding:3px;">x'+blueautomation.income[i+2]+' multiplier</td><td style="border:1px solid #cfcfcf; padding:3px;">x'+blueautomation.income[i+3]+' multiplier</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.cost[i]+' blue slimes</td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.cost[i+1]+' blue slimes</td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.cost[i+2]+' blue slimes</td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.cost[i+3]+' blue slimes</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.count[i]+' owned</td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.count[i+1]+' owned</td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.count[i+2]+' owned</td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueautomation.count[i+3]+' owned</td></tr></table>';
		}
	},

	updateBlueUpgrades: function() {
		document.getElementById("blueSlimeUpgrades").textContent = "";
		for (i = 0; i < blueupgrades.name.length; i = i+4) {
			document.getElementById("blueSlimeUpgrades").innerHTML += '<table style="background-color: #0000ff;"><tr><td rowspan="4" style="border:1px solid #cfcfcf"><img title="'+blueupgrades.tooltip[i]+'" class="img" onClick="blueupgrades.buying('+i+')" src="images/'+blueupgrades.name[i]+'.gif"></td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueupgrades.name[i]+'</td><td rowspan="4" style="border:1px solid #cfcfcf"><img title="'+blueupgrades.tooltip[i+1]+'" class="img" onClick="blueupgrades.buying('+[i+1]+')" src="images/'+blueupgrades.name[i+1]+'.gif"></td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueupgrades.name[i+1]+'</td><td rowspan="4" style="border:1px solid #cfcfcf"><img title="'+blueupgrades.tooltip[i+2]+'" class="img" onClick="blueupgrades.buying('+[i+2]+')" src="images/'+blueupgrades.name[i+2]+'.gif"></td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueupgrades.name[i+2]+'</td><td rowspan="4" style="border:1px solid #cfcfcf"><img title="'+blueupgrades.tooltip[i+3]+'" class="img" onClick="blueupgrades.buying('+[i+3]+')" src="images/'+blueupgrades.name[i+3]+'.gif"></td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueupgrades.name[i+3]+'</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">adds '+blueupgrades.efficiency[i]+'</td><td style="border:1px solid #cfcfcf; padding:3px;">adds '+blueupgrades.efficiency[i+1]+'</td><td style="border:1px solid #cfcfcf; padding:3px;">adds '+blueupgrades.efficiency[i+2]+'</td><td style="border:1px solid #cfcfcf; padding:3px;">adds '+blueupgrades.efficiency[i+3]+'</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">costs '+blueupgrades.cost[i]+' blue slimes</td><td style="border:1px solid #cfcfcf; padding:3px;">costs '+blueupgrades.cost[i+1]+' blue slimes</td><td style="border:1px solid #cfcfcf; padding:3px;">costs '+blueupgrades.cost[i+2]+' blue slimes</td><td style="border:1px solid #cfcfcf; padding:3px;">costs '+blueupgrades.cost[i+3]+' blue slimes</td></tr><tr><td style="border:1px solid #cfcfcf; padding:3px;">'+blueupgrades.count[i]+' owned</td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueupgrades.count[i+1]+' owned</td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueupgrades.count[i+2]+' owned</td><td style="border:1px solid #cfcfcf; padding:3px;">'+blueupgrades.count[i+3]+' owned</td></tr></table>';
		}
	},
	
	updatePinkSlimes: function() {
		document.getElementById("pink_slimes").textContent = game.pink_slimes;
		document.getElementById("pink_slimes_per_second").textContent = game.getPinkSlimesPerSecond();
		document.getElementById("pink_slimes_per_click").textContent = game.pinkClickValue;
	},

	updatePinkShops: function() {
		document.getElementById("pinkSlimeAutomation").textContent = "";
		for (i = 0; i < pinkautomation.name.length; i = i+4) {
			document.getElementById("pinkSlimeAutomation").innerHTML += '<table style="background-color: #ffc0cb; color: #000000;"><tr><td rowspan="4" style="border:1px solid #000000"><img title="'+pinkautomation.tooltip[i]+'" class="img" onClick="pinkautomation.buying('+i+')" src="images/'+pinkautomation.name[i]+'.gif"></td><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.name[i]+'</td><td rowspan="4" style="border:1px solid #000000"><img title="'+pinkautomation.tooltip[i+1]+'" class="img" onClick="pinkautomation.buying('+[i+1]+')" src="images/'+pinkautomation.name[i+1]+'.gif"></td><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.name[i+1]+'</td><td rowspan="4" style="border:1px solid #000000"><img title="'+pinkautomation.tooltip[i+2]+'" class="img" onClick="pinkautomation.buying('+[i+2]+')" src="images/'+pinkautomation.name[i+2]+'.gif"></td><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.name[i+2]+'</td><td rowspan="4" style="border:1px solid #000000"><img title="'+pinkautomation.tooltip[i+3]+'" class="img" onClick="pinkautomation.buying('+[i+3]+')" src="images/'+pinkautomation.name[i+3]+'.gif"></td><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.name[i+3]+'</td></tr><tr><td style="border:1px solid #000000; padding:3px;">x'+pinkautomation.income[i]+' multiplier</td><td style="border:1px solid #000000; padding:3px;">x'+pinkautomation.income[i+1]+' multiplier</td><td style="border:1px solid #000000; padding:3px;">x'+pinkautomation.income[i+2]+' multiplier</td><td style="border:1px solid #000000; padding:3px;">x'+pinkautomation.income[i+3]+' multiplier</td></tr><tr><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.cost[i]+' pink slimes</td><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.cost[i+1]+' pink slimes</td><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.cost[i+2]+' pink slimes</td><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.cost[i+3]+' pink slimes</td></tr><tr><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.count[i]+' owned</td><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.count[i+1]+' owned</td><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.count[i+2]+' owned</td><td style="border:1px solid #000000; padding:3px;">'+pinkautomation.count[i+3]+' owned</td></tr></table>';
		}
	},
	
	updatePinkUpgrades: function() {
		document.getElementById("pinkSlimeUpgrades").textContent = "";
		for (i = 0; i < pinkupgrades.name.length; i = i+4) {
			document.getElementById("pinkSlimeUpgrades").innerHTML += '<table style="background-color: #ffc0cb; color: #000000;"><tr><td rowspan="4" style="border:1px solid #000000"><img title="'+pinkupgrades.tooltip[i]+'" class="img" onClick="pinkupgrades.buying('+i+')" src="images/'+pinkupgrades.name[i]+'.gif"></td><td style="border:1px solid #000000; padding:3px;">'+pinkupgrades.name[i]+'</td><td rowspan="4" style="border:1px solid #000000"><img title="'+pinkupgrades.tooltip[i+1]+'" class="img" onClick="pinkupgrades.buying('+[i+1]+')" src="images/'+pinkupgrades.name[i+1]+'.gif"></td><td style="border:1px solid #000000; padding:3px;">'+pinkupgrades.name[i+1]+'</td><td rowspan="4" style="border:1px solid #000000"><img title="'+pinkupgrades.tooltip[i+2]+'" class="img" onClick="pinkupgrades.buying('+[i+2]+')" src="images/'+pinkupgrades.name[i+2]+'.gif"></td><td style="border:1px solid #000000; padding:3px;">'+pinkupgrades.name[i+2]+'</td><td rowspan="4" style="border:1px solid #000000"><img title="'+pinkupgrades.tooltip[i+3]+'" class="img" onClick="pinkupgrades.buying('+[i+3]+')" src="images/'+pinkupgrades.name[i+3]+'.gif"></td><td style="border:1px solid #000000; padding:3px;">'+pinkupgrades.name[i+3]+'</td></tr><tr><td style="border:1px solid #000000; padding:3px;">adds '+pinkupgrades.efficiency[i]+'</td><td style="border:1px solid #000000; padding:3px;">adds '+pinkupgrades.efficiency[i+1]+'</td><td style="border:1px solid #000000; padding:3px;">adds '+pinkupgrades.efficiency[i+2]+'</td><td style="border:1px solid #000000; padding:3px;">adds '+pinkupgrades.efficiency[i+3]+'</td></tr><tr><td style="border:1px solid #000000; padding:3px;">costs '+pinkupgrades.cost[i]+' pink slimes</td><td style="border:1px solid #000000; padding:3px;">costs '+pinkupgrades.cost[i+1]+' pink slimes</td><td style="border:1px solid #000000; padding:3px;">costs '+pinkupgrades.cost[i+2]+' pink slimes</td><td style="border:1px solid #000000; padding:3px;">costs '+pinkupgrades.cost[i+3]+' pink slimes</td></tr><tr><td style="border:1px solid #000000; padding:3px;">'+pinkupgrades.count[i]+' owned</td><td style="border:1px solid #000000; padding:3px;">'+pinkupgrades.count[i+1]+' owned</td><td style="border:1px solid #000000; padding:3px;">'+pinkupgrades.count[i+2]+' owned</td><td style="border:1px solid #000000; padding:3px;">'+pinkupgrades.count[i+3]+' owned</td></tr></table>';
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
var pic1_1_1_1 = document.getElementById("p1_1_1_1");
var pic1_1_1_2 = document.getElementById("p1_1_1_2");
var pic1_1_1_3 = document.getElementById("p1_1_1_3");
var pic1_1_1_4 = document.getElementById("p1_1_1_4");
var pic1_1_2_1 = document.getElementById("p1_1_2_1");
var pic1_1_2_2 = document.getElementById("p1_1_2_2");
var pic1_1_2_3 = document.getElementById("p1_1_2_3");
var pic1_1_2_4 = document.getElementById("p1_1_2_4");
var pic2 = document.getElementById("p2");
var pic2_1_1_1 = document.getElementById("p2_1_1_1");
var pic2_1_1_2 = document.getElementById("p2_1_1_2");
var pic2_1_1_3 = document.getElementById("p2_1_1_3");
var pic2_1_1_4 = document.getElementById("p2_1_1_4");
var pic2_1_2_1 = document.getElementById("p2_1_2_1");
var pic2_1_2_2 = document.getElementById("p2_1_2_2");
var pic2_1_2_3 = document.getElementById("p2_1_2_3");
var pic2_1_2_4 = document.getElementById("p2_1_2_4");
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
pic1_1_1_1.addEventListener("click", function(){blueupgrades.buying(0);});
pic1_1_1_2.addEventListener("click", function(){blueupgrades.buying(1);});
pic1_1_1_3.addEventListener("click", function(){blueupgrades.buying(2);});
pic1_1_1_4.addEventListener("click", function(){blueupgrades.buying(3);});
pic1_1_2_1.addEventListener("click", function(){blueautomation.buying(0);});
pic1_1_2_2.addEventListener("click", function(){blueautomation.buying(1);});
pic1_1_2_3.addEventListener("click", function(){blueautomation.buying(2);});
pic1_1_2_4.addEventListener("click", function(){blueautomation.buying(3);});
pic2_1_1_1.addEventListener("click", function(){pinkupgrades.buying(0);});
pic2_1_1_2.addEventListener("click", function(){pinkupgrades.buying(1);});
pic2_1_1_3.addEventListener("click", function(){pinkupgrades.buying(2);});
pic2_1_1_4.addEventListener("click", function(){pinkupgrades.buying(3);});
pic2_1_2_1.addEventListener("click", function(){pinkautomation.buying(0);});
pic2_1_2_2.addEventListener("click", function(){pinkautomation.buying(1);});
pic2_1_2_3.addEventListener("click", function(){pinkautomation.buying(2);});
pic2_1_2_4.addEventListener("click", function(){pinkautomation.buying(3);});

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
	game.pink_slimes += game.getPinkSlimesPerSecond();
	display.updatePinkSlimes();
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
		document.getElementById("pink_slimes_table_04").style.display = "";
		document.getElementById("pink_slimes_table_05").style.display = "";
		document.getElementById("pink_slimes_table_06").style.display = "";
		document.getElementById("pink_slimes_table_07").style.display = "";
		document.getElementById("pink_slimes_table_08").style.display = "";
		document.getElementById("pink_slimes_table_09").style.display = "";
		document.getElementById("pink_slimes_table_10").style.display = "";
		document.getElementById("pink_slimes_table_11").style.display = "";
		document.getElementById("pink_slimes_table_12").style.display = "";
		document.getElementById("ul_pink_slimes").style.display = "";
	};
	if (game.blue_slimes >= 100000) {
		document.getElementById("b97").disabled = false;
	};
	if (game.blue_slimes >= 1000000000) {
		document.getElementById("1B_blue_slimes").style.display = "";
	};
	if (game.pink_slimes >= 1000000000) {
		document.getElementById("1B_pink_slimes").style.display = "";
	};
}, 1000); // Updates currencies every second.

setInterval (function() {
	saveGame();
}, 300000); //Saves every 5 minutes.