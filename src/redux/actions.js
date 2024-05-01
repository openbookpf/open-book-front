import axios from "axios";

export const FILTER_BOOKS_BY_LANGUAGE = "FILTER_BOOKS_BY_LANGUAGE";
export const FILTER_BOOKS_BY_GENRE = "FILTER_BOOKS_BY_GENRE";
export const GET_BOOKS = "GET_BOOKS";
export const GET_USERS = "GET_USERS";
export const SORT_BY_TITLE = "SORT_BY_TITLE";
export const SORT_BY_PRICE = "SORT_BY_PRICE";
export const SEARCH_BOOK_BY_NAME = "SEARCH_BOOK_BY_NAME";
export const CHANGE_NAME = "CHANGE_NAME";
export const ADD_TO_CART = "ADD_TO_CART";
export const RESET_SEARCHED_BOOKS = "RESET_SEARCHED_BOOKS";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REMOVE_ALL = "REMOVE_ALL";
export const UPDATE_CART_FROM_STORAGE = "UPDATE_CART_FROM_STORAGE";
export const GET_GENRES_AND_AUTHORS = "GET_GENRES_AND_AUTHORS";
export const GET_BOOKS_FILTERS = "GET_BOOKS_FILTERS";
export const APPLIED_FILTERS = "APPLIED_FILTERS";
export const GET_BOOKS_BY_GENRE = "GET_BOOKS_BY_GENRE";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const LOAD_FAVORITES_FROM_STORAGE = "LOAD_FAVORITES_FROM_STORAGE";

export const filterBooksByLanguage = (language) => ({
  type: FILTER_BOOKS_BY_LANGUAGE,
  payload: language,
});

export const addToFavorites = (product) => ({
    type: "ADD_TO_FAVORITES",
    payload: product,
});

export const removeFromFavorites = (ISBN) => ({
    type: "REMOVE_FROM_FAVORITES",
    payload: ISBN,
});

export const loadFavoritesFromStorage = (favorites) => ({
    type: LOAD_FAVORITES_FROM_STORAGE,
    payload: favorites,
});

export const addToFavoritesWithPersistence = (product) => {
    return (dispatch, getState) => {
        dispatch(addToFavorites(product));

        const { favorites } = getState();
        localStorage.setItem("favorites", JSON.stringify(favorites));
    };
};

export const removeFromFavoritesWithPersistence = (ISBN) => {
    return (dispatch, getState) => {
        dispatch(removeFromFavorites(ISBN));

        const { favorites } = getState();
        localStorage.setItem("favorites", JSON.stringify(favorites));
    };
};

export const loadFavoritesFromStorageOnStart = () => {
    return (dispatch) => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        dispatch(loadFavoritesFromStorage(favorites));
    };
};

export const updateCartFromStorage = (cartItems) => ({
    type: UPDATE_CART_FROM_STORAGE,
    payload: cartItems,
});

export const addToCart = (product) => {
    return (dispatch, getState) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: product,
        });

        const { items } = getState();
        localStorage.setItem("cart", JSON.stringify(items));
    };
};

export const removeFromCart = (ISBN) => {
    return (dispatch, getState) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: ISBN,
        });
        const { items } = getState();
        localStorage.setItem("cart", JSON.stringify(items));
    };
};

export const removeAll = (ISBN) => {
    return (dispatch, getState) => {
        const { items } = getState();
        const updatedItems = items.filter((item) => item.ISBN !== ISBN);
        dispatch({
            type: "REMOVE_ALL",
            payload: updatedItems,
        });
        localStorage.setItem("cart", JSON.stringify(updatedItems));
    };
};

export const search_book_by_name = (name) => {

  return async function (dispatch) {
    await fetch(`https://open-book-back.onrender.com/books?name=${name}`)
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: SEARCH_BOOK_BY_NAME,
          payload: [...data.filter((book) => book.book_status)],
        })
      );
  };

};
export const change_name = (name) => {
    return { type: CHANGE_NAME, payload: name };
};

export const sortByTitle = (order) => ({
    type: SORT_BY_TITLE,
    payload: order,
});

export const sortByPrice = (order) => ({
    type: SORT_BY_PRICE,
    payload: order,
});


export function getBooksFilterGenre(genres) {
  return {
    type: FILTER_BOOKS_BY_GENRE,
    payload: genres,
  };

}
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(

        "https://open-book-back.onrender.com/users"

      );

      const data = response.data;

      dispatch({
        type: GET_USERS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export const getBooks = () => {

    return async (dispatch) => {
        try {
            const response = await axios.get("https://open-book-back.onrender.com/books");

            // const lastFilt = localStorage.getItem("booksFilters");
            // const data = lastFilt ? JSON.parse(lastFilt) : response.data;
            console.log(response);
            dispatch({
                type: GET_BOOKS,
                payload: response.data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const getGenresAndAuthors = () => {

  return async (dispatch) => {
    try {
      const authors = await axios.get(
        "https://open-book-back.onrender.com/authors"
      );
      const genres = await axios.get(
        "https://open-book-back.onrender.com/genres"
      );
      dispatch({
        type: GET_GENRES_AND_AUTHORS,
        payload: { authors: authors.data, genres: genres.data },
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getBooksFilter = (objFilters) => {
  return async (dispatch) => {
    const { genres, author, min, max } = objFilters;
    console.log({
      authorArray: author === "" ? [] : author,
      genreArray: genres === "" ? [] : genres,
      minPrice: min,
      maxPrice: max,
    });
    try {
      const response = await axios.post(
        "https://open-book-back.onrender.com/books/filtrar",

        {
          authorArray: author === "" ? [] : author,
          genreArray: genres === "" ? [] : genres,
          minPrice: min,
          maxPrice: max,
        }
      );

      localStorage.setItem("booksFilters", JSON.stringify(response.data));

      dispatch({
        type: GET_BOOKS_FILTERS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

};

export const appliedFilter = (objFilters) => {
    return {
        type: APPLIED_FILTERS,
        payload: objFilters,
    };
};

export const resetSearchedBooks = () => ({
    type: RESET_SEARCHED_BOOKS,
    payload: "",
});

export const getBooksByGenre = (genre) => {

  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://open-book-back.onrender.com/books/filtrar",

        {
          authorArray: [],
          genreArray: [genre],
          min: null,
          max: null,
        }
      );
      dispatch({
        type: GET_BOOKS_BY_GENRE,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

};
