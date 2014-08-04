function Dealer(){
    this.table = new Table()
    this.deck = ["A","2","3","4","5","6","7","8","9","10","J","Q","K",
                "A","2","3","4","5","6","7","8","9","10","J","Q","K",
                "A","2","3","4","5","6","7","8","9","10","J","Q","K",
                "A","2","3","4","5","6","7","8","9","10","J","Q","K",];

    this.deck.sort(function(){return Math.random() - 0.5});
    this.score = 0;
};


Dealer.prototype.deal = function(message){
     var messageTo = {type: "" ,data : null};

    if (message.type === 'newCard') {
        var key = message.data.from;
        var card = this.deck.pop();

        var playerStatus = this.table.registerDrawnCard(key, card);

        var data = {to:  key, card: card,  addressee: PLAYER, status: playerStatus, score: this.table.players[key].getScore()}

        messageTo.type = 'cardDrawn';
        messageTo.data = data;
    }
    else if (message.type === 'newPlayer'){
        var data = {addressee: PLAYER, to: message.data.from};

        messageTo.type = 'newPlayerAccepted' ,
        messageTo.data = data;

        this.table.addPlayer(message.data.from);    
    }
    else if (message.type === 'stopAsking'){

        var playerKey = message.data.from;
        var score = this.table.players[playerKey].getScore();

        var data = {addressee: PLAYER, to: message.data.from, score: score, dealersPlay: this.play(score), dealerScore: this.score};

        messageTo.type = 'stoppedAsking' ,

        messageTo.data = data;

        this.table.registerStoppedPlayer(playerKey);
    }

    return messageTo
}

Dealer.prototype.play = function (score) {
    this.score = 0;
    var cardsPlayed = [];

    while (this.score <= score && this.score <= BLACKJACK){
        var card = this.deck.pop();
        cardsPlayed.push(card);

        cardsPlayed.sort(function(a, b){if(a == "A") {return 1} else{ return -1}});

        if(card === "A"){
            if(this.score <= 10){
                this.score += 11
            }else{
                this.score += 1
            }
        }else if(card === "K" || card === "Q" || card === "J"){
            this.score += 10;
        }else{
            this.score += parseInt(card);
        }
    }

    return cardsPlayed;
}


























