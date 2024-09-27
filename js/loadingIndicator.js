import { loadingIndicatorMessage, loadingIcon } from "./selectors.js"

const initialMessage = loadingIndicatorMessage.textContent;

function setMessage(message) {
  loadingIndicatorMessage.textContent = message;
}

function stopLoading() {
  loadingIcon.classList.add('hide');
}

export function startLoading(searchTerm) {
  const searchMessage = searchTerm ? `searching "${searchTerm}"` : "loading...";
  setMessage(searchMessage)
  loadingIcon.classList.remove('hide');
}

export function loadingNextPage() {
  setMessage("loading next page...")
  loadingIcon.classList.remove('hide');
}

export function showEndMessage(messageToShow = '') {
  stopLoading();
  setMessage(messageToShow);
}

export function resetLoading() {
  stopLoading();
  setMessage(initialMessage);
}
