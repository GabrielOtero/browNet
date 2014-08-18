var score = 0

function playerView (message) {
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
	}else if(message.type === "stoppedAsking"){
		if(message.data.origin == myToken){
			disableAsking();
			score = message.data.score;
		    addMessage("Stopped asking. Your score is " + score + "points");
		    addMessage("waiting for other players to stop asking")
		}
	}else if (message.type === "everyoneStoppedAsking"){
		var dealerScore = message.data.dealerScore
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

function disableAsking(){
    $("#btnNewCard").attr("disabled", "disabled")
    $("#btnStopAsk").attr("disabled", "disabled")
}