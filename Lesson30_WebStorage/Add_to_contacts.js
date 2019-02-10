
/* The 1st version of the function below would work to store 1 contact */ 
function store(contact) {
    var c = JSON.stringify(contact);
    localStorage.setItem('contact',c);
}

/* This 2nd version of the function works for storing multiple contacts */ 
function store(contact) {
    var contactsStored = localStorage.getItem('contacts');
    var contacts = [];
    if (contactsStored) {
        contacts = JSON.parse(contactsStored);
    }
    contacts.push(contact);
    localStorage.setItem('contacts',JSON.stringify(contacts));
}
