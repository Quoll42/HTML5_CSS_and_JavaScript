/* This gets data from the server the first time it is called, and makes a copy,
and then returns the copy after that, i.e. it acts as a data _cache_ */

findContacts = function () {
    var contacts = null;
    return function() {
        //console.log('this is where the logic goes');
        var deferred = $.Deferred(); //This object allows you to create promises and control their state transitions
        if (contacts) {
            console.log('Returning data from the cache');
            deferred.resolve(contacts);
            return deferred.promise();
        } else {
            var promise = $.get('contacts.json');
            console.log('Returning data from the server');
            promise.done( function(data) {
                setTimeout( function() {
                    contacts = data;
                    deferred.resolve(contacts);
                }, 5000); //Simulating a slow server response by adding a 5 second delay
            } );
            return deferred.promise();
        }
    }
}(); //Have the () brackets here makes the function be executed as soon as the codeis loaded