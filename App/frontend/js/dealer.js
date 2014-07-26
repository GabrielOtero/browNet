var PLAYER = "PLAYER";

function Dealer(){
    this.table = new Table()
    this.deck = ["1","2","3","4","5","6","7","8","9","10","J","Q","K",
                "1","2","3","4","5","6","7","8","9","10","J","Q","K",
                "1","2","3","4","5","6","7","8","9","10","J","Q","K",
                "1","2","3","4","5","6","7","8","9","10","J","Q","K",];

    this.deck.sort(function(){return Math.random() - 0.5});
};


Dealer.prototype.deal = function(message){
     var messageTo = {type: "" ,data : null};

    if (message.type === 'newCard') {
        var data = {to:  message.data.from, card: this.deck.pop(),  addressee: PLAYER}

        messageTo.type = 'cardDrawn';
        messageTo.data = data;

        this.table.addPlayer(message.data.from);
    }
    else if (message.type === 'newPlayer'){
        var data = {addressee: PLAYER, to: message.data.from};
        messageTo.type = 'newPlayerAccepted' ,
        messageTo.data = data     
    }

    return messageTo
}