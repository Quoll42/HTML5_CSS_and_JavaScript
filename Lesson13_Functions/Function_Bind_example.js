function getCount() {
    return this.myCount++; //Note the use of *this.* And that myCount isn't defined (it will be supplied...)
}

var counter2 = getCount.bind({myCount:100});
// The bind method associates the function with {myCount:100} <= which is an object

counter2(); // => 100
counter2(); // => 101
counter2(); // => 102