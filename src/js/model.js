import { API_URL, PER_PAGE } from './config.js';
import { getJson } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    name: '',
    results: [],
    resultsPerPage: PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    let data = await getJson(API_URL + '/' + id);
    const obj = data.data.recipe;
    state.recipe = {
      id: obj.id,
      name: obj.title,
      publisher: obj.publisher,
      image: obj.image_url,
      indegridents: obj.ingredients,
      servings: obj.servings,
      url: obj.source_url,
    };

    if (state.bookmarks.some(val => val.id == state.recipe.id)) {
      state.recipe.bookmarked = true;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (food) {
  try {
    state.search.name = food;
    let data = await getJson(`${API_URL}?search=${food}`);
    state.search.results = data.data.recipes.map(val => {
      return {
        id: val.id,
        name: val.title,
        publisher: val.publisher,
        image: val.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  const starts = (page - 1) * state.search.resultsPerPage;
  const ends = state.search.resultsPerPage * page;
  return state.search.results.slice(starts, ends);
};

export const updataServings = function (peopleNumber = state.recipe.servings) {
  state.recipe.indegridents.map(val => {
    val.quantity = (peopleNumber * val.quantity) / state.recipe.servings;
  });
  state.recipe.servings = peopleNumber;
};

export const bookmarks = function (obj) {
  state.bookmarks.push(obj);
  state.recipe.bookmarked = true;
  console.log(state.bookmarks);
  console.log('add');
};

export const deleteBookmarks = function (id) {
  const index = state.bookmarks.findIndex(val => {
    val.id === id;
  });
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
  console.log('delete');
};
