class FlightsManager {
  constructor() {
    this.flights = []
  }
  getFlightsData = async (flyFrom, flyTo, lat, lng, DateStart, DateEnd) => {
    let flightsData = await $.post("/flights", { flyFrom, flyTo, lat, lng, DateStart, DateEnd })
    this.flights = flightsData
    return this.flights
  }
}