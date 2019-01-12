IAm = {
    firstName: "Andrew",
    lastName: 'G',
    getFullName: function() {
        return this.firstName + ' ' + this.lastName;
    }
}
IAm.firstName //This requires the name to start with a letter, _ or $
IAm['firstName']
IAm.getFullName()
