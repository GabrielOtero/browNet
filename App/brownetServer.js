var http = require('http');
var fs = require('fs');
var url = require("url");
var path = require("path")
var webSocketServer = require('websocket').server;
var blackjack = require("./brownet").brownet;

var webSocketsServerPort = 1337; 

var server = http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);

    fs.exists(filename, function(exists) {

        if (exists && fs.statSync(filename).isDirectory()) {
            filename += 'App/frontend/html/blackjack.html';
        }

        fs.readFile(filename, "binary", function(err, file) {
            var res = blackjack.makeResponse(exists, file, err);

            response.writeHead(res.statusCode, [{"Content-Type": request.headers.accept[0]}]);
            response.write(res.resource);
            response.end();
        });
    });
});

server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

var wsServer = new webSocketServer({httpServer: server});

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    
    blackjack.storeKeyConnection(request.key, connection);

    var responseMessage = blackjack.makeYourTokenMessage(request.key);
    sendMessage(connection, responseMessage);

    connection.on('message', function(json) {

        var message = JSON.parse(json.utf8Data);
        var conn = blackjack.getConnectionToRespond(message, connection);
        var responseMessage = blackjack.makeResponseMessage(request.key, message, connection);

        sendMessage(conn, responseMessage);    

    });

    connection.on('close', function(connection) {
        console.log("disconnected")
    });
});

var sendMessage = function(conn, message){
    conn.sendUTF(JSON.stringify(message));
};