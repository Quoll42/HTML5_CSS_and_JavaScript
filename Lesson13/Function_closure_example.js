function getCounter() {
    var myCount = 0;
    return function() {
        return myCount++;
    };
}

counter = getCounter();

counter()
