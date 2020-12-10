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
      let newPlace = await $.post(`/savePlace/${place_id}/${category}/${this.currentChecklist._id}`)
        this.currentChecklist.places.push(newPlace)
        return newCurrent
    }
  }

  async removeFromChecklist(place_id, checklistId) {
    let deleteindex = this.currentChecklist.places.indexOf(this.currentChecklist.places.find(p => p.place_id === place_id))
    this.currentChecklist.places.splice(deleteindex, 1)
    $.ajax({
      url: `/removePlace/${place_id}/${checklistId}`,
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
      return this.checklists
    }
    
  }

  async newChecklist(name) {
    let newChecklist = await $.post('/newChecklist/', { name })
    this.checklists.push(newChecklist)
    this.currentChecklist = newChecklist
    return this.checklists
  }

  makeCurrentChecklist(checklistId) {
    let newCurrentChecklist = this.checklists.find(c => c._id === checklistId)
    this.currentChecklist = newCurrentChecklist
    return this.currentChecklist
  }
}