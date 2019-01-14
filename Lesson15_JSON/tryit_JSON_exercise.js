obj = {
    studentName: 'Ollah Brown',
    school: 'CSHS',
    grades: [
        {subject: 'English',
         grade: 'A'},
        {subject: 'Algebra',
         grade: 'A+'},
        {subject: 'Geometry',
         grade: 'B'}
    ]
}

function clone(obj) {
    var tmpJ = JSON.stringify(obj);
    var tmpO = JSON.parse(tmpJ);
    return tmpO;
}

obj2 = clone(obj)