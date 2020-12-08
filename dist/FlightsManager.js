class FlightsManager {
  constructor() {
    this.flights = []
  }
  getFlightsData = async (flyFrom, flyTo, dateStart, dateEnd) => {
    let flightsData = await $.post("/flights", { flyFrom, flyTo, dateStart, dateEnd })
    flightsData.forEach(f => {
        f.aTime = moment(f.aTime).format('DD/MM/YYYY')
        f.dTime = moment(f.dTime).format('DD/MM/YYYY')
    })
    this.flights = flightsData

    return this.flights
  }
}