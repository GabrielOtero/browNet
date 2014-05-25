describe("Dealer", function () {

	describe("on new card message", function () {

		var data = {from : "player"}
		var dealer = new Dealer();
		
		var message = { 
            type: 'newCard', 
            data: data,
            addressee: "player"
        }

		var postBack = dealer.deal(message);

		it("should return new card's message", function(){

			expect(postBack.type).toBe("cardDrawn");
			
			expect(postBack.data.to).toBe("player");
			expect(postBack.data.card).toBeTruthy();
			expect(postBack.data.addressee).toBe("PLAYER");
		});
	})
});