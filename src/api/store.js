export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;

  }
  getAll() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey));
    } catch (err) {
      return {}
    }
  }

  setItem(data) {
     this._storage.setItem(
      this._storeKey,
      JSON.stringify(data)
    );
  }
}
