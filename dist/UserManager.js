class UserManager {
  constructor() {
    this.checklists = []
    this.currentChecklist = {
    }
    this.places = []
  }

  async getPlaces() {
    let placesChecklist = await $.get('/getPlaces/')
    this.places = placesChecklist
    return this.places
  }

  async saveToChecklist(place_id, category) {
    if (!(this.places.some(p => p.place_id === place_id))){
      let place = await $.post(`/savePlace/${place_id}/${category}/${this.currentChecklist._id}`)
      this.places.push(place)
    }
  }

  async removeFromChecklist(place_id) {
    let deleteindex = this.places.indexOf(this.places.find(p => p.place_id === place_id))
    this.places.splice(deleteindex, 1)
    $.ajax({
      url: `/removePlace/${place_id}`,
      type: 'DELETE',
      success: function (results) {
        console.log(results.success)
      }
    })
  }

  async getChecklists() {
    let checklists = await $.get('/checklists')
    console.log(checklists)
    if(checklists.length === 0) {
      this.newChecklist("Default Checklist")
    } else {
      this.checklists = checklists
      this.currentChecklist = checklists[0]
    }
    
  }

  async newChecklist(name){
    let newChecklist = await $.post('/newChecklist/', { name })
    this.checklists.push(newChecklist)
    this.currentChecklist = newChecklist
    console.log(this.checklists)
    console.log(this.currentChecklist)
  }
}