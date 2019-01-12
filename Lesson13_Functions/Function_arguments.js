function add() {
    var result = 0;
    for (let i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }
    return result;
}

add(1,2,3,4,5)