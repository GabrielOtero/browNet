function Player(status, score) {
	this.status = status,
	this.score = score
}

function Table () {
	   this.players = [];
}

Table.prototype.addPlayer = function(playerKey){
    this.players[playerKey] = new Player(STATUS.PLAYING, 0);
}

Table.prototype.registerStoppedPlayer = function(playerKey){
	this.players[playerKey].status = STATUS.STOPPED;
}


//Fix-m Draw A and K score should be 14... score returning 38!!
Table.prototype.registerDrawnCard = function (playerKey, card) {
	if(card === "A"){
		if(this.players[playerKey].score >= 11){
			this.players[playerKey].score += 1;
		}else{
			this.players[playerKey].score += 11;
		}
	}
	else if(card === "K"){
		this.players[playerKey].score += 13;
	}
	else if(card === "Q"){
		this.players[playerKey].score += 12;
	}
	else if(card === "J"){
		this.players[playerKey].score += 11;
	}else{
		this.players[playerKey].score += parseInt(card);
	}
}