function provideMethodsForMyApp(mainElement) {
    var mainEl = mainElement;
    var initialised = false;

    return { //Return an object with useful methods in it

        init: function() { //The 1st method I'll supply is for initialising my app:
            if (initialised) { //I'd better check to make sure that I haven't initialised already
                return true;
            }

            //====== Set things up, and showing 3 ways to call code ======
            document.getElementsByTagName('button')[0].addEventListener("click", function() {alert("Hello World!")} ); //1. Code
            document.getElementsByTagName('button')[1].addEventListener("click", changeButtonTwo ); //2. Call a function
            document.getElementsByTagName('button')[2].addEventListener("click", function () { //3. Use a method
                this.readAllText();
            }.bind(this) ); //'this' will contain all of the methods defined in the return object :-)
            
            initialised = true; //Flag that the initialisation is done.
        }, //Remember to put a comma between the methods in the object I'm returning.

        readAllText: function() { //My 2nd method, just light-hearted example code:
            //Determine a length in 2 ways, (a) from the document, and (b) using 'this'
            console.log(document.getElementById('theMainPart').children.length);
            console.log(this.children.length); //It is easier using 'this' :-)

            let children = this.children;
            for (let i=0; i < children.length; i++) {
                //console.log(children[i]);
                if ( children[i].tagName == "P") {      //If it is <P> tag
                    children[i].style.color = "#FF0000";//then colour it red
                }
            }
            console.log('All text in the main section is now red (haha)');

            //Lastly, show that the triggering *event* can be used to get potentially useful stuff:
            console.log('PS: I know that you pressed button "' + event.target.textContent + '"');
        }.bind(mainEl) //By binding my app's main part, I can easily use reference in it the function :-)
    }

}

function changeButtonTwo(event) {
    if (event.target.style.color == '') {
        event.target.style.color = '#FF00FF';
        event.target.innerText = 'Press me again';
    } else {
        event.target.style.color = '';
        event.target.innerText = 'Press me too';
    }
}