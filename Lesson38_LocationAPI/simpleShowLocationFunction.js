navigator.geolocation.getCurrentPosition(
    function(location) { //1st parameter: success callback
        console.log('Latitude: '  + location.coords.latitude);
        console.log('Longitude: ' + location.coords.longitude);
        console.log('Altitude: ' + location.coords.altitude);
        console.log('Accuracy: ' + location.coords.accuracy + ' <= important');
    }
,
    function(error)     //2nd parameter: optional error callback
        {console.log(error)}
);