const express = require('express')
const router = express.Router()
const axios = require('axios').default
const mongoose = require('mongoose')
const Place = require('../models/PlaceModel')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/best-trip")

router.get('/getPlaces', function(req, res) {
    let places = await Place.find({})
    let {__v, ...fixedPlaces} = places._doc
        res.send(fixedPlaces)
})

router.post('/savePlace', function(req, res) {
    let place_id = req.body.place_id
    const getPlace = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyBZbfnMyK4xaIDNevsXwulDnxC9nhZ0rS0&place_id=${place_id}&langauge=en`)
    const result = getPlace.data.result
    const place = {
        name:result.name,
        status:result.business_status,
        address:result.formatted_address,
        intPhone:result.international_phone_number,
        photos:result.photos,
        rating:result.rating,
        reviews:result.reviews,
        geometry:result.geometry,
        icon:result.icon,
        place_id:result.place_id,
        website:result.website,
        opening_hours:result.opening_hours||null,
        googleurl:result.url,
        types:result.types,
        vicinity:result.vicinity
    }
    new Place(place).save().then(function(newPlace) {
        res.send(newPlace)
    })
})

router.delete('removePlace', function(req, res) {
    let place_id = req.body.place_id
    City.findOneAndDelete({ place_id }).then(
        res.send("deleted")
    )
})