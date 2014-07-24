var connection = new WebSocket('ws://127.0.0.1:1337');

function Brownet (callback) {

	 window.WebSocket = window.WebSocket || window.MozWebSocket;
	 
	 connection.onmessage = function (json) {
	 	callback(json);
	 }
}

Brownet.prototype.sendMessage = function (message){
  	connection.send(JSON.stringify(message));
}