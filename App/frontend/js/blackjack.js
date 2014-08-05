var DEALER = "DEALER";
var PLAYER = "PLAYER";

var dealer = new Dealer();
var dealerToken = "";
var myToken = "";

var brownet = new Brownet(function(json){
    var message = JSON.parse(json.data); 

    if (message.type === 'yourToken') {
        myToken = message.data.requestKey;
        return;
    }
    
    if(message.data.addressee === DEALER){          
        var response = dealer.deal(message);

        sendMessage(response);

        if(message.type === 'newPlayer'){
            addMessage("New player has connected");
        }
        
    }else if(message.data.addressee === PLAYER){
                   
        if (message.type === 'newPlayerAccepted'){
            if(message.data.origin == myToken){
                addMessage("Accepted");
                $('#btnNewCard').removeClass("hidden");
            }else{
                console.info(message.data.origin + " new player has connected")
            }
        }
        else if (message.type === "cardDrawn"){
            if(message.data.origin == myToken){
                addMessage("Card Drawn: " + message.data.card + " ("+message.data.score+" points)");
            
                if(message.data.status == STATUS.EXCEEDED){
                    addMessage("awww you exceeded 21 points, your score is " + message.data.score);
                    disableAsking();
                } else if(message.data.status == STATUS.BLACKJACK){
                    addMessage("CONGRATULATIONS, YOU HAVE BLACKJACKED (" + message.data.score + "POINTS!!!!)");
                    disableAsking();
                }
            }else{
                console.info(message.data.origin + " Card Drawn: " + message.data.card + " ("+message.data.score+" points)");
            }
        }
        else if (message.type === "stoppedAsking"){
            var dealerScore = message.data.dealerScore;
            var score = message.data.score;
            addMessage("Stopped asking. Your score is " + score + "points");
            
            for(var i = 0; i < message.data.dealersPlay.length; i++){
                var play = message.data.dealersPlay[i];
                addMessage("Dealers draw a card: " + play);
            }
            
            if(dealerScore > score && dealerScore <= BLACKJACK){
                addMessage("awww DEALER got " + dealerScore + " points");   
            }else{
                addMessage("CONGRATULATIONS, YOU WIN (dealer got " + dealerScore + " points)");
            }
        }
    }
})


function sendMessage(message){
    brownet.sendMessage(message);
}

function newCard(){
    var data = {addressee: DEALER, to: dealerToken}
    var message = {type: 'newCard', data: data};

    sendMessage(message);
}

function stopAsking () {
    var data = {addressee: DEALER, to: dealerToken}
    var message = {type: 'stopAsking', data: data};

    disableAsking();
    sendMessage(message);
}

function disableAsking(){
    $("#btnNewCard").attr("disabled", "disabled")
    $("#btnStopAsk").attr("disabled", "disabled")
}

function addMessage(message) {
    var content = $('#content');       
    content.prepend('<p> Server </span> ' +': ' + message + '</p>');
}

function hideButtons() {
    $('#DealerBtn').addClass("hidden");
    $('#PlayerBtn').addClass("hidden");
}

function beADealer(){
    addMessage("Your Dealer Token: " + myToken );
    window.prompt("Your dealer token, you should Ctrl+C on it! :)", myToken)
    hideButtons();
}

function ShowPlayerOptions(){
    $('.Container-token').removeClass("hidden");
    $('#InputDealerToken').focus();
    hideButtons();
}

function beAPlayer(){
    dealerToken = $("#InputDealerToken").val();
    $(".playerOptions").removeClass("hidden");
    $(".Container-token").addClass("hidden");
    var json = {data: {to: dealerToken, addressee: DEALER}, type : "newPlayer"}
    sendMessage(json);
}