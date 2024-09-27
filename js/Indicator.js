import { loadingIndicatorMessage, loadingIcon } from "./selectors.js"

export class Indicator {
  #initialMessage = loadingIndicatorMessage.textContent;

  #setMessage(message) {
    loadingIndicatorMessage.textContent = message;
  }

  startLoading(searchTerm) {
    const searchMessage = searchTerm ? `searching "${searchTerm}"` : "loading...";
    this.#setMessage(searchMessage)
    loadingIcon.classList.remove('hide');
  }

  loadingNextPage() {
    this.#setMessage("loading next page...")
    loadingIcon.classList.remove('hide');
  }

  stopLoading() {
    loadingIcon.classList.add('hide');
  }

  showEndMessage(messageToShow = '') {
    this.stopLoading();
    this.#setMessage(messageToShow);
  }

  reset() {
    this.stopLoading();
    this.#setMessage(this.#initialMessage);
  }

}
