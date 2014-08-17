var connection = new WebSocket('wss://brownet-c9-gahotero.c9.io');

function Brownet (callback) {

	 window.WebSocket = window.WebSocket || window.MozWebSocket;
	 
	 connection.onmessage = function (json) {
	 	callback(json);
	 }
}

Brownet.prototype.sendMessage = function (message){
  	connection.send(JSON.stringify(message));
}