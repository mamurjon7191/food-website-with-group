const recipeContainer = document.querySelector('.recipe');
import icon from '../img/icons.svg';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

let rendor = async function () {
  const id = window.location.hash.slice(1);
  console.log(id);
  let one = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );
  let two = await one.json();
  const obj = two.data.recipe;
  const saqlovchi = {
    id: obj.id,
    name: obj.title,
    image: obj.image_url,
    indegridents: obj.ingredients,
    publisher: obj.publisher,
    servings: obj.servings,
    url: obj.source_url,
  };
  recipeContainer.innerHTML = '';
  rendorHtml(saqlovchi);
};
// rendor();

let rendorHtml = function (data) {
  let html = `<figure class="recipe__fig">
  <img src="${data.image}" alt="Tomato" class="recipe__img" />
  <h1 class="recipe__title">
    <span>${data.name}</span>
  </h1>
</figure>

<div class="recipe__details">
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icon}#icon-clock"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--minutes">45</span>
    <span class="recipe__info-text">minutes</span>
  </div>
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icon}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">4</span>
    <span class="recipe__info-text">servings</span>

    <div class="recipe__info-buttons">
      <button class="btn--tiny btn--increase-servings">
        <svg>
          <use href="${icon}#icon-minus-circle"></use>
        </svg>
      </button>
      <button class="btn--tiny btn--increase-servings">
        <svg>
          <use href="${icon}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>
  </div>

  <div class="recipe__user-generated">
    <svg>
      <use href="${icon}#icon-user"></use>
    </svg>
  </div>
  <button class="btn--round">
    <svg class="">
      <use href="${icon}#icon-bookmark-fill"></use>
    </svg>
  </button>
</div>

<div class="recipe__ingredients">
  <h2 class="heading--2">Recipe ingredients</h2>
  <ul class="recipe__ingredient-list">
  ${renderIng(data.indegridents).join('')}  
  </ul>
</div>

<div class="recipe__directions">
  <h2 class="heading--2">How to cook it</h2>
  <p class="recipe__directions-text">
    This recipe was carefully designed and tested by
    <span class="recipe__publisher">The Pioneer Woman</span>. Please
    check out directions at their website.
  </p>
  <a
    class="btn--small recipe__btn"
    href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
    target="_blank"
  >
    <span>Directions</span>
    <svg class="search__icon">
      <use href="${icon}#icon-arrow-right"></use>
    </svg>
  </a>
</div>`;
  recipeContainer.insertAdjacentHTML('afterbegin', html);
};
const renderIng = function (fun) {
  let arr = fun.map(val => {
    return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icon}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${val.quantity}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${val.unit}</span>
      ${val.description}
    </div>
  </li>`;
  });
  return arr;
};
['load', 'hashchange'].map(val => {
  window.addEventListener(val, rendor);
});
// window.addEventListener('load', rendor);
// window.addEventListener('hashchange', rendor);
