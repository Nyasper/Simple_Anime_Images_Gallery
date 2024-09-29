import { searchBar, suggestionsBox } from "./selectors.js";
import { currentSearchTerm } from "./globalStates.js";
import { newImageSearch } from "./DOMhandler.js";
import { handleSuggestions } from "./suggestionsHandler.js";

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

let currentFocus = -1;
searchBar.addEventListener('keydown', (e) => {
  const items = suggestionsBox.querySelectorAll('.suggestionItem');
  if (e.key === 'ArrowDown')
  {
    currentFocus++;
    if (currentFocus >= items.length) currentFocus = 0;
    setActive(items);
  } else if (e.key === 'ArrowUp')
  {
    currentFocus--;
    if (currentFocus < 0) currentFocus = items.length - 1;
    setActive(items);
  } else if (e.key === 'Enter')
  {
    e.preventDefault();
    if (currentFocus > -1)
    {
      if (items[currentFocus])
      {
        searchBar.value = items[currentFocus].children[0].textContent;
        suggestionsBox.innerHTML = '';
        newImageSearch(searchBar.value);
      }
    }
  }
});

function setActive(items) {
  const activeClass = "suggestionActive";
  for (let item of items)
  {
    item.classList.remove(activeClass);
  }
  if (items[currentFocus])
  {
    items[currentFocus].classList.add(activeClass);
    items[currentFocus].scrollIntoView({
      block: 'nearest'
    });
  }
}

searchBar.addEventListener('blur', () => {
  setTimeout(() => { suggestionsBox.innerHTML = ''; }, 100);
});

export function clearButtonAction() {
  searchBar.value = ""
  searchBar.focus();
}
