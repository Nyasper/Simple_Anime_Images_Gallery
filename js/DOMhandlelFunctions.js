import { ImageAPI } from "./imageApi.js";
const api = new ImageAPI();
// DOM MODIFICATION

export async function addImages(tagSearch, ulList) {
  deleteLiElements(ulList);
  api.searchTerm = tagSearch;
  const images = await api.getImages();
  createLiElements(images, ulList);
}

export function createLiElements(images, ulList) {
  createLoading(ulList);
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

export function deleteLiElements(ulList) {
  while (ulList.firstChild)
  {
    ulList.removeChild(ulList.firstChild);
  }
}

function createLoading(ulList) {
  if (!ulList.nextElementSibling) // if loading doesn't exists.
  {
    //create div
    const loadingContainerDiv = document.createElement("div");
    loadingContainerDiv.setAttribute("id", "loadingContainer");

    //create h3
    const h3Element = document.createElement("h3");
    h3Element.textContent = "Loading new Page...";

    //create span
    const spanElement = document.createElement("span");
    spanElement.setAttribute("id", "loading");

    //add to the Div container
    loadingContainerDiv.append(h3Element);
    loadingContainerDiv.append(spanElement);

    //insert after ul
    ulList.insertAdjacentElement('afterend', loadingContainerDiv);
  }
}



export function replaceLoadingWithEndPage() {
  const loadingContainer = document.getElementById("loadingContainer");
  while (loadingContainer.firstChild)
  {
    loadingContainer.removeChild(loadingContainer.firstChild);
  }
  const h3Element = document.createElement("h3");
  h3Element.textContent = "No more Pages.";

  loadingContainer.append(h3Element);
}