var blackjackGame = {

    mapKeyConnection : [],

    makeResponse : function(exist, file, err){
        var response = {statusCode : 0, resource : ""}  
        if(!exist){
          response.statusCode = 404;
        }else if(err) {        
            response.statusCode = 500;
            response.resource = err;
        }else{
            response.statusCode = 200;
            response.resource  = file;
        }  

        return response;
    },

    makeResponseMessage : function(requestKey, message, connection){
        var returnMessage = {};    

        if(message.type == "newDealer"){

            returnMessage.type = "youreNewDealer";
            returnMessage.data = {requestKey : requestKey, addressee: "DEALER"};

        }else{
          var data = message.data;
          data.from =  connection.bjkey;

          returnMessage.type  = message.type;
          returnMessage.data =  data;
        }

        return returnMessage;
    },

    getConnectionToRespond : function(message, connection){
        if(message.type == "newDealer"){
          return connection;
        }else{
          var conn = this.mapKeyConnection[message.data.to];
          return conn;
        }
    },
    storeKeyConnection : function(requestKey, connection){
        this.mapKeyConnection[requestKey] = connection;
        connection.bjkey = requestKey; 
    },

};

exports.blackjackGame = blackjackGame;