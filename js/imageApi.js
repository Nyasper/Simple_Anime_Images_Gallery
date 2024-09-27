import { LocalStorageHandler } from "./localStorageHandler.js";
import { Indicator } from "./Indicator.js";

export class ImageAPI {

  static ratings = {
    default: "rating:s",

    safe: "rating:s",
    questionable: "rating:q",
    explicit: "rating:e",

    safe$questionable: "-rating:e",
    safe$explicit: "-rating:q",
    questionable$explicit: "-rating:s",


    all: "",
  };

  #apiUrl = new URL(`https://yande.re/post.json`);

  #page = 1;
  #searchTerm;
  #rating = ImageAPI.ratings.default;

  #loadingIndicator = new Indicator();
  #hasNextPage = false;

  #definitiveLimit = 40;
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
  get hasNextPage() {
    return this.#hasNextPage;
  }

  #updateRating() {

    const ratingKeys = Object.keys(ImageAPI.ratings);
    const activedRatings = filterCheckboxs.filter((k) => ratingKeys.includes(k.name) && k.checked).map((f) => f.name);

    //save in Local Storage
    LShandler.value = activedRatings;
    syncCheckBoxWithLS(activedRatings)


    if (activedRatings.length === filterCheckboxs.length)
    {
      this.#rating = ImageAPI.ratings.all;
    }
    else
    {
      let finalString = '';
      filterCheckboxs.forEach(c => {
        if (c.checked) finalString += `$${c.name}`;
      })
      finalString = finalString.slice(1); // delete the first '$'

      this.#rating = ImageAPI.ratings[finalString] ?? ImageAPI.ratings.default;
    }

  }

  #updatedUrl() {
    const url = this.#apiUrl;


    // update rating filter
    this.#updateRating()
    url.searchParams.set('tags', this.#rating + ' ' + this.#searchTerm);

    url.searchParams.set('page', this.#page);
    if (this.#perPageLimit < this.#definitiveLimit) url.searchParams.set('limit', this.#perPageLimit);
    return url;
  }

  resetApiImage() {
    this.#page = 1;
    this.#searchTerm = '';
    this.#hasNextPage = false;
  }

  async getImages() {
    try 
    {
      this.#loadingIndicator.startLoading(this.#searchTerm);

      const url = this.#updatedUrl();
      const response = await fetch(url);

      const images = await response.json();


      // has next page
      this.#hasNextPage = images.length === this.#perPageLimit;
      if (this.#hasNextPage)
      {
        this.#loadingIndicator.showEndMessage(`${this.#searchTerm} results, page ${this.#page}/?`)
      }
      else 
      {
        if (images.length > 0) this.#loadingIndicator.showEndMessage(`${this.#page}/${this.#page} pages loaded.`);
        else this.#loadingIndicator.showEndMessage(`No Results for "${this.#searchTerm}".`)
      }

      return images
    }
    catch (error)
    {
      console.error(error);
      this.#loadingIndicator.showEndMessage(`something went wrong.`)
      return []
    }
  }
}

// DOM filter CheckBoxs
const safeCheck = document.getElementById("safeCheck");
const questionableCheck = document.getElementById("questionableCheck");
const explicitCheck = document.getElementById("explicitCheck");
const filterCheckboxs = [safeCheck, questionableCheck, explicitCheck];

// update checked boxes with Local Storage Values
const LShandler = new LocalStorageHandler("filters");
const filtersInLS = LShandler.value ?? [safeCheck.name];

// Sync Checkboxs with Local Storage
syncCheckBoxWithLS(filtersInLS);
function syncCheckBoxWithLS(activedRatings) {
  filterCheckboxs.forEach((f) => {
    if (activedRatings.includes(f.name)) f.checked = true;
    else f.checked = false;
  })
}