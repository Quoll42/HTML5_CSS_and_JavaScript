function reverse(aString) {
    if (typeof aString !== "string") {
        throw "You supplied me with a non-string; that makes non-sense!";
    }
    var rString = ''; /* This will hold the reversed string */
    for (let i = 0; i < aString.length; i++) {
        rString += aString.charAt(aString.length-i-1);
    }
    return rString;
}