function contactsScreen(mainID) {
    var appScreen = mainID; //This line seems IMO to be unnecessary 
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
            document.getElementById('addContact').addEventListener("click", function(event) { 
                event.preventDefault();
                document.getElementById('contactDetail').style.display = 'block';
            } );
            timeElements = document.getElementsByTagName("time");
            for (let i = 0; i < timeElements.length; i++) {
                var tElement = timeElements[i];
                tElement.addEventListener('mouseenter', function(event) {
                    event.target.nextElementSibling.style.display = 'block';
                });
                tElement.addEventListener('mouseleave', function(event) {
                    event.target.nextElementSibling.style.display = 'none';
                });
            }
            initialised = true;
        }
    };
}
