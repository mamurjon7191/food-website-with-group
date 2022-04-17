import icon from '../../img/icons.svg';

class SearchResult {
  #parentElement = document.querySelector('.results');
  #data;
  rendor(data) {
    this.#data = data;
    this.#clearHtml();
    this.#rendorHtml();
  }
  #rendorHtml() {
    this.#data.forEach(data => {
      const html = ` <li class="preview">
          <a class="preview__link preview__link--active" href="#${data.id}">
            <figure class="preview__fig">
              <img src="${data.image}" alt="Test" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${data.name}</h4>
              <p class="preview__publisher">${data.publisher}</p>
              <div class="preview__user-generated">
                <svg>
                  <use href="${icon}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>`;
      this.#parentElement.insertAdjacentHTML('afterbegin', html);
    });
  }
  #clearHtml() {
    this.#parentElement.innerHTML = '';
  }
  spinner() {
    const html = `<div class="spinner">
        <svg>
          <use href="${icon}#icon-loader"></use>
        </svg>
      </div> `;
    this.#clearHtml();
    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
export default new SearchResult();
