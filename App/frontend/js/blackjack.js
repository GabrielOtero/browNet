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

        if(!dealer.table.stillPlaying()){
            var response = dealer.play();
            sendMessage(response);
        }

        dealerView(message);
        
    }else if(message.data.addressee === PLAYER){
       playerView(message);            
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