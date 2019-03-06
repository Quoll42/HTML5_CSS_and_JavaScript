navigator.geolocation.getCurrentPosition( function(location) {
    console.log('Latitude: ' + location.coords.latitude);
    console.log('Longitude: ' + location.coords.longitude);
    console.log('Altitude: ' + location.coords.altitude);
    console.log('Accuracy: ' + location.coords.accuracy + ' <= important');
});