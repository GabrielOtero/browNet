describe("Table", function () {
	describe("on addPlayer", function () {

		table = new Table();

		table.addPlayer("DEe8Q7ZXK514aOZIUKqOzQ==")
		it("should add a player on player list", function(){
			expect(table.players[0].key).toBe("DEe8Q7ZXK514aOZIUKqOzQ==");
			expect(table.players[0].status).toBe("playing");
		});
	})
});