import { newImageSearch } from "./DOMhandler.js";
import { suggestionsBox, searchBar } from "./selectors.js";
import { allSuggestions } from "./allSuggestions.js";

export function handleSuggestions(searchTerm) {
  deleteSuggestions();
  if (searchTerm.length > 0)
  {
    const results = allSuggestions.filter(s => {
      const matchName = s.name.toLowerCase().startsWith(searchTerm);
      const matchAlias = s.alias?.toLowerCase().startsWith(searchTerm);

      return matchName | matchAlias
    });
    createLiElement(results);

  }
}

function createLiElement(results) {
  for (const result of results)
  {
    const liItem = document.createElement('li');
    liItem.classList.add('suggestionItem');

    liItem.innerHTML = `<span>${result.name}</span><span><b>type:</b> ${result.type}</span>`

    liItem.addEventListener('click', () => {
      searchBar.value = result.name;
      newImageSearch(result.name);
    })

    suggestionsBox.appendChild(liItem);
  }
}

function deleteSuggestions() {
  while (suggestionsBox.firstChild)
  {
    suggestionsBox.firstChild.remove();
  }
}