class Renderer {
  renderFrontPage() {
  }

  renderFlights(flights) {
    $('.flights-container').empty()
    const source = $('#flights-template').html()
    const template = Handlebars.compile(source)
    const flightsHtml = template(flights)
    $('.flights-container').append(flightsHtml)
  }

  renderResults(results) {
    $('.results-container').empty()
    const source = $('#results-template').html()
    const template = Handlebars.compile(source)
    const resultsHtml = template(results)
    $('.results-container').append(resultsHtml)
  }
  
  renderCategoryResults(currentResults) {
    $('.results-category-container').empty()
    const source = $('#results-template').html()
    const template = Handlebars.compile(source)
    const categoryHtml = template(currentResults)
    $('.results-category-container').append(categoryHtml)
  }
}