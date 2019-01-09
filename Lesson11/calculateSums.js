function calculateSums(arrayNums) {
    if (typeof arrayNums !== "object") {
        throw "Input needs to be an array";
    }
    var sumPositive = 0;
    var sumNegative = 0;
    var i = 0; /* loop counter */
    while (i < arrayNums.length) {
        var element = arrayNums[i];
        if (element >= 0) {
            sumPositive += element;
        } else {
            sumNegative += Math.abs(element); //AG would prefer sumNegative -= element;
        }
        i++;
    }
    return sumPositive > sumNegative;
}