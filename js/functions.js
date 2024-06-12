import { ImageAPI } from "./imageApi.js";

export const miEvento = new Event("custom:miEvento");
document.addEventListener("custom:miEvento", (e) => {
  console.log("Mi Evento se ha ejecutado:", e)
})
document.dispatchEvent(miEvento);

export const miFuncionSaludar = () => console.log("hola desde otra funcion")

export async function fetchData(searchTerm = '', page = 1) {
  try
  {
    const imageApi = new ImageAPI();
    imageApi.page = 1;
    imageApi.rating = ImageAPI.ratings.safe;
    imageApi.searchTerm = searchTerm.toLowerCase().replaceAll(" ", "_");

    console.log('buscando:', imageApi)

    console.log('buscando:', imageApi.searchTerm)
    return await imageApi.getImages()
  } catch (error)
  {
    console.error(error);
    return [];
  }
}


