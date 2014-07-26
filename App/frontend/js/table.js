STATUS = {
    PLAYING : "playing",
}

function Table () {
	   this.players = [];
}

Table.prototype.addPlayer = function(playerKey){
    this.players.push({key: playerKey, status: STATUS.PLAYING})
}
