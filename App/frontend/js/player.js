function Player() {
	this.status = STATUS.PLAYING,
	this.cards = [],
	this.addCard = function (card) {
		this.cards.push(card)
	},
	this.getScore = function () {
		var score = 0;
		
		this.cards.sort(function(a, b){if(a == "A") {return 1} else{ return -1}});

		this.cards.forEach(function (elem, idx, array) {
			if(elem === "A"){
				if(score <= 10){
					score += 11
				}else{
					score += 1
				}
			}else if(elem === "K" || elem === "Q" || elem === "J"){
				score += 10;
			}else{
				score += parseInt(elem);
			}
		});

		return score;
	}
}
