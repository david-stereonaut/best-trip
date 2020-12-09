class FlightsManager {
  constructor() {
    this.flights = []
  }
  async getFlightsData(flyFrom, flyTo, dateStart, dateEnd) {
    let flightsData = await $.post("/flights", { flyFrom, flyTo, dateStart, dateEnd })
    if (flightsData.error || flightsData.length == 0){
      console.log(flightsData)
      return flightsData
    } else {
      flightsData.forEach(f => {
        f.aTime = moment.unix(f.aTime).format('DD/MM/YYYY HH:mm')
        f.dTime = moment.unix(f.dTime).format('DD/MM/YYYY HH:mm')
      })
      this.flights = flightsData
  
      return this.flights
    }
  }
}