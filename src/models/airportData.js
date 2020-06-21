export default class AirportData {
  constructor(data) {
    this.data = data;
  }
  static parseTask(data) {
    return new AirportData(data);
  }
}


