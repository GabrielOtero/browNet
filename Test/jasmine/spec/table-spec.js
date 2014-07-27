describe("Table", function () {
	describe("on addPlayer", function () {

		var table = new Table();

		table.addPlayer("asdf")
		it("should add a player on players' list", function(){
			//expect(table.players["asdf"]).toEqual({status: STATUS.PLAYING, score: 0});
			expect(table.players["asdf"].status).toBe(STATUS.PLAYING);
			expect(table.players["asdf"].score).toBe(0);
		});
	});
	describe("on registerStoppedPlayer", function () {

		var table = new Table();

		player = {key : "qwerty"}

		table.addPlayer(player.key);

		table.registerStoppedPlayer(player.key);

		it("should change player's status to stoped", function(){
			//expect(table.players["qwerty"]).toEqual( {status: STATUS.PLAYING, score :0});
			expect(table.players["qwerty"].status).toBe(STATUS.STOPPED);
			expect(table.players["qwerty"].score).toBe(0);
		});
	})
	describe("on registerDrawnCard not a letter", function () {

		var table = new Table();

		player = {key : "qwerty"}

		table.addPlayer(player.key);

		table.registerDrawnCard(player.key, "8");

		it("should change player's score", function(){
			expect(table.players["qwerty"].score).toBe(8);
		});
	});
	describe("on registerDrawnCard a K", function () {

		var table = new Table();

		player = {key : "qwerty"}

		table.addPlayer(player.key);

		table.registerDrawnCard(player.key, "K");

		it("should change player's score", function(){
			expect(table.players["qwerty"].score).toBe(13);
		});
	});
	describe("on registerDrawnCard an Ace", function () {

		var table = new Table();

		player = {key : "qwerty"}

		table.addPlayer(player.key);

		table.registerDrawnCard(player.key, "A");

		it("should change player's score", function(){
			expect(table.players["qwerty"].score).toBe(11);
		});
	});
});