import axios from "axios";

export const DELETE_BOOK = "DELETE_BOOK";

export const FILTER_BOOKS_BY_LANGUAGE = "FILTER_BOOKS_BY_LANGUAGE";
export const FILTER_BOOKS_BY_GENRE = "FILTER_BOOKS_BY_GENRE";
export const GET_BOOKS = "GET_BOOKS";
export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
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
export const GET_BOOK_COLECTION_USER = "GET_BOOK_COLECTION_USER";
export const SET_CHART_DATA = "SET_CHART_DATA";

export const fetchChartData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        /* "https://open-book-back.onrender.com/orders/payments-and-orders" */
        "https://open-book-back.onrender.com/charts?name=sales"
        /* "https://open-book-back.onrender.com/charts?name=last_sales"
        "https://open-book-back.onrender.com/charts?name=active_users" */
      );
      const data = response.data;

      dispatch({ type: "SET_CHART_DATA", payload: data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

/* export const updateChart = (chartData) => ({
  type: UPDATE_CHART,
  payload: chartData,
} ); */

export const filterBooksByLanguage = (language) => ({
  type: FILTER_BOOKS_BY_LANGUAGE,
  payload: language,
});

export const addToFavorites = (product) => {
  // type: "ADD_TO_FAVORITES",
  // payload: product,
  // product = { book_picture, description, user_id, book_name };
  return async function (dispatch) {
    fetch("http://localhost:3001/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: ADD_TO_FAVORITES, payload: data }));
  };
};

export const removeFromFavorites = (user_id, fav_id) => {
  return async function (dispatch) {
    fetch(
      `http>//localhost:3001/favorites/findtoremove/?user_id=${user_id}&?fav_id=${fav_id}`
    )
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: REMOVE_FROM_FAVORITES,
          payload: data,
        })
      );
  };
};

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

// export const deleteBook = async (ISBN) => {
//   try {
//     // Hacemos una solicitud PUT a la API para actualizar el estado del libro
//     const response = await axios.put(
//       `https://open-book-back.onrender.com/books/book-id/${ISBN}`,
//       {
//         book_status: false,
//       }
//     );

//     // Si la respuesta es exitosa, actualizamos el estado de Redux
//     if (response.status === 200) {
//       dispatch({
//         type: DELETE_BOOK,
//         payload: ISBN,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

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
      const response = await axios.get(
        "https://open-book-back.onrender.com/books"
      );

      // Filtramos los libros cuyo estado es true
      const filteredBooks = response.data.filter(
        (book) => book.book_status === true
      );

      const lastFilt = localStorage.getItem("booksFilters");
      const data = lastFilt ? JSON.parse(lastFilt) : filteredBooks;

      dispatch({
        type: GET_BOOKS,
        payload: filteredBooks,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllBooks = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://open-book-back.onrender.com/books"
      );

      // const lastFilt = localStorage.getItem("booksFilters");
      // const data = lastFilt ? JSON.parse(lastFilt) : response.data;

      dispatch({
        type: GET_ALL_BOOKS,
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
    try {
      const response = await axios.post(
        "https://open-book-back.onrender.com/books/filtrar",
        objFilters
      );

      const filteredBooks = response.data.filter(
        (book) => book.book_status === true
      );

      localStorage.setItem("booksFilters", JSON.stringify(filteredBooks));

      dispatch({
        type: GET_BOOKS_FILTERS,
        payload: filteredBooks,
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
      const response = await axios.get(
        `https://open-book-back.onrender.com/book/filtrar?author&genre=${genre}&min&max`
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

export const getBookColectionUser = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios(
        `https://open-book-back.onrender.com/users/book-collection?idAuth0=${idUser}`
      );
      dispatch({
        type: GET_BOOK_COLECTION_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
