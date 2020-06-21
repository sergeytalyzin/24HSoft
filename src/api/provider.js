

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getData() {

    const storeTasks = Object.values(this._store.getAll());
    return Promise.resolve(storeTasks);
  }

  setData() {
    this._api.getData().then(
      (data) => {
       this._store.setItem(data);
      }
    )
  }
}
