class SearchView {
  #parentElement = document.querySelector('.search');
  data;
  getValue() {
    const val = document.querySelector('.search__field').value;
    this.clearInput();
    return val;
  }
  clearInput() {
    document.querySelector('.search__field').value = '';
  }
  addHandleEvent(data) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      data();
    });
  }
}
export default new SearchView();
