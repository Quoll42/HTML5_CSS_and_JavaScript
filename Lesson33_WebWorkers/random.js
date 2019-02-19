self.addEventListener('message', function(msg) { //Be notified when a message is available
    var data = msg.data; //and extract data from the message.
    var result = []; //Prepare a result...
    for (var i=0; i < data; i++) {
        result.push(Math.random());
    }
    result.sort();
    self.postMessage(result[0]); //then return the result back to the main browser thread
}, false);