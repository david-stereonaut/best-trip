class MapManager {
    constructor() {
        this.markers = []
        this.map
    }

    initMap(checklistArray) {
        let firstPlaceLatLng
        if (checklistArray[0]){
            firstPlaceLatLng = {
                lat: checklistArray[0].geometry.location.lat,
                lng:  checklistArray[0].geometry.location.lng
            }
        } else {
            firstPlaceLatLng = {
                lat: -34.397,
                lng: 150.644
            }
        }

        this.map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: firstPlaceLatLng.lat, lng: firstPlaceLatLng.lng },
            zoom: 15,
        })

        let infoWindow = new google.maps.InfoWindow()

        const locationButton = document.createElement("button")
        locationButton.textContent = "Current Location"
        locationButton.classList.add("custom-map-control-button")
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton)
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
                    this.map.setCenter(pos)
                    },
                    () => {
                    this.handleLocationError(true, infoWindow, map.getCenter())
                    }
                )
            } else {
                this.handleLocationError(false, infoWindow, map.getCenter())
            }
        })
    }

    populateMap(checklistArray) {
        if (checklistArray && checklistArray.length > 0) {
            let randomIndex = Math.floor(Math.random() * checklistArray.length)
            let randomPlace = {
                lat: checklistArray[randomIndex].geometry.location.lat,
                lng:  checklistArray[randomIndex].geometry.location.lng 
            }
            this.map.setCenter(randomPlace)
            checklistArray.forEach(p => {
                let placeLatLng = {
                    lat: p.geometry.location.lat,
                    lng:  p.geometry.location.lng 
                }
                this.addMarker(placeLatLng)
            })
        }
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos)
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        )
        infoWindow.open(this.map)
    }

    addMarker(location) {
        const marker = new google.maps.Marker({
          position: location,
          map: this.map,
        });
        this.markers.push(marker);
    }

    clearMarkers() {
        this.markers.forEach(m => m.setMap(null))
        this.markers.length = 0
    }
    
    showMarkers() {
        setMapOnAll(this.map);
    }
}