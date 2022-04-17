import icon from '../../img/icons.svg';

class Pagination {
  #parentElement = document.querySelector('.pagination');
  #data;
  rendor(data) {
    this.#data = data;
    this.rendorPages();
  }
  rendorPages() {
    const lastPage = Number(
      Math.ceil(this.#data.results.length / this.#data.resultsPerPage)
    );
    const currentPage = this.#data.currentPage;
    // ikkalasiyam borligi
    if (currentPage < lastPage && currentPage > 1) {
    }
    // faqat oldi button borligi
    if (lastPage > 1 && currentPage === 1) {
    }
    //faqat orqa button borligi
    if (currentPage === lastPage && lastPage > 1) {
    }
  }
}
export default new Pagination();
// <!-- <button class="btn--inline pagination__btn--prev">
/* <svg class="search__icon">
<use href="src/img/icons.svg#icon-arrow-left"></use>
</svg>
<span>Page 1</span>
</button>
<button class="btn--inline pagination__btn--next">
<span>Page 3</span>
<svg class="search__icon">
<use href="src/img/icons.svg#icon-arrow-right"></use>
</svg>
</button> --> */
