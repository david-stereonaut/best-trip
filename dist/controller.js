const placesManager = new PlaceManager()
const flightsManager = new FlightsManager()
const userManager = new UserManager()
const renderer = new Renderer()

/* on load actions */
userManager.getChecklists()
    .then(function(result) {
        renderer.renderFrontPage(result)
    })

let userLocation = {}
let currentCity
let currentCategory
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(position) {
        userLocation = { lat: position.coords.latitude, lon: position.coords.longitude }
    });
} else {
    userLocation = undefined
}

const initialize = () => {
    let options = {
        types: ['(cities)']
    }
    
    let fromInput = document.getElementById('fly-from')
    let toInput = document.getElementById('fly-to')

    new google.maps.places.Autocomplete(fromInput, options)
    new google.maps.places.Autocomplete(toInput, options)
}

const search = async () => {
    let flyFrom = ($(".fly-from").val()).split(',')[0] || ''
    let flyTo = ($(".fly-to").val()).split(',')[0]

    let dateStart = moment($(".date-start").val()).format('DD/MM/YYYY')
    let dateEnd = moment($(".date-end").val()).format('DD/MM/YYYY')
    let flights
    if (userLocation && flyFrom === ''){
        flights = await flightsManager.getFlights(flyFrom, flyTo, userLocation.lat, userLocation.lon, dateStart, dateEnd)
    } else {
        flights = await flightsManager.getFlights(flyFrom, flyTo, 0, 0, dateStart, dateEnd)
    }
    renderer.renderMainResults(flights)
}

const searchPlaces = async (category) => {
    currentCategory = category
    let results = await getPlaces(currentCity, category)
    renderer.renderCategoryResults(results)
}

const saveToChecklist = (name) => {
    userManager.saveToChecklist(name, currentCategory)
}

const removeFromChecklist = (name) => {
    userManager.removeFromChecklist(name)
}

const seeChecklist = () => {
    renderer.renderChecklist(userManager.checklist)
}