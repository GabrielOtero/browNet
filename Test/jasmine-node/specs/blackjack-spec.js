var blackjack = require("../../../App/blackjackGame.js").blackjackGame;

describe("blackjack", function () {

	describe("on 'makeResponse' with no errors", function () {
		var response = blackjack.makeResponse(true, "file" , null );

		it("should return success response", function(){

			expect(response.statusCode).toBe(200);
			expect(response.resource).toBe("file");

		});
	});

	describe("on 'makeResponse' with errors", function () {
		var response = blackjack.makeResponse(true , null, "unexpected Error");

		it("should return fail response", function(){

			expect(response.statusCode).toBe(500);
			expect(response.resource).toBe("unexpected Error");

		});
	});

	describe("on 'makeResponse' with errors", function () {
		var response = blackjack.makeResponse(false, null, null);

		it("should return fail response", function(){

			expect(response.statusCode).toBe(404);
			expect(response.resource).toBe("");

		});
	});

	describe("on 'makeResponseMessage' with Dealer", function () {

		var message = {data: {to:"josh"}, type : "otherMessage"};
		var requestKey = "123";	
		var connection = {bjkey: "xyz"};

		var response = blackjack.makeResponseMessage(requestKey, message, connection);


		it("should return 'otherMessage' response", function(){

			expect(response.type).toBe("otherMessage");
			expect(response.data).toEqual({to:"josh", from: "xyz"});

		});
	});

	describe("on 'getConnectionToRespond' with Dealer", function () {

		var json = {data: {to : "abc"}, type : "otherMessage"};
		var connection = {bjkey: "xyz"};
		blackjack.mapKeyConnection["abc"] = connection;

		var conn = blackjack.getConnectionToRespond(json, connection);


		it("should return 'otherMessage' response", function(){
			expect(conn).toEqual({bjkey: "xyz"});

		});
	});

});
