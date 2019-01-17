/* Use the commands here in the Chrome with "domexample.html".
(After that, open "domexample_responding2events.html".) */

// SELECTING ELEMENTS ================
document.getElementById('daysOfWeek');
document.getElementById('daysOfWeek').nodeType;
document.getElementById('daysOfWeek').nodeName;

document.getElementsByClassName('mainHeader');
document.getElementsByClassName('mainHeader')[0];

document.getElementsByTagName('Li');
document.getElementsByTagName('Li')[2];

document.getElementsByTagName('ul')[0].nodeName;

// TRAVERSING THE DOM ================
obj = document.getElementById('daysOfWeek');

//find all the children for that node, ie the Li elements
obj.childNodes

//find the 1st child of that node
obj.firstElementChild

//find the parent for that node, ie the body element
obj.parentNode

//Also note: you can use event.target.nextElementSibling to find the next element in the DOM with the same parent.


// MANIPULATING THE DOM ================
// Firstly, construct a doument fragment
newLi = document.createElement('li');
saturday = document.createTextNode('Saturday');
newLi.appendChild(saturday);
// Secondly, insert it into the DOM
document.getElementById('daysOfWeek').appendChild(newLi);
