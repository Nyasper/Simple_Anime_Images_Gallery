const lista = document.getElementById("lista");
const searchBar = document.getElementById("search");

let timeoutId;
searchBar.addEventListener('keyup', (e) => {
  if (e.target.value.length > 2)
  {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const searchQuery = e.target.value
      addImages(searchQuery);
    }, 2000);
  }
})

let page = 2;
let stopPageLoader = false;
window.addEventListener('scrollend', async () => {
  const ulHeight = lista.scrollHeight;
  const scrollY = window.scrollY;
  const totalScroll = (scrollY / (ulHeight - window.innerHeight)) * 100; //totalScroll in %
  if (totalScroll > 75 && !stopPageLoader)
  {
    const hasNextPage = await loadNextPage(page);
    if (hasNextPage)
    {
      page += 1;
    } else
    {
      replaceLoadingWithEndPage();
      stopPageLoader = true;
    }
  }

});

function createLoading() {
  if (!lista.nextElementSibling)
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

    //add to the container
    loadingContainerDiv.append(h3Element);
    loadingContainerDiv.append(spanElement);

    //insert after ul
    lista.insertAdjacentElement('afterend', loadingContainerDiv);
  }
}

function replaceLoadingWithEndPage() {
  const loadingContainer = document.getElementById("loadingContainer");
  while (loadingContainer.firstChild)
  {
    loadingContainer.removeChild(loadingContainer.firstChild);
  }
  const h3Element = document.createElement("h3");
  h3Element.textContent = "No more Pages.";

  loadingContainer.append(h3Element);
}

async function loadNextPage(pageNumber = 2) {
  const tagSearch = searchBar.value;
  const images = await fetchData(tagSearch, pageNumber);

  createLiElements(images)

  return images.length < 40 ? false : true;
}


async function fetchData(searchQuery, page = 1) {
  const rating = {
    all: "",
    safe: "s",
    questionable: "q",
    explicit: "e"
  };
  try
  {
    searchQuery = searchQuery.toLowerCase().replaceAll(" ", "_")
    const res = await fetch(`https://yande.re/post.json?tags=${rating.safe} ${searchQuery}&page=${page}`);
    const data = await res.json();
    return data
  } catch (error)
  {
    console.error(error);
    return [];
  }
}

async function addImages(tagSearch) {
  deleteLiElements()
  const images = await fetchData(tagSearch);
  createLiElements(images);
}

function createLiElements(dataFetched) {
  createLoading();
  for (const img of dataFetched)
  {
    const liElement = document.createElement("li");
    const aElement = document.createElement("a");
    const imgElement = document.createElement('img');
    img.preview_url ? imgElement.setAttribute("src", img.preview_url) : undefined;
    aElement.setAttribute("href", img.file_url)
    aElement.setAttribute("target", "_blank")
    aElement.append(imgElement)
    liElement.append(aElement)
    lista.append(liElement)
  }
}

function deleteLiElements() {
  while (lista.firstChild)
  {
    lista.removeChild(lista.firstChild);
  }
}