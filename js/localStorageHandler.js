export class LocalStorageHandler {
  #key = '';
  constructor(key) {
    this.#key = key;
  }

  set value(value) {
    if (value.length > 0) localStorage.setItem(this.#key, JSON.stringify(value));
    else localStorage.setItem(this.#key, JSON.stringify([document.getElementById("safeCheck").name]));
  }
  get value() {
    return this.exists() ? JSON.parse(localStorage.getItem(this.#key)) : null;
  }

  remove() {
    localStorage.removeItem(this.#key);
  }

  exists() {
    return localStorage.getItem(this.#key) !== null && JSON.parse(localStorage.getItem(this.#key)).length > 0;
  }
}