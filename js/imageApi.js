

export class ImageAPI {

  static ratings = {
    all: "",
    safe: "s",
    questionable: "q",
    explicit: "e"
  };

  #apiUrl = new URL(`https://yande.re/post.json`);

  #page = 1;
  #searchTerm = '';
  #rating = ImageAPI.ratings.safe;
  #hasNextPage = false;

  #definitiveLimit
  #perPageLimit;
  constructor(limit = this.#definitiveLimit) {
    this.#perPageLimit = limit;
  }

  set page(value) {
    if (typeof value === 'number' && value > 0)
    {
      this.#page = value;
    } else
    {
      throw new Error('La página debe ser un número positivo.');
    }
  }
  get page() {
    return this.#page;
  }

  set searchTerm(value) {
    if (typeof value === 'string')
    {
      this.#searchTerm = value;
    } else
    {
      throw new Error('El término de búsqueda debe ser una cadena.');
    }
  }
  get searchTerm() {
    return this.#searchTerm;
  }

  get hasNextPage() {
    return this.#hasNextPage;
  }

  set rating(value) {
    const ratings = ImageAPI.ratings;
    if (typeof value === 'string')
    {
      if (value === ratings.all || value === ratings.safe || value === ratings.questionable || value === ratings.explicit) this.#rating = value;
    } else throw new Error("rating must be 'all','safe','questionable','explicit'")
    this.#rating = value
  }

  #updatedUrl() {
    const url = this.#apiUrl;
    url.searchParams.set('tags', this.#rating + ' ' + this.#searchTerm);
    url.searchParams.set('page', this.#page);
    if (this.#perPageLimit < this.#definitiveLimit) url.searchParams.set('limit', this.#perPageLimit);
    return url;
  }

  async getImages() {
    const url = this.#updatedUrl();
    const response = await fetch(url);

    const images = await response.json();
    this.#hasNextPage = images.length === this.#perPageLimit;

    return images
  }
}
