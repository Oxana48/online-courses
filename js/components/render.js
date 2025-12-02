import { store } from "./store.js";

export function createCard(course) {
  const card = document.createElement("div");
  card.className = "courses__card";
  const normalizedCategory = store.normalizeCategory(course.category);
  card.dataset.category = normalizedCategory;

  const categoryClass = "category-" + normalizedCategory;

  card.innerHTML = `   
    <img class="courses__card-image" src=${course.image} alt=${course.title}>
    <div class="courses__card-info">
      <span class="courses__card-category ${categoryClass}">${course.category}</span>
      <h3 class="courses__card-title">${course.title}</h3>
      <div class="courses__card-bottom">
        <span class="courses__card-price">${course.price}</span> 
        <span class="courses__card-by">by</span>
        <span class="courses__card-author">${course.author}</span>
      </div>         
    </div>
  `;

  return card;
}

export function renderCards(container, courses) {
  container.innerHTML = "";

  courses.forEach((course) => {
    const card = createCard(course);
    container.appendChild(card);
  });
}
