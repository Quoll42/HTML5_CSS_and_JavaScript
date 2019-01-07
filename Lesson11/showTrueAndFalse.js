numTrue = 0;

function whatAmI(v1) {
    console.log(v1 + ' is ' + !!v1);
    if (v1) { numTrue++; }
}

whatAmI(0);
whatAmI(1);
whatAmI(2);
whatAmI(3);
whatAmI("");
whatAmI("klm");
console.log(numTrue);