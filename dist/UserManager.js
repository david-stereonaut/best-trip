class UserManager {
  constructor() {
    this.places = []
  }

  async getPlaces() {
    let placesChecklist = await $.get('/getPlaces')
    this.places = placesChecklist
    return this.places
  }

  async saveToChecklist(place_id) {
    let place = await $.post(`/savePlace/${place_id}`, { place_id: place_id })
    this.places.push({ place_id: place.place_id, name: place.name })
  }

  async removeFromChecklist(place_id) {
    $.ajax({
      url: `/removePlace/${place_id}`,
      type: 'DELETE',
      success: function (results) {
        console.log(results.success)
        let deleteindex = this.places.indexOf(this.places.find(p => p.place_id === place_id))
        this.places.splice(deleteindex, 1)
      }
    })
  }
}