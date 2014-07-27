function Player() {
	this.status = STATUS.PLAYING,
	this.cards = [],
	this.addCard = function (card) {
		this.cards.push(card)
	},
	this.getScore = function () {
		var score = 0;
		
		this.cards.sort(function(a, b){if(a == "A") {return 1} else{ return -1}});

		this.cards.forEach(function (elem, idx, array) {
			if(elem === "A"){
				if(score <= 10){
					score += 11
				}else{
					score += 1
				}
			}else if(elem === "K"){
				score += 13;
			}else if( elem === "Q"){
				score += 12;
			}else if( elem === "J"){
				score += 11;
			}else{
				score += parseInt(elem);
			}
		});

		return score;
	}
}

function Table () {
	   this.players = [];
}

Table.prototype.addPlayer = function(playerKey){
    this.players[playerKey] = new Player();
}

Table.prototype.registerStoppedPlayer = function(playerKey){
	this.players[playerKey].status = STATUS.STOPPED;
}

Table.prototype.registerDrawnCard = function (playerKey, card) {
	this.players[playerKey].addCard(card);
}