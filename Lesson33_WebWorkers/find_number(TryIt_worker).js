self.addEventListener('message', function(msg) { //Be notified when a message is available
    //var data = msg.data;    //and extract data from the message.
    result = findLargest(); //Do something here to prepare a result
    self.postMessage(result); //then return the result back to the main browser thread
} , false);

function findLargest() {
    var max = 0;
    for (var i=0; i <= 600000000; i++) {
        max = Math.max(max,Math.random());
    };
    return max;
}