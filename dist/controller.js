const placesManager = new PlacesManager()
const flightsManager = new FlightsManager()
const userManager = new UserManager()
const renderer = new Renderer()

/* on load actions */
userManager.getPlaces()
    // .then(function(result) {
    //     renderer.renderFrontPage(result)
    // })

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

function initialize () {
    let options = {
        types: ['(cities)']
    }
    
    let fromInput = document.getElementById('from-input')
    let toInput = document.getElementById('to-input')

    new google.maps.places.Autocomplete(fromInput, options)
    new google.maps.places.Autocomplete(toInput, options)
}

const search = async () => {
    let flyFrom = ($("#from-input").val()).split(',')[0] || ''
    let flyTo = ($("#to-input").val()).split(',')[0] || ''
    currentCity = flyTo
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
    console.log(formattedResults)
    renderer.renderMoreResults(formattedResults)
}

$('.container').on('click', 'button.save-to-db', async function ()  {
    let place_id = $(this).closest("div").data('id')
    userManager.saveToChecklist(place_id)
    $(this).removeAttr("class")
    $(this).attr("class", "remove-from-db")
    $(this).html('remove')
})

$('.container').on('click', 'button.remove-from-db', async function () {
    let place_id = $(this).closest("div").data('id')
    userManager.removeFromChecklist(place_id)
    $(this).removeAttr("class")
    $(this).attr("class", "save-to-db")
    $(this).html('save')
})

$('.container').on('click', 'p.result-name', async function() {
        let place_id = $(this).closest("div").data('id')
        let place = await placesManager.getPlace(place_id)
        renderer.renderPlace({ ...place, isListed: checkIfListed(place_id, userManager.places) })
})

const seeChecklist = () => {
    renderer.renderChecklist(userManager.checklist)
}
