const placesManager = new PlacesManager()
const flightsManager = new FlightsManager()
// const userManager = new UserManager()
const renderer = new Renderer()

/* on load actions */
// userManager.getChecklists()
//     .then(function(result) {
//         renderer.renderFrontPage(result)
//     })

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
    if(flyTo === '') {
        console.log('you gotta fly somewhere')
    } else {
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
}

const searchPlaces = async (category) => {
    currentCategory = category
    let results = await getPlaces(currentCity, category)
    renderer.renderCategoryResults(results)
}

// const saveToChecklist = (name) => {
//     userManager.saveToChecklist(name, currentCategory)
// }

// const removeFromChecklist = (name) => {
//     userManager.removeFromChecklist(name)
// }

const seeChecklist = () => {
    renderer.renderChecklist(userManager.checklist)
}