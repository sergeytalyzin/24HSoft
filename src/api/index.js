import AirportData from "../models/airportData";

const url = 'https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48'
export default class Api {
  constructor() {
  }
  getData() {
    return this.load()
  }
  async load() {
    const response = await fetch(url)
    const  data = await response.json()
    return  AirportData.parseTask(data)
  }
}



