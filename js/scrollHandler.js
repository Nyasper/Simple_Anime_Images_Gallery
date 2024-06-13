import { fetchNextPage } from "./globalStates.js";

// Custom Event
const loadNextPageEvent = new CustomEvent("custom:loadNextPage");

// Scroll
export function scrollActionUl() {
  const scrollPercentage = getScrollPercentage();
  if (scrollPercentage > 75 && !fetchNextPage.value)
  {
    fetchNextPage.value = true;
    document.dispatchEvent(loadNextPageEvent); // trigger Custom Event
  };
}

function getScrollPercentage() {
  // Obtener la posición actual de desplazamiento
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  // Obtener la altura total del documento
  const docHeight = document.documentElement.scrollHeight;

  // Obtener la altura de la ventana de visualización
  const winHeight = window.innerHeight;

  // Calcular el porcentaje de scroll
  const scrollPercentage = (scrollTop / (docHeight - winHeight)) * 100;

  return scrollPercentage;
}
