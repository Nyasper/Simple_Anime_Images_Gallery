import { ImageAPI } from "./imageApi.js";
import { fetchNextPage, currentSearchTerm } from "./globalStates.js";

// Elements
const ulList = document.getElementById("lista");
const loadingContainer = document.getElementById("loadingContainer");


document.addEventListener("custom:loadNextPage", async () => {
  console.log("EVENTO loadNextPage Disparado")
  try 
  {
    await newImagePageSearch(currentSearchTerm.value);
    if (api.hasNextPage)
    {
      fetchNextPage.value = false;
    } else
    {
      replaceLoadingWithEndPage()
    }
  } catch (error)
  {
    console.error("Error al cargar la nueva página de imágenes:", error);
    // Resetear el estado en caso de error
    state.fetchNextPage.value = false;
  }

})

// api 
const api = new ImageAPI();

// ul Modification

// Enter a new Search
export async function newImageSearch() {
  // reset states
  fetchNextPage.value = false;
  api.resetApiImage();

  // update DOM
  deleteLiElements();
  showLoading();

  // fetch data
  api.searchTerm = currentSearchTerm.value;
  const images = await api.getImages();

  if (images.length > 0) createLiElements(images);
  else noResults();

}

// Add new page scrolling
export async function newImagePageSearch() {
  // page+1
  api.page += 1;

  // fetch data
  const images = await api.getImages();

  //update DOM
  createLiElements(images);
}

// DOM manipulation Functions

function createLiElements(images) {
  for (const img of images)
  {
    const liElement = document.createElement("li");
    const aElement = document.createElement("a");
    const imgElement = document.createElement('img');

    img.preview_url && imgElement.setAttribute("src", img.preview_url);

    aElement.setAttribute("href", img.file_url);
    aElement.setAttribute("target", "_blank");
    aElement.append(imgElement);

    liElement.append(aElement);
    ulList.append(liElement);
  }
}

function deleteLiElements() {
  while (ulList.firstChild)
  {
    ulList.removeChild(ulList.firstChild);
  }
}

function showLoading() {
  deleteLoading();
  //create h3
  const h3Element = document.createElement("h3");
  h3Element.textContent = "Loading new Page...";

  //create span (icon)
  const spanElement = document.createElement("span");
  spanElement.setAttribute("id", "loading");

  //add to the Div container
  loadingContainer.append(h3Element);
  loadingContainer.append(spanElement);

}

function deleteLoading() {
  while (loadingContainer.firstChild)
  {
    loadingContainer.removeChild(loadingContainer.firstChild);
  }
}

function replaceLoadingWithEndPage() {
  deleteLoading();
  const h3Element = document.createElement('h3');
  h3Element.textContent = `${api.page}/${api.page} pages loaded, ${ulList.children.length} images loaded.`;
  loadingContainer.append(h3Element);
}

function noResults() {
  deleteLoading();
  const h2Element = document.createElement('h3');
  h2Element.textContent = `No Results for "${currentSearchTerm.value}".`;

  loadingContainer.append(h2Element);
}

