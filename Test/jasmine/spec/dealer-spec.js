describe("Dealer", function () {

	describe("on new player message", function () {

		var data = {from : "player"}
		var dealer = new Dealer();
		
		var message = { 
            type: 'newPlayer', 
            data: data,
            addressee: "player"
        }

		var postBack = dealer.deal(message);

		it("should return 'accept' message", function(){

			expect(postBack.type).toBe("newPlayerAccepted");
			
			expect(postBack.data.to).toBe("player");
			expect(postBack.data.addressee).toBe(PLAYER);
			expect(Object.keys(dealer.table.players).length).toBe(1);
		});
	});
	describe("on new card message", function () {

		var data = {from : "player"}
		var dealer = new Dealer();


		var message = { 
            type: 'newPlayer', 
            data: data,
            addressee: "player"
        }

		dealer.deal(message);

		
		var message = { 
            type: 'newCard', 
            data: data,
            addressee: "player"
        }

		var postBack = dealer.deal(message);

		it("should return 'new card' message", function(){

			expect(postBack.type).toBe("cardDrawn");
			
			expect(postBack.data.to).toBe("player");
			expect(postBack.data.card).toBeTruthy();
			expect(postBack.data.addressee).toBe(PLAYER);
		});
	});
	describe("on stop asking message", function () {

		var data = {from : "player"}
		var dealer = new Dealer();

		dealer.deck = ["5", "5", "5", "5"]
		
		var message = { 
            type: 'newPlayer', 
            data: data,
            addressee: "player"
        }

		dealer.deal(message);

		var message = { 
            type: 'newCard', 
            data: data,
            addressee: "player"
        }

		dealer.deal(message);
		dealer.deal(message);
		dealer.deal(message);

		var message = { 
            type: 'stopAsking', 
            data: data,
            addressee: "player"
        }

        var postBack = dealer.deal(message);

		it("should return 'stopped asking' message", function(){

			expect(postBack.type).toBe("stoppedAsking");
			
			expect(postBack.data.to).toBe("player");
			expect(postBack.data.addressee).toBe(PLAYER);
			expect(postBack.data.score).toBe(15);
		});
	})
});