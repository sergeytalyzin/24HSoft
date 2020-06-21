import AirportData from "../models/airportData";

const url = 'https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48'
// const checkStatus = (response) => {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   } else {
//     throw new Error(`${response.status}: ${response.statusText}`);
//   }
// };



export default class Api {
  constructor() {
  }

  getData() {
    return this.load()
  }

  // load(method = `GET`) {
  //   return fetch(url,{
  //     method
  //   })
  //     .then(response =>response.json())
  //     .then(AirportData.parseTask)
  // }
  async load() {
    const response = await fetch(url)
    const  data = await response.json()
    return  AirportData.parseTask(data)
  }

  // _load({url, method = Method.GET, body = null, headers = new Headers()}) {
  //   return fetch(url, {method, body, headers})
  //     .then(checkStatus)
  //     .catch((err) => {
  //       throw err;
  //     });
  // }
}



