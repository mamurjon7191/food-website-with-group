import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import SearchResult from './views/searchResultsView.js';
import searchResultsView from './views/searchResultsView.js';
import Pagination from './views/paginationView';

// https://forkify-api.herokuapp.com/v2

//////////////////////////////////////////////////

let rendor = async function () {
  try {
    const id = window.location.hash.slice(1);

    recipeView.spinner();
    // await model.loadRecipe(id);
    await model.loadRecipe(id);
    // console.log(race);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.errorNotify();
  }
};

////////////////////////////////////

let controlSearch = async function () {
  try {
    let data = searchView.getValue();
    if (!data) return;
    await model.loadSearchResults(data);
  } catch (err) {
    alert(err);
  }
};

const controlSearchResults = async function () {
  searchResultsView.spinner();
  await controlSearch();
  SearchResult.rendor(model.getSearchResultsPage()); // shu yerda nimaga qavs qoyilvotti
  Pagination.rendor(model.state.search);
};

const controlServings = function (servingNum) {
  model.updataServings(servingNum);
};

const controlBookmarks = function () {
  // model.bookmarks(model.state.recipe);
  if (model.state.recipe.bookmarked) {
    model.deleteBookmarks(model.state.recipe.id);
  } else {
    model.bookmarks(model.state.recipe);
  }
  recipeView.render(model.state.recipe);
};

let init = function () {
  recipeView.addHandleEvent(rendor);
  searchView.addHandleEvent(controlSearchResults);
  recipeView.addHandle(controlServings);
  recipeView.addHandleBookmark(controlBookmarks);
};

init();
