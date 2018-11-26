export function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            callback( { lat: position.coords.latitude, lng: position.coords.longitude } );
        }) 
    }
};


