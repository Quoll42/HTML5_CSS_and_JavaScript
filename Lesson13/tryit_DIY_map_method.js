function map(anArray,aFunction) {
    result = [];
    for (let i = 0; i < anArray.length; i++) {
        var element = anArray[i];
        var elementFunc = aFunction(element);
        result.push(elementFunc);
    }
    return result;
}

myNumArray = [1,4,5,9,10];

function incrementOddNumbers(num) {
    var result = num;
    if (num % 2 != 0) {
        result++;
    }
    return result;
}

funcyMagic = incrementOddNumbers;

map(myNumArray,funcyMagic);
