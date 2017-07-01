/**
 * Created by Nguyen Quang Khue on 01-Jul-17.
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            if (getParameterByName('lat') === null || getParameterByName('lng') === null) {
                location.href = '/?lat=' + position.coords.latitude + '&lng=' + position.coords.longitude + '&units=metric';
            }
        }, function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.");
                    break;
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function changeWeatherUnits(units) {
    var lat = getParameterByName('lat');
    var lng = getParameterByName('lng');
    location.href = '/?lat=' + lat + '&lng=' + lng + '&units=' + units;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}