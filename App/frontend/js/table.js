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
	var player = this.players[playerKey];
	player.addCard(card);
	if(player.getScore() > BLACKJACK){
		player.status = STATUS.EXCEEDED;
	}
	if(player.getScore() == BLACKJACK){
		player.status = STATUS.BLACKJACK;
	}

	return player.status
}