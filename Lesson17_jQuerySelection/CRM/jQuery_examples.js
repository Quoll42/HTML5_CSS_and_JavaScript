//For example, open "contacts with js.html" in a browser and use its console to do these:

$('td');     		//Select by element type
$('#contactScreen'); 	//Select by ID
$('.controls');  	//Select by class name
$('[datetime]'); 	//Select by attribute (using [ ])
$('time[datetime]'); 	//Select by element + attribute
$('time[datetime="2014-10-21"]'); 	//Select by element + attribute=value
$('time[datetime!="2014-10-21"]'); 	//Select by element + attribute!=value

$('tbody tr:even'); //even table body rows (tr are even. And also children of tbody)

$('section:first'); //First section in the web page
$('tr:gt(0)'); //All tr elements except the first
$('select,textarea'); //All 'select' and 'textarea' elements. Note both specs are together within '' 

$('input[type="email"]');
// =>
$.expr[':'].email = function(elem) {
    return $(elem).is("input") && $(elem).attr("type") === "email";
}
$(':email');

$('form :email');

//Selection within a Context
$('tbody tr:even'); //even table body rows (tr are even. And also children of tbody)
$('#contactScreen').find('tr'); //Find tr elements within contactSCreen
$('tr','#contactScreen'); //This uses the optional 2nd parameter to provide the context
var DOM_object = $('td')[0]; //jQuery object => DOM object
$(DOM_object); //DOM object => jQuery object
$(DOM_object).text();
$(DOM_object).is(':contains("contacts")');  // => false
$(DOM_object).is(':contains("Will")');  // => true

// ============= Lesson 17 exercises "Try it" =============

//1. Select: Class=Overlay
$('.overlay');

//2. Select: all inputs that have a 'name' attribute on them.
$(':input[name]');

//3. Select: the element that has name='companyName'
companySelector = $('[name="companyName"]');
console.log(companySelector[0]); //Display the above

//4. Get all option elements inside companySelector except the 1st one.
companySelector.find('option:gt(0)')
for (i = 0 ; i < 3 ; i++) { console.log(companySelector.find('option:gt(0)')[i]) }; //Display the above

//5. Find the label for the phoneNumber field, using an attribute selector with a value, and display the text
$('label[for="phoneNumber"]').text();

//6. Find the odd numbered tr elements that are in either tbody and tfoot (but not in thead).
temp2 = $('tr:odd','tbody,tfoot');
temp2 = $('tr:even','tbody,tfoot');
for (i = 0 ; i < temp2.length ; i++) { console.log(temp2[i]) }; //Display the above
