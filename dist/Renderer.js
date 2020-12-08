class Renderer {
    renderMainPage() {
        $('.container').empty()
        const source = $('#main-page-template').html()
        const template = Handlebars.compile(source)
        const mainHtml = template()
        $('.container').append(mainHtml)
    }

    renderFlights(flights) {
        $('.flights-container').empty()
        const source = $('#flights-template').html()
        const template = Handlebars.compile(source)
        const flightsHtml = template(flights)
        $('.flights-container').append(flightsHtml)
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
}
