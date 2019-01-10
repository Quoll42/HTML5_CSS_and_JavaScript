function countForArray(array, condition) {
    var result = 0;
    for (let i = 0; i < array.length; i++) {
        var element = array[i];
        if (condition(element)) {
            result++;
        }
    }
    return result;
}

f1 = function isPositive(num) {
    return num >= 0;
}

countForArray([2,3,5,-99],f1)

countForArray([2,3,5,-99],function(num) {
    return num < 0;
})

countForArray([-2,3,-5,-99],function(num) {
    return num < 0;
})

[-2,-2,1,-3,5,6].filter(function(num) {return num % 2 == 0;}).map(function(num){return Math.abs(num)})
