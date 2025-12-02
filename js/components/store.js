class CoursesStore {
  constructor() {
    this.courses = [];
    this.filteredCourses = [];
    this.visibleCount = 6;
    this.currentFilter = "all";
    this.searchQuery = "";
  }

  async fetchCourses() {
    const response = await fetch("./data/data.json");
    const data = await response.json();
    this.courses = data.courses;
    this.filteredCourses = [...this.courses];
    return this.courses;
  }

  applyFilter(category) {
    this.currentFilter = category;
    this.applyFiltersAndSearch();
  }

  applySearch(query) {
    this.searchQuery = query.toLowerCase();
    this.applyFiltersAndSearch();
  }

  applyFiltersAndSearch() {
    let result = [...this.courses];

    if (this.currentFilter !== "all") {
      result = result.filter(
        (course) =>
          this.normalizeCategory(course.category) === this.currentFilter
      );
    }

    if (this.searchQuery) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(this.searchQuery) ||
          course.author.toLowerCase().includes(this.searchQuery)
      );
    }

    this.filteredCourses = result;
    this.visibleCount = 6; 
  }

  loadMore() {
    this.visibleCount += 3;
  }

  getVisibleCourses() {
    return this.filteredCourses.slice(0, this.visibleCount);
  }

  normalizeCategory(category) {
    return category
      .toLowerCase()
      .replace(/\s*&\s*/g, "-")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  }

  get totalCourses() {
    return this.courses.length;
  }

  get totalFiltered() {
    return this.filteredCourses.length;
  }

  get canLoadMore() {
    return this.visibleCount < this.filteredCourses.length;
  }
}

export const store = new CoursesStore();
