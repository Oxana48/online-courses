import { store } from "./components/store.js";
import { renderCards } from "./components/render.js";
import { initFilters } from "./components/filters.js";
import { initSearch } from "./components/search.js";

const coursesGrid = document.getElementById("coursesGrid");
const filtersContainer = document.getElementById("filtersContainer");
const searchInput = document.getElementById("searchInput");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const emptyState = document.getElementById("emptyState");

async function init() {
  try {
    await store.fetchCourses();

    initFilters(filtersContainer);
    initSearch(searchInput);

    loadMoreBtn.addEventListener("click", () => {
      store.loadMore();
      updateUI();
    });

    document.addEventListener("courses:updated", updateUI);

    updateUI();
  } catch (error) {
    console.error("Ошибка при инициализации:", error);
    showErrorMessage();
  }
}

function updateUI() {
  const visibleCourses = store.getVisibleCourses();
  renderCards(coursesGrid, visibleCourses);

   if (loadMoreBtn) {
  
    loadMoreBtn.style.display = store.canLoadMore ? 'flex' : 'none';
   
  }
  

  if (emptyState) {
    emptyState.style.display = store.filteredCourses.length === 0 ? 'flex' : 'none';
  }
}

function updateCoursesCounter() {
  const counter = document.getElementById("coursesCounter");
  if (counter) {
    const visible = Math.min(store.visibleCount, store.totalFiltered);
    counter.textContent = `Showing ${visible} of ${store.totalFiltered} courses`;
  }
}

function showErrorMessage() {
  coursesGrid.innerHTML = `
    <div class="courses__error">
      <h3 class="courses__error-title">Ошибка загрузки данных</h3>
      <p class="courses__error-text">Пожалуйста, обновите страницу</p>
    </div>
  `;
  loadMoreBtn.style.display = "none";
}

document.addEventListener("DOMContentLoaded", init);
