class PlacesManager {
    constructor() {
        this.results = []
    }

    async getPlaces(searchString, category) {
        let places = await $.get(`/places/${searchString}/${category}`, {})
        this.results = places
        return this.results
    }

    async getPlace(place_id) {
        let placeDetails = await $.get(`/place/${place_id}`)
        this.results = placeDetails
        return this.results
    }
}