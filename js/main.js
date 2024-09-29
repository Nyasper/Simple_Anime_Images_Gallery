import { searchBarAction, clearButtonAction } from "./searchBar.js";
import { scrollActionUl } from "./scrollHandler.js";
import { searchBar, clearButton, ulSelector } from "./selectors.js";

searchBar.addEventListener('input', searchBarAction);
clearButton.addEventListener('click', clearButtonAction);
ulSelector.addEventListener('scroll', scrollActionUl);
