const express = require('express')
const { get } = require('jquery')
const router = express.Router()
const axios = require('axios').default
// const mongoose = require('mongoose')
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/checklistDB")
const AIRPORT_CODES_API = process.env.AIRPORT_CODES_API
const SECRET_AIRPORT_CODES_API = process.env.SECRET_AIRPORT_CODES_API
const GOOGLE_API = process.env.GOOGLE_API

router.post('/flights', async function (req, res) {
    const flight = req.body
    let airportFrom = await axios.get(`https://www.air-port-codes.com/api/v1/multi?type=a&term=${flight.flightFrom}`, {
        headers: {
            'APC-Auth': '6f4fb09668', 'APC-Auth-Secret': 'fb132f8cb880647'
        }
    })
    airportFrom = airportFrom.data.airports[0].iata

    let airportTo = await axios.get(`https://www.air-port-codes.com/api/v1/multi?type=a&term=${flight.flightTo}`, {
        headers: {
            'APC-Auth': '6f4fb09668', 'APC-Auth-Secret': 'fb132f8cb880647'
        }
    })
    airportTo = airportTo.data.airports[0].iata

    let flightsData = await axios.get(`https://api.skypicker.com/flights?flyFrom=${airportFrom}&to=${airportTo}&dateFrom=${flight.dateFrom}&dateTo=${flight.dateTo}&partner=picky&v=3`)
    let fly = flightsData.data.data
    let flightsArray = fly.map(f => [
        {
            dtime: f.dTime,
            aTime: f.aTime,
            cityFrom: f.cityFrom,
            airportFromCod: f.flyFrom,
            countryFrom: f.countryFrom.name,
            cityTo: f.cityTo,
            airportToCod: f.flyTo,
            countryTo: f.countryTo.name,
            price: f.conversion.EUR,
            availability: f.availability.seats,
            link: f.deep_link,
            transfers: f.transfers,
            fly_duration: f.fly_duration
        }])
    res.send(flightsArray)
})


    router.get('/places/:city/:category',async function(req,res){
        const cityName = req.params.city
        const category = req.params.category
        const makeCitytoLatandLong = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=AIzaSyBZbfnMyK4xaIDNevsXwulDnxC9nhZ0rS0`)
        let location = makeCitytoLatandLong.data.results[0].geometry.location
        const getPlaces = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=${category}&key=AIzaSyBZbfnMyK4xaIDNevsXwulDnxC9nhZ0rS0`)
        const results = getPlaces.data.results
        const places = results.map(r => [{
            name:r.name,
            icon:r.icon,
            types:r.types,
            business_status:r.business_status||null,
            rating:r.rating || null,

        }])

        res.send(places)

    })


module.exports = router