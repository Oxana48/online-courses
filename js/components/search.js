import { store } from "./store.js";

export function initSearch(inputElement) {
  inputElement.addEventListener("input", (event) => {
    const searchTerm = event.target.value.trim();
    store.applySearch(searchTerm);

    document.dispatchEvent(new CustomEvent("courses:updated"));
  });

  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.target.value = "";
      store.applySearch("");
      document.dispatchEvent(new CustomEvent("courses:updated"));
    }
  });
}
