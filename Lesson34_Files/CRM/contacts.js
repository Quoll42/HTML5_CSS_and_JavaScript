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

            //====== Contacts file import ======
            $(screen).find('#inputJSONFile').change(function(evt) {
                var reader = new FileReader(); //Create a file reader. It has methods for reading selected files.
                reader.onload = function(evt) { //The onload event will trigger when a file has been read
                    //console.log('New file selected:');
                    //console.log(evt.target.result); //Show the file's contents
                    var contacts = JSON.parse(evt.target.result);
                    for (var i=0; i<contacts.length; i++) {
                        this.store(contacts[i]); //Using the screen objects store method to save the contact
                    }
                    location.reload(); /*Instead of updating the table after each contact is added,
                                       just reload the web page when all contacts have been added.*/
                }.bind(this); //Using 'bind' to provide the function with the screen object
                reader.onerror = function(evt) {
                    console.log('Something went wrong reading the file');
                }
                reader.readAsText(evt.target.files[0]); //Request to read the file into a JavaScript string
                //The above assumes only 1 file was selected, not multiple. Afterwards, 'onload' is triggered.
            }.bind(this)); //Using 'bind' to provide the function with the screen object
 
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
               database = request.result; //Get a reference to the database, for use later
               this.configureData();
               this.loadContacts();
           }.bind(this);
           request.onupgradeneeded = function(event) {
               database = event.target.result; //Obtain a reference to the database
               var objectStoreContacts = database.createObjectStore("contacts",
                 {keyPath: "id", autoIncrement: true }); //Get ID from the id property, and autoincrement that
               var objectStoreCompanies = database.createObjectStore('companies',
                 {keyPath: "id", autoIncrement: true }); //Get ID from the id property, and autoincrement that
           }
           initialized = true;
        },
        configureData: function() {
            var trans = database.transaction('companies','readwrite');//Create tx to read/write store 'companies'
            var objectStore = trans.objectStore('companies'); //Get a reference to the 'companies' store
            objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (!cursor) {
                    objectStore.put( {name:'ABC Incorporated'} );
                    objectStore.put( {name:'XZY Ltd'} );
                    objectStore.put( {name:'ACME International'} );
                }
                this.populateCompanyNames();
            }.bind(this);
        },
        populateCompanyNames: function() { //Copy company names from IndexedDB to the Add-Contact form's options
            var companySelectElement = document.getElementById('companySelect');
            var trans = database.transaction('companies');
            var objectStoreCompanies = trans.objectStore('companies');
            objectStoreCompanies.openCursor().onsuccess = function(event) {
                var cursor = event.target.result; //Get a reference to the cursor
                if (cursor) {
                    //console.log(cursor.value.name + ' / ' + cursor.value.id);
                    newOptionElement = document.createElement('option');
                    newOptionElement.value = cursor.value.id;
                    optionText = document.createTextNode(cursor.value.name);
                    newOptionElement.appendChild(optionText);
                    companySelectElement.appendChild(newOptionElement);
                    cursor.continue(); //Causes onsuccess to be invoked again, with the next record 
                }
            }
        },
        save: function(evt) {
            if ($(evt.target).parents('form')[0].checkValidity()) {
                var fragment = $(screen).find('#contactRow')[0].content.cloneNode(true);
                var row = $('<tr>').append(fragment);
                var contact = this.serializeForm();
                //console.log(contact);
                var trans = database.transaction(['companies']); //Create tx for store 'companies' (defaults to read)
                var objectStoreCompanies = trans.objectStore('companies'); //Get a reference to the 'companies' store
                var requestCompanies = objectStoreCompanies.get(parseInt(contact.companyName));
                requestCompanies.onsuccess = function(event) {
                    var company = event.target.result;
                    contact.companyName = company;
                    row = bind(row, contact);
                    this.store(contact);
                    $(row).find('time').setTime();
                    $(screen).find('table tbody').append(row);
                    $(screen).find('form :input[name]').val('');
                    $(screen).find('#contactDetails').toggle( "blind" );
                    this.updateTableCount();
                }.bind(this);
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
                console.log("Something went wrong trying to add " + contact);
            }
        },
        loadContacts: function() {
            var trans = database.transaction('contacts'); //Create tx for store 'contacts' (defaults to read) 
            var objectStore = trans.objectStore('contacts'); //Get a reference to the 'contacts' store
            objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result; //Get a reference to the cursor
                if (cursor) {
                    var contact = cursor.value;     
                    var fragment = $(screen).find('#contactRow')[0].content.cloneNode(true);
                    var row = $('<tr>');
                    row.data().id = contact.id;
                    row.append(fragment);
                    row = bind(row, contact);
                    $(row).find('time').setTime();
                    $(screen).find('table tbody').append(row);
                    cursor.continue(); //Causes onsuccess to be invoked again, with the next record
                }
                this.updateTableCount();
            }.bind(this);
        },
        updateTableCount: function(evt) {
            var rows = $(screen).find('table tbody tr')
	        $(screen).find('table').updateFooter({'message':' contacts displayed'});
        },
        delete: function(evt) {
            var contactID = $(evt.target).parents('tr').data().id;//Obtain id of the contact being deleted
            trans = database.transaction('contacts','readwrite'); //Create tx to read/write store 'contacts'
            var objectStore = trans.objectStore('contacts'); //Get a reference to the 'contacts' store
            var request = objectStore.delete(contactID); //Attempt to delete that object from the store
            request.onsuccess = function(event) {
                console.log("Deleted contact with id=" + contactID);
            }
            request.onerror = function(event) {
                console.log("Something went wrong trying to delete contact with id=" + contactID);
            }
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
            if (typeof obj[field] == "object") {
                $(val).text(obj[field].name);
            } else {
                $(val).text(obj[field]);
            }
            if ($(val).is('time')) {
                $(val).attr('datetime', obj[field]);
            }
        }
    });
    return template;
}