staffPrototype = {
    increasePay : function(percentage) {
        this.salary += this.salary*percentage/100 ;
        return "Nice";
    },
    getFullName : function() {
        return this.firstName + ' ' + this.lastName + ' (' + this.profession + ')';
    }
}

function extend(obj) {
    function T(){};
    T.prototype = obj;
    return new T();
}

s1 = extend(staffPrototype);
s1.firstName = "Morgan";
s1.lastName = "Thomas";
s1.salary=50000;
s1.profession="Graphic Designer";
s1.getFullName();
s1.increasePay(10);

s2 = extend(staffPrototype);
s2.firstName = "Sam";
s2.lastName = "Donaldson";
s2.salary=60000;
s2.profession="HR Manager";
