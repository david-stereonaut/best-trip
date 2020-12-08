class PlacesManager {
    constructor() {
        this.results = {
            resturantResults: [],
            parkResults: [],
            nightlifeResults: [],
            museumResults: []
        }
        this.currentResults = {}
    }

    async getPlaces(searchString, category) {
        let places = await $.get(`/places/${searchString}/${category}`)
        this.results = places.results
        return this.results
    }

    async getPlace(place_id) {
        let placeDetails = await $.get(`/place/${place_id}`)
        this.currentResults = placeDetails
        return this.currentResults
    }
}