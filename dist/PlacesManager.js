class PlacesManager {
    constructor() {
        this.results = []
        this.currentResult = {}
    }

    async getPlaces(searchString, category) {
        let places = await $.get(`/places/${searchString}/${category}`, {})
        this.results = places
        return this.results
    }

    async getPlace(place_id) {
        let placeDetails = await $.get(`/place/${place_id}`)
        this.currentResult = placeDetails
        return this.currentResult
    }
}