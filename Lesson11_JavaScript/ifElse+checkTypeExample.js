function add(v1, v2) {
    if (typeof v1 === "number" && typeof v2 === "number") {
        return v1+v2;
    } else {
        throw "both arguments must be numbers"
    }
}
console.log(add(1,6));
console.log(add(1,"abc"));
console.log(add(4,3));