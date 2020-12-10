const placesManager = new PlacesManager()
const flightsManager = new FlightsManager()
const userManager = new UserManager()
const mapManager = new MapManager()
const renderer = new Renderer()

/* on load actions */
userManager.getPlaces()
    .then(function(result) {
        mapManager.initMap(result)
    })
userManager.getChecklists()
const initializeAutocomplete = function() {
    let options = {
        types: ['(cities)']
    }
    
    let fromInput = document.getElementById('from-input')
    let toInput = document.getElementById('to-input')
    
    new google.maps.places.Autocomplete(fromInput, options)
    new google.maps.places.Autocomplete(toInput, options)
}

let userLocation = {}
let currentCity
let currentCategory
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(async function(position) {
//         userLocation = { lat: position.coords.latitude, lon: position.coords.longitude }
//     });
// } else {
//     userLocation = undefined
// }
renderer.renderMainPage()
initializeAutocomplete()

$('#map-button').on('click', function(){
    $(".container").empty()
    $(".search-container").empty()
    mapManager.populateMap(userManager.places)
    $("#map").css('display', 'block')
})

const search = async () => {
    let flyFrom = ($("#from-input").val()).split(',')[0] || ''
    let flyTo = ($("#to-input").val()).split(',')[0] || ''
    currentCity = flyTo
    renderer.renderWaiting()
    if(flyTo === '') {
        console.log('you gotta fly somewhere')
    } else {
        let dateStart = moment($("#date-start").val()).format('DD/MM/YYYY')
        let dateEnd = moment($("#date-end").val()).format('DD/MM/YYYY')
        let flights = await flightsManager.getFlightsData(flyFrom, flyTo, dateStart, dateEnd)
        renderer.renderMainResults(flights)
    }
}

const checkIfListed = function(place_id, savedPlaces) {
    return savedPlaces.some(p => p.place_id === place_id )
}

const searchPlaces = async (category) => {
    currentCategory = category
    console.log(category)
    let results = await placesManager.getPlaces(currentCity, category)
    let formattedResults = results.map(r => ({
        ...r,
        isListed: checkIfListed(r.place_id, userManager.places)
    }))
    renderer.renderMoreResults(formattedResults)
}

$('div').on('click', 'button.save-to-db', async function ()  {
    let place_id = $(this).closest("div").data('id')
    let category = $(this).closest("div").data('category')
    userManager.saveToChecklist(place_id, category)
    $(this).removeAttr("class")
    $(this).attr("class", "remove-from-db")
    $(this).html('remove')
})

$('div').on('click', 'button.remove-from-db', function () {
    console.log('boom')
    let place_id = $(this).closest("div").data('id')
    userManager.removeFromChecklist(place_id)
    $(this).removeAttr("class")
    $(this).attr("class", "save-to-db")
    $(this).html('save')
})

$('.container').on('click', 'p.result-name', async function() {
        let place_id = $(this).closest("div").data('id')
        let category = $(this).closest("div").data('category')
        let place = await placesManager.getPlace(place_id)
        renderer.renderPlace({ ...place, isListed: checkIfListed(place_id, userManager.places), category })
})

$('#comeHome').on('click',function(){
    $("#map").css('display', 'none')
    $(".container").empty()
    mapManager.clearMarkers()
    $(".search-container").empty()
    renderer.renderMainPage()
    initializeAutocomplete()
})

$('#showChecklist').on('click', function(){
    $("#map").css('display', 'none')
    mapManager.clearMarkers()
    renderer.renderChecklist(userManager.places)
})

const seeChecklist = () => {
    renderer.renderChecklist(userManager.checklist)
}
