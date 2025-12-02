import { store } from "./store.js";

export function initFilters(container) {
  const filterButtons = container.querySelectorAll(".courses__filter-btn");

  updateFilterCounters(container);

  container.addEventListener("click", (event) => {
    const filterBtn = event.target.closest(".courses__filter-btn");
    if (!filterBtn) return;

    filterButtons.forEach((btn) =>
      btn.classList.remove("courses__filter-btn--active")
    );
    filterBtn.classList.add("courses__filter-btn--active");

    const category = filterBtn.dataset.category;
    store.applyFilter(category);

    document.dispatchEvent(new CustomEvent("courses:updated"));
  });
}

function updateFilterCounters(container) {
  const filterButtons = container.querySelectorAll(".courses__filter-btn");

  filterButtons.forEach((button) => {
    const category = button.dataset.category;
    const existingCounter = button.querySelector(".courses__filter-counter");

    if (existingCounter) existingCounter.remove();

    const counterSpan = document.createElement("span");
    counterSpan.className = "courses__filter-counter";

    if (category === "all") {
      counterSpan.textContent = store.totalCourses;
    } else {
      const count = store.courses.filter(
        (course) => store.normalizeCategory(course.category) === category
      ).length;
      counterSpan.textContent = count;
    }

    button.appendChild(counterSpan);
  });
}
