let options = {
    types: ['(cities)']
}

let fromInput = document.getElementById('from-input')
let toInput = document.getElementById('to-input')

new google.maps.places.Autocomplete(fromInput, options)
new google.maps.places.Autocomplete(toInput, options)


userManager.getPlaces().then(function(result){
    let firstPlaceLatLng = {
        lat: result[0].geometry.location.lat ? result[0].geometry.location.lat : -34.397,
        lng:  result[0].geometry.location.lng ?  result[0].geometry.location.lng : 150.644
    }

    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: firstPlaceLatLng.lat, lng: firstPlaceLatLng.lng },
        zoom: 15,
    })

    let infoWindow = new google.maps.InfoWindow()

    const locationButton = document.createElement("button")
    locationButton.textContent = "Pan to Current Location"
    locationButton.classList.add("custom-map-control-button")
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton)
    locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.")
            // infoWindow.open(map)
            map.setCenter(pos)
            },
            () => {
            handleLocationError(true, infoWindow, map.getCenter())
            }
        )
    } else {
      // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter())
    }
})
})
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos)
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    )
    infoWindow.open(map)
}