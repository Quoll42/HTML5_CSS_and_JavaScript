function store(contact) {
    var c = JSON.stringify(contact);
    localStorage.setItem('contacts',c);
}