function Player() {
	this.status = STATUS.PLAYING,
	this.cards = [],
	this.addCard = function (card) {
		this.cards.push(card)
	},
	this.getScore = function () {
		var score = 0;
		this.cards.forEach(function (elem, idx, array) {
			if(elem === "A"){
				if(array.indexOf("K") == -1 && array.indexOf("Q") == -1 && array.indexOf("J") == -1){
					score += 11;
				}else{
					score += 1;
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