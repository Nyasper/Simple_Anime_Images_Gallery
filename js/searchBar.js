import { searchBar } from "./main.js";
import { currentSearchTerm } from "./globalStates.js";
import { newImageSearch } from "./DOMhandler.js";

let timeoutId;
export function searchBarAction(e) {
  if (e.target.value.length > 2)
  {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      currentSearchTerm.value = e.target.value.trim().replaceAll(' ', '_')
      newImageSearch(currentSearchTerm.value);
    }, 2000);
  }
}

export function clearButtonAction() {
  searchBar.value = ""
}