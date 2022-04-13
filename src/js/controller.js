import * as model from './model.js';
import recipeView from './views/recipeView.js';

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
  try {
    const id = window.location.hash.slice(1);
    recipeView.spinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['load', 'hashchange'].map(val => {
  window.addEventListener(val, rendor);
});
