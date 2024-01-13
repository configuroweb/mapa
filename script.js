
var map = L.map('map').setView([4.611, -74.0703], 8);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var markers = [];

map.on('click', function(e) {
    var coordinates = e.latlng;
    document.querySelector('.marked-container').style.display = '';
    
    document.getElementById('latitude').value = coordinates.lat.toFixed(6);
    document.getElementById('longitude').value = coordinates.lng.toFixed(6);
});

function closeMarkerContainer () {
    document.querySelector('.marked-container').style.display = 'none';
    document.querySelector('.map-container').style.width = '100%';
}

function saveMarker() {
    var markerName = document.getElementById('markerName').value;
    var latitude = document.getElementById('latitude').value;
    var longitude = document.getElementById('longitude').value;

    if (markerName && latitude && longitude) {
        var marker = {
            name: markerName,
            lat: latitude,
            lng: longitude
        };

        markers.push(marker);
        updateMarkedLocations();
    } else {
        alert('Debes llenar todos los campos');
    }
}

function updateMarkedLocations() {
    var markedLocationsList = document.getElementById('markedLocations');
    markedLocationsList.innerHTML = '';

    markers.forEach(function(marker) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `<div>${marker.name} <button onclick="viewLocation(${marker.lat}, ${marker.lng})">Ver Ubicación</button></div>`;
        markedLocationsList.appendChild(listItem);

        L.marker([marker.lat, marker.lng]).addTo(map)
        .bindPopup(marker.name).openPopup();
    });

    // Clear input values after saving
    document.getElementById('markerName').value = '';
    document.getElementById('latitude').value = '';
    document.getElementById('longitude').value = '';
}

function viewLocation(lat, lng) {
    map.panTo(new L.LatLng(lat, lng));
}
