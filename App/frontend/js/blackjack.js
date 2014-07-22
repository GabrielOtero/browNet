var DEALER = "DEALER";
var PLAYER = "PLAYER";

var connection = new WebSocket('ws://127.0.0.1:1337');
var dealer = new Dealer();
var dealerToken = "";

$(function () {
 
    window.WebSocket = window.WebSocket || window.MozWebSocket;
 
    connection.onmessage = function (json) {

        var message = JSON.parse(json.data); 

        if (message.type === 'yourToken') {
            dealerToken = message.data.requestKey;
            addMessage("Your Dealer Token: " + dealerToken);
            hideButtons();
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
        }
    };
});

function sendMessage(message){
    connection.send(JSON.stringify(message));
}

function newCard(){
    var data = {addressee: DEALER, to: dealerToken}
    var message = {type: 'newCard', data: data};

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
    var json = {data: {}, type : "myToken"}
    sendMessage(json);
}

function ShowPlayerOptions(){
    $('#GeneretedDealerToken').removeClass("hidden").append("Insert Token here: ");
    $('#InputDealerToken').removeClass("hidden");
    $('#btnOk').removeClass("hidden");
    hideButtons();
}

function beAPlayer(){
    dealerToken = $("#InputDealerToken").val();
    var json = {data: {to: dealerToken, addressee: DEALER}, type : "newPlayer"}
    sendMessage(json);
}