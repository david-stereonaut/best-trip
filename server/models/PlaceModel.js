const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new Schema({
    buisness_status: String,
    formatted_address: String,
    geometry: Object,
    icon: String,
    phone_number: String,
    name: String,
    opening_hours: Array,
    photos: Array,
    place_id: String,
    price_level: Number,
    rating: Number,
    reviews: Array,
    types: Array,
    url: String,
    vicinity: String
})

const Place = mongoose.model("Place", placeSchema)
module.exports = Place