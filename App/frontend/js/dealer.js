function Dealer(){
    this.table = new Table()
    this.deck = ["A","2","3","4","5","6","7","8","9","10","J","Q","K",
                "A","2","3","4","5","6","7","8","9","10","J","Q","K",
                "A","2","3","4","5","6","7","8","9","10","J","Q","K",
                "A","2","3","4","5","6","7","8","9","10","J","Q","K",];

    this.deck.sort(function(){return Math.random() - 0.5});
};


Dealer.prototype.deal = function(message){
     var messageTo = {type: "" ,data : null};

    if (message.type === 'newCard') {
        var key = message.data.from;
        var card = this.deck.pop();

        var data = {to:  key, card: card,  addressee: PLAYER}

        messageTo.type = 'cardDrawn';
        messageTo.data = data;

        this.table.registerDrawnCard(key, card)
    }
    else if (message.type === 'newPlayer'){
        var data = {addressee: PLAYER, to: message.data.from};

        messageTo.type = 'newPlayerAccepted' ,
        messageTo.data = data;

        this.table.addPlayer(message.data.from);    
    }
    else if (message.type === 'stopAsking'){

        var playerKey = message.data.from;
        var data = {addressee: PLAYER, to: message.data.from, score: this.table.players[playerKey].getScore()};

        messageTo.type = 'stoppedAsking' ,
        messageTo.data = data;

        this.table.registerStoppedPlayer(playerKey);
    }

    return messageTo
}