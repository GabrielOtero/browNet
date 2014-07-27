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