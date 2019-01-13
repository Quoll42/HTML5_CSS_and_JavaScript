function createStaffMember(initialSalary,firstName,lastName) {
    var salary = null; //Created as a local variable instead of an object property
    o = {
        setSalary : function name() {
            if (initialSalary > 0 && initialSalary < 200000) {
                salary = initialSalary; //Sets up closure
            } else {
                throw 'The salary must be between 0 and 200000';
            }
        },
        getSalary : function() { //Without such a function, the salary couldn't be seen externally!
            return salary;
        },
        firstName : firstName,
        lastName : lastName
    };
    o.setSalary(initialSalary);
    return o;
}

s5 = createStaffMember(50000, 'Tom', 'Braithwaite');
s5.lastName;
s5.getSalary();