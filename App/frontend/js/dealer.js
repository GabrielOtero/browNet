DEALER = "dealer"
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
     var key = message.data.from;

    if (message.type === 'newCard') {
        var card = this.deck.pop();

        var playerStatus = this.table.players[key].addCard(card);

        var data = {to:  Object.keys(this.table.players), origin: key, card: card,  addressee: PLAYER, status: playerStatus, score: this.table.players[key].getScore()}

        messageTo.type = 'cardDrawn';
        messageTo.data = data;
    }
    else if (message.type === 'newPlayer'){
        this.table.addPlayer(message.data.from);

        var data = {addressee: PLAYER, to: Object.keys(this.table.players), origin: message.data.from};

        messageTo.type = 'newPlayerAccepted' ,
        messageTo.data = data;


    }
    else if (message.type === 'stopAsking'){

        var playerKey = message.data.from;
        var score = this.table.players[playerKey].getScore();
        var data = {}

        this.table.registerStoppedPlayer(playerKey);

        data = {addressee: PLAYER, to: Object.keys(this.table.players), score: score, origin: key};
        messageTo.type = 'stoppedAsking' ;
        messageTo.data = data;

    }

    return messageTo
}

Dealer.prototype.play = function () {
    var score = this.table.getHighestScore();
    this.score = 0;
    
    var dealer = new Player();
    var messageTo = {};

    while(dealer.getScore() <= score && dealer.getScore() < BLACKJACK){
        dealer.addCard(this.deck.pop())
    }

    this.score = dealer.getScore()

    data = {addressee: PLAYER, to: Object.keys(this.table.players), dealersPlay: dealer.cards, dealerScore: this.score};
    messageTo.type = 'everyoneStoppedAsking' ;
    messageTo.data = data;

    return messageTo;

}


























