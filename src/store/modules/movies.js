import IDs from "@/store/mock/imdb_top250";
import axios from "@/plugins/axios";
import mutations from "../mutations";

function serializeRespons(movies) {
  return movies.reduce((acc, movies) => {
    acc[movies.imdbID] = movies;
    return acc;
  }, {});
}

const {
  MOVIES,
  CURRENT_PAGE,
  REMOVE_MOVIE,
  TOGGLE_SEARCH,
  ADD_NEW_MOVIE,
  EDIT_MOVIE,
  ADD_CUSTOM_FILM,
} = mutations;

const moviesStrore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
    isSearch: false,
  },
  getters: {
    moviesList: ({ movies }) => movies,
    slicedIDs:
      ({ top250IDs }) =>
      (from, to) =>
        top250IDs.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    moviesLength: ({ top250IDs }) => Object.keys(top250IDs).length,
    isSearch: ({ isSearch }) => isSearch,
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [REMOVE_MOVIE](state, index) {
      state.top250IDs.splice(index, 1);
    },
    [TOGGLE_SEARCH](state, bool) {
      state.isSearch = bool;
    },
    [ADD_NEW_MOVIE](state, id) {
      state.top250IDs.push(id);
    },
    [EDIT_MOVIE](state, newMoviesList) {
      state.movies = newMoviesList;
    },
    [ADD_CUSTOM_FILM](state, newMoviesList) {
      state.movies = newMoviesList;
    },
  },
  actions: {
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch("toggleLoader", true, { root: true });
        const { currentPage, moviesPerPage, slicedIDs } = getters;
        const from = currentPage * moviesPerPage - moviesPerPage;
        const to = currentPage * moviesPerPage;
        const moviesToFetch = slicedIDs(from, to);
        const request = moviesToFetch.map((id) => axios.get(`/?i=${id}`));
        const response = await Promise.all(request);
        console.log(response);
        const movies = serializeRespons(response);
        console.log(movies);
        commit(MOVIES, movies);
        console.log(getters.moviesList);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page);
      dispatch("fetchMovies");
    },
    removeMovie({ commit, dispatch, state }, id) {
      const index = state.top250IDs.findIndex((item) => item == id);
      if (index != -1) {
        commit(REMOVE_MOVIE, index);
        dispatch("fetchMovies");
      }
    },
    addMovieinTop({ commit, getters, state }, id) {
      const index = state.top250IDs.findIndex((item) => item == id);
      if (index == -1) {
        console.log(getters.moviesLength);
        commit(ADD_NEW_MOVIE, id);
        console.log(getters.moviesLength);
      }
    },
    async searchMovies({ commit, dispatch, state }, query) {
      try {
        dispatch("toggleLoader", true, { root: true });

        const queryForSearch = await axios.get(`/?s=${query}`);
        if (queryForSearch.Error) {
          throw Error(queryForSearch.Error);
        }

        const moviesKeys = serializeRespons(queryForSearch.Search);
        const moviesToFetch = Object.keys(moviesKeys);
        const request = moviesToFetch.map((id) => axios.get(`/?i=${id}`));
        const response = await Promise.all(request);
        const movies = serializeRespons(response);

        commit(MOVIES, movies);
        dispatch("toggleSearchState", true);
      } catch (err) {
        dispatch(
          "showNotify",
          {
            msg: err.message,
            title: "Error",
            variant: "danger",
          },
          { root: true }
        );
        if (state.movies.length > 10) {
          dispatch("toggleSearchState", false);
        }
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    toggleSearchState({ commit }, bool) {
      commit(TOGGLE_SEARCH, bool);
    },
    editMovie({ commit, getters }, editMovie) {
      const index = Object.keys(getters.moviesList).findIndex(
        (index) => index == editMovie.imdbID
      );
      const newEditMovie = [editMovie.imdbID, editMovie];
      const arrMoviesList = Object.entries(getters.moviesList);
      const remove = arrMoviesList.splice(index, 1, newEditMovie);
      console.log(remove);
      const newMoviesList = Object.fromEntries(arrMoviesList);
      commit(EDIT_MOVIE, newMoviesList);
    },
    customMovie({ commit, getters }, customMovie) {
      const newCustomMovie = [customMovie.imdbID, customMovie];
      const arrMoviesList = Object.entries(getters.moviesList);
      const removeLastMovie = arrMoviesList.pop();
      console.log(removeLastMovie);
      const addCustomMovie = arrMoviesList.unshift(newCustomMovie);
      console.log(addCustomMovie);
      const newMoviesList = Object.fromEntries(arrMoviesList);
      commit(ADD_CUSTOM_FILM, newMoviesList);
    },
  },
};

export default moviesStrore;
