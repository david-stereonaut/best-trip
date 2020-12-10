const mongoose = require('mongoose')
const Schema = mongoose.Schema

const checklistSchema = new Schema({
    name: String,
    places: [{type: Schema.Types.ObjectId, ref: 'Place'}]

})

const Checklist = mongoose.model("Checklist", placeSchema)
module.exports = Checklist