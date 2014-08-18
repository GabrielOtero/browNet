function Table () {
	   this.players = [];
}

Table.prototype.addPlayer = function(playerKey){
    this.players[playerKey] = new Player();
}

Table.prototype.registerStoppedPlayer = function(playerKey){
	this.players[playerKey].status = STATUS.STOPPED;
}

Table.prototype.stillPlaying = function(){
	for(p in this.players){
		if(this.players[p].status === STATUS.PLAYING){
			return true;
		}
	}

	return false;
}

Table.prototype.getHighestScore = function(){
	var highestScore = 0;
	for(p in this.players){
		var score = this.players[p].getScore();
		if(score > highestScore){
			highestScore = score;
		}
	}

	return highestScore;
}