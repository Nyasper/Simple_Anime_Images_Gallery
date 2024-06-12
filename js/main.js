import { fetchData } from "./functions.js";
import * as DOMhandler from "./DOMhandlelFunctions.js"

const ulList = document.getElementById("lista");
const searchBar = document.getElementById("search");

let timeoutId;
searchBar.addEventListener('keyup', (e) => {
  if (e.target.value.length > 2)
  {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const searchQuery = e.target.value
      DOMhandler.addImages(searchQuery, ulList);
    }, 2000);
  }
})


let page = 2;
let stopPageLoader = false;
window.addEventListener('scrollend', async () => {
  document.dispatchEvent(miEvento);
  const ulHeight = ulList.scrollHeight;
  const scrollY = window.scrollY;
  const totalScroll = (scrollY / (ulHeight - window.innerHeight)) * 100; //totalScroll in %
  console.log({ totalScroll })
  if (totalScroll > 75 && !stopPageLoader)
  {
    const hasNextPage = await loadNextPage(page);
    if (hasNextPage)
    {
      page += 1;
    } else
    {
      DOMhandler.replaceLoadingWithEndPage();
      stopPageLoader = true;
    }
  }

});

async function loadNextPage(pageNumber = 2) {
  const tagSearch = searchBar.value;
  const images = await fetchData(tagSearch, pageNumber);

  DOMhandler.createLiElements(images, ulList);

  return images.length < 40 ? false : true;
}
