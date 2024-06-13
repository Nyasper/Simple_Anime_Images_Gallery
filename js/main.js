import { searchBarAction, clearButtonAction } from "./searchBar.js";
import { scrollActionUl } from "./scrollHandler.js";

export const searchBar = document.getElementById("search");
searchBar.addEventListener('keyup', searchBarAction);

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearButtonAction);

window.addEventListener('scroll', scrollActionUl);
