class Renderer {
    renderMainPage() {
        $('.container').empty()
        const source = $('#main-page-template').html()
        const template = Handlebars.compile(source)
        const mainHtml = template()
        $('.search-container').append(mainHtml)
    }

    renderFlights(flights) {
        $('.flights-container').empty()
        if (flights.error || flights.length == 0){
            $('.flights-container').append(`<p>no flights found</p>`)
        } else {
            const source = $('#flights-template').html()
            const template = Handlebars.compile(source)
            const flightsHtml = template(flights)
            $('.flights-container').append(flightsHtml)
        }
    }

    renderResults() {
        $('.results-container').empty()
        const source = $('#results-template').html()
        const template = Handlebars.compile(source)
        const resultsHtml = template()
        $('.results-container').append(resultsHtml)
    }

    renderMainResults(flights) {
        $(".container").empty()
        $(".search-container").empty()
        $(".container").append('<div class="flights-container"></div>')
        $(".container").append('<div class="results-container"></div>')
        this.renderFlights(flights)
        this.renderResults()
    }

    renderMoreResults(results) {
        $('.results-container').empty()
        const source = $('#more-results-template').html()
        const template = Handlebars.compile(source)
        const categoryHtml = template(results)
        $('.results-container').append(categoryHtml)
    }

    renderPlace(place){
    $('.results-container').empty()
    const source = $('#place-template').html()
    const template = Handlebars.compile(source)
    const placeHtml = template(place)
    $('.results-container').append(placeHtml)
    }

    renderWaiting(){
        $(".container").empty()
        $(".search-container").empty()
        const source = $('#waiting-template').html()
        const template = Handlebars.compile(source)
        const waitHtml = template()
        $('.container').append(waitHtml)
    }

    renderMap(){
        $(".container").empty()
        $(".search-container").empty()
        const source = $('#map-page-template').html()
        const template = Handlebars.compile(source)
        const mapsHtml = template()
        $('.container').append(mapsHtml)
    }
    
    renderChecklist(checklist) {
        $('.search-container').empty()
        $(".container").empty()
        const source = $('#checklist-template').html()
        const template = Handlebars.compile(source)
        const checklistHtml = template(checklist)
        $('.search-container').append(checklistHtml)
    }

    renderDropdown(checklists) {
        $("#current-checklist").html(`${checklists[0].name}`)
        checklists.forEach(c => {
            $("#dropdown").prepend(`<p class="loaded-checklist" onclick="makeCurrentChecklist('${c._id}')">${c.name}</p>`)
        })
    }
}
