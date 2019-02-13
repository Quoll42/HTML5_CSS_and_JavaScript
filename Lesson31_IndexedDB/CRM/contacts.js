function contactsScreen(mainID) {
    var screen = mainID;
    var initialized = false;
    var database = null;
    
    return {
         init: function() {
            if (initialized) {
                return;
            }
            $(screen).find('form input[type="submit"]').click(
                function(evt) {
                    evt.preventDefault();
                    this.save(evt);
                }.bind(this)
            );
            $(screen).on("click", "[data-delete-button]",
                function(evt) {
                    evt.preventDefault();
                    this.delete(evt);
                }.bind(this)
            );
            
            $(screen).find('textarea').keyup(function(evt) {
                if ($(evt.target).siblings('.textCount')) {
                    var characters = $(evt.target).val().length;
                    $(evt.target).siblings('.textCount').text(characters + ' characters');
                    
                }
            });
            $(':input[required]').siblings('label').append($('<span>').text('*').addClass('requiredMarker'));
            var contactName = document.getElementById('contactName')
            contactName.oninvalid = function(e) {
	            e.target.setCustomValidity("");
	           if (e.target.validity.valid == false) {
	               if (e.target.value.length == 0) {
	               	   e.target.setCustomValidity("Contact name is required.");
		           } else if (e.target.value.length < 5) {
			           e.target.setCustomValidity("Contact name must be at least 5 characters."); 
		           }
	           }
            };
 
            var email = document.getElementById('emailAddress')
            email.oninvalid = function(e) {
	            e.target.setCustomValidity("");
	            if (e.target.validity.valid == false) {
		            if (e.target.value.length == 0) {
			            e.target.setCustomValidity("Email is required.");
		             } else {
			              e.target.setCustomValidity("Please enter a valid email address."); 
		             }
	            }
            };

            document.getElementById('addContact')
              .addEventListener("click", function(event) {
	             event.preventDefault();
	             $(screen).find('#contactDetails').toggle( "blind" );
           });
           $(screen).find('tbody').on("mouseenter mouseleave", "td > time", function(evt) {
               if (evt.type === "mouseenter") {
                    $(evt.target).siblings('.overlay').slideDown();
               } else {
               		$(evt.target).siblings('.overlay').slideUp()
               }
                
           });
           
           $(screen).find('tbody').on("mouseenter mouseleave", "tr", function(evt) {
               if (evt.type === "mouseenter") {
                    $(evt.target).closest('tr').css('color', 'white');
                    $(evt.target).closest('tr').css('background', '#3056A0');
               } else {
               		$(evt.target).closest('tr').removeAttr('style');
               }
                
           });
           var request = indexedDB.open('contactsDB');
           request.onsuccess = function(event) {
               database = request.result; //Record a reference to the database, to use later
           }
           request.onupgradeneeded = function(event) {
               database = event.target.result;  //Obtain a reference to the database
               var objectStoreContacts = database.createObjectStore('contacts',
                 {keyPath: 'id', autoincrement: true}); //Get ID from the id property, and autoincrement that
               var objectStoreCompanies = database.createObjectStore('companies',
                 {keyPath: 'id', autoincrement: true}); //Get ID from the id property, and autoincrement that
           }
           initialized = true;
        },
        save: function(evt) {
            if ($(evt.target).parents('form')[0].checkValidity()) {
                var fragment = $(screen).find('#contactRow')[0].content.cloneNode(true);
                var row = $('<tr>').append(fragment);
                var contact = this.serializeForm();
                row = bind(row, contact);
                this.store(contact);
                $(row).find('time').setTime();
                $(screen).find('table tbody').append(row);
				$(screen).find('form :input[name]').val('');
				$(screen).find('#contactDetails').toggle( "blind" );
	            this.updateTableCount();
            }
        },
        store: function(contact) {
            var trans = database.transaction(["contacts"],"readwrite"); //Create tx to read/write store 'contacts'
            var objectStore = trans.objectStore("contacts"); //Get a reference to the 'contacts' store
            var request = objectStore.put(contact); //Attempt to put the supplied contact object into the store
            request.onsuccess = function(event) {
                console.log("Added a new contact " + event.target.result);
            }
            request.onerror = function(event) {
                console.log("Something went wrong...")
            }
        },
        updateTableCount: function(evt) {
            var rows = $(screen).find('table tbody tr')
	        $(screen).find('table').updateFooter({'message':' contacts displayed'});
        },
        delete: function(evt) { 
            $(evt.target).parents('tr').remove();
            this.updateTableCount();
        },
        serializeForm: function() {
            var inputFields = $(screen).find('form :input');
            var result = {};
            $.each(inputFields, function(index, value) {
                 if ($(value).attr('name')) {
                     result[$(value).attr('name')] = $(value).val();
                 }
            });
            return result;
        }
    };
    
}

function bind(template, obj) {
    $.each(template.find('[data-property-name]'), function(indx, val) {
        var field = $(val).data().propertyName;
        if (obj[field]) {
            $(val).text(obj[field]);
            if ($(val).is('time')) {
                $(val).attr('datetime', obj[field]);
            }
        }
    });
    return template;
}