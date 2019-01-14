c1 = {
    contactName: "Jaspar Jones",
    phoneNumber: "457 619",
    emailAddress: "jj@bigpong.con.au",
    company: {
        code:123,
        name:"ABC Incorporated"
    },
    notes:null,
    lastContacted: new Date(),
    alive:true
}

contactString = JSON.stringify(c1);
c2 = JSON.parse(contactString);

new Date().toJSON(); //current time-date stamp in JSON format


dateReviver = function(name, value) {
    var regExp = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/
    if (value && typeof value === 'string' && value.match(regExp)) {
        return new Date(value);
    } else {
        return value;
    }
}

c3 = JSON.parse(contactString, dateReviver); //This didn't seem to work!!
