const express = require('express')
const router = express.Router()
const axios = require('axios').default
const mongoose = require('mongoose')
const Place = require('../models/PlaceModel')
const Checklist = require('../models/ChecklistModel')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/best-trip")

router.get('/getPlaces', async function(req, res) {
    let places = await Place.find({})
    let formattedPlaces = places.map(p => {
        let { __v, ...fixedPlaces } = p._doc
        return { ...fixedPlaces }
    })
    res.send(formattedPlaces)
})

router.post('/savePlace/:place_id/:category/:checklistId', async function(req, res) {
    let place_id = req.params.place_id
    let category = req.params.category
    let checklistId = req.params.checklistId
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
        vicinity:result.vicinity,
        category
    }
    let p = new Place(place)
    p.save()
    Checklist.findByIdAndUpdate(checklistId, { $push: { places: p } }, { new: true }, function(err, result) {
        console.log(result)
    })
    // Checklist.findById("5fd17cf46fa6350d8408bb1b", function(err, result) {
    //     result.places.push(p)
    // })
    // .save().then(function(newPlace) {
    //     res.send(newPlace)
    // })
})

router.delete('/removePlace/:place_id', function(req, res) {
    let place_id = req.params.place_id
    Place.findOneAndDelete({ place_id }, { useFindAndModify: false }).then(
        res.send({success: "deleted"})
    )
})

router.get('/checklists', async function(req, res){
    Checklist.find({}).populate("places").then(function(result){
        res.send(result)
    })
})

router.post('/newChecklist', function(req, res) {
    let name = req.body.name
    let newChecklist = {
        name,
        places: []
    }
    let addToChecklist = new Checklist(newChecklist)
    addToChecklist.save()
    res.send(addToChecklist)
})
module.exports = router