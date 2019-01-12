myNumArray = [1,4,5,9,10];

function addToTotal(currentTotal,valueToAdd) {
    console.log('currentTotal = ' + currentTotal + '. valueToAdd = ' + valueToAdd)
    return currentTotal + valueToAdd;
}

myNumArray.reduce(addToTotal,0,)

/* => the output below:
currentTotal = 0. valueToAdd = 1
currentTotal = 1. valueToAdd = 4
currentTotal = 5. valueToAdd = 5
currentTotal = 10. valueToAdd = 9
currentTotal = 19. valueToAdd = 10
29 */