import { searchBar, suggestionsBox } from "./selectors.js";
import { currentSearchTerm } from "./globalStates.js";
import { newImageSearch } from "./DOMhandler.js";
import { handleSuggestions } from "./suggestionsHandler.js";

// Lista de palabras para las sugerencias


let timeoutId;
export function searchBarAction(e) {
  const searchTerm = e.target.value.trim();
  currentSearchTerm.value = searchTerm;
  handleSuggestions(searchTerm);
  if (e.target.value.length > 2)
  {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      newImageSearch(searchTerm);
    }, 2000);
  }
}

searchBar.addEventListener('blur', () => {
  setTimeout(() => { suggestionsBox.innerHTML = ''; }, 100); // Un pequeño retraso para permitir seleccionar una sugerencia
});

export function clearButtonAction() {
  searchBar.value = ""
  searchBar.focus();
}
