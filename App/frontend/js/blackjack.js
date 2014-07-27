var DEALER = "DEALER";
var PLAYER = "PLAYER";

var dealer = new Dealer();
var dealerToken = "";

var brownet = new Brownet(function(json){
    var message = JSON.parse(json.data); 

    if (message.type === 'yourToken') {
        dealerToken = message.data.requestKey;
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
            addMessage("Accepted");
            $('#btnNewCard').removeClass("hidden");
        }
        else if (message.type === "cardDrawn"){
            addMessage("Card Drawn: " + message.data.card);
        }
        else if (message.type === "stoppedAsking"){
            addMessage("Stopped asking. Your score is " + message.data.score);
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

    $("#btnNewCard").attr("disabled", "disabled")
    $("#btnStopAsk").attr("disabled", "disabled")

    sendMessage(message);
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
    addMessage("Your Dealer Token: " + dealerToken );
    window.prompt("Your dealer token, you should Ctrl+C on it! :)", dealerToken)
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