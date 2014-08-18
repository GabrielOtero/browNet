describe("Player", function () {
	describe("on getScore only number cards", function () {

		var player = new Player();

		player.addCard("8");
		player.addCard("3");

		it("should return the sum", function(){
			expect(player.getScore()).toBe(11);
		});
	});
	describe("on getScore with a K", function () {

		var player = new Player();

		player.addCard("K");
		player.addCard("6");

		it("should consider K as 10 points", function(){
			expect(player.getScore()).toBe(16);
		});
	});
	describe("on getScore with an Ace and cards' sum less then or equal Ten", function () {

		var player = new Player();

		player.addCard("A");
		player.addCard("6");

		it("should consider Ace as 11 points", function(){
			expect(player.getScore()).toBe(17);
		});
	});
	describe("on getScore with an Ace and cards' sum greater then Ten", function () {

		var player = new Player();

		player.addCard("A");
		player.addCard("K");

		it("should consider Ace as 1 points", function(){
			expect(player.getScore()).toBe(21);
		});
	});
	describe("on getScore with an Ace and cards' sum greater then Ten", function () {

		var player = new Player();

		player.addCard("6");
		player.addCard("3");
		player.addCard("5");
		player.addCard("A");

		it("should consider Ace as 1 points", function(){
			expect(player.getScore()).toBe(15);
		});
	});
});
describe("Table", function () {
	describe("on addPlayer", function () {

		var table = new Table();

		table.addPlayer("asdf")
		it("should add a player on players' list", function(){
			//expect(table.players["asdf"]).toEqual({status: STATUS.PLAYING, score: 0});
			expect(table.players["asdf"].status).toBe(STATUS.PLAYING);
			expect(table.players["asdf"].getScore()).toBe(0);
		});
	});
	describe("on register Stopped Player", function () {

		var table = new Table();

		player = {key : "qwerty"}

		table.addPlayer(player.key);

		table.registerStoppedPlayer(player.key);

		it("should change player's status to stoped", function(){
			//expect(table.players["qwerty"]).toEqual( {status: STATUS.PLAYING, score :0});
			expect(table.players["qwerty"].status).toBe(STATUS.STOPPED);
			expect(table.players["qwerty"].getScore()).toBe(0);
		});
	})
	describe("on register Drawn Card", function () {

		var table = new Table();

		player = {key : "qwerty"}

		table.addPlayer(player.key);

		var status = table.players[player.key].addCard("8");;

		it("should register player's card", function(){
			expect(table.players["qwerty"].cards[0]).toBe("8");
			expect(status).toBe(STATUS.PLAYING);
		});
	});
	describe("on register Drawn Card exceeded 21", function () {

		var table = new Table();

		player = {key : "qwerty"}

		table.addPlayer(player.key);

		table.players[player.key].addCard("J");
		table.players[player.key].addCard("J");
		var status = table.players[player.key].addCard("K");

		it("should register player's card and status exceeded", function(){
			expect(status).toBe(STATUS.EXCEEDED);
		});
	});

	describe("on check everyone has stopped", function(){
		var table = new Table();

		table.addPlayer("qwerty");
		table.addPlayer("asdfg");
		table.addPlayer("foobar");

		var status = table.stillPlaying();

		it("shoud return false ", function(){
			expect(status).toBe(true);
		});
	});

	describe("on check everyone has stopped", function(){
		var table = new Table();

		table.addPlayer("qwerty");
		table.addPlayer("asdfg");
		table.addPlayer("foobar");

		table.players["qwerty"].status = STATUS.STOPPED;
		table.players["foobar"].status = STATUS.STOPPED;
		table.players["asdfg"].status = STATUS.EXCEEDED;

		var status = table.stillPlaying();

		it("shoud return false ", function(){
			expect(status).toBe(false);
		});
	});
	describe("on get highest score", function(){
		var table = new Table();

		table.addPlayer("qwerty");
		table.addPlayer("asdfg");
		table.addPlayer("foobar");

		table.players["qwerty"].cards = ["1","2", "3"]
		table.players["asdfg"].cards = ["Q", "K"]
		table.players["foobar"].cards = ["9", "10"]

		var highest = table.getHighestScore();

		it("shoud return 20 ", function(){
			expect(highest).toBe(20);
		});
	});
});




































