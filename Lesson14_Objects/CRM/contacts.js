function contactsScreen(mainID) {
    var appScreen = mainID; //This line seems IMO to be unnecessary <= appScreen gets used in lesson 18
    var initialised = false;
    return {
        init: function() {
            if (initialised) {
                return true;
            }
            var contactName = document.getElementById('contactName')
            contactName.oninvalid = function(e) {
                e.target.setCustomValidity("");
                if (!e.target.validity.valid) {
                    if (e.target.value.length == 0) {
                        e.target.setCustomValidity("Contact name is required.");
                    } else if (e.target.value.length < 5) {
                        e.target.setCustomValidity("Contact name must be at least 5 characters.");
                    }
                }
            };
            initialised = true;
        }
    };
}
