const mongoose = require('mongoose')
const Schema = mongoose.Schema

const checklistSchema = new Schema({
    name: String,
    
})

const Checklist = mongoose.model("Checklist", placeSchema)
module.exports = Checklist