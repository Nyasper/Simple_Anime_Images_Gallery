import { fetchNextPage } from "./globalStates.js";
import { ulSelector } from "./selectors.js";

// Custom Event
const loadNextPageEvent = new CustomEvent("custom:loadNextPage");

// Scroll
export function scrollActionUl() {
  const scrollPercentage = getScrollPercentage();
  console.log({ scrollPercentage })
  if (scrollPercentage > 75 && !fetchNextPage.value)
  {
    fetchNextPage.value = true;
    document.dispatchEvent(loadNextPageEvent); // trigger Custom Event
  };
}

function getScrollPercentage() {
  // Obtener la posición actual de desplazamiento
  const scrollTop = ulSelector.scrollTop;
  // const scrollTop = window.scrollY || document.documentElement.scrollTop;

  // Obtener la altura total del contenido del ul
  const scrollHeight = ulSelector.scrollHeight;

  // Obtener la altura visible del ul
  const clientHeight = ulSelector.clientHeight;

  // Calcular el porcentaje de scroll
  const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

  return scrollPercentage;
}
