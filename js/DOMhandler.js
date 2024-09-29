import { ImageAPI } from "./imageApi.js";
import { ulSelector as ulList } from "./selectors.js";
import { fetchNextPage, currentSearchTerm } from "./globalStates.js";

document.addEventListener("custom:loadNextPage", async () => {
  try 
  {
    if (api.hasNextPage)
    {
      await newImagePageSearch(currentSearchTerm.value);
    }
    if (api.hasNextPage)
    {
      fetchNextPage.value = false;
    }
  }
  catch (error)
  {
    console.error("Error al cargar la nueva página de imágenes:", error);
    // Resetear el estado en caso de error
    state.fetchNextPage.value = false;
  }

})

const api = new ImageAPI();

export async function newImageSearch(searchTerm) {

  // reset states
  fetchNextPage.value = false;
  api.resetApiImage();

  // update DOM
  deleteLiElements();

  // fetch data
  api.searchTerm = searchTerm;
  const images = await api.getImages();

  if (images.length > 0) createLiElements(images);
}

// Add new page scrolling
export async function newImagePageSearch() {
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
