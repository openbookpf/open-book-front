import arrayLibros from "../data/arrayLibros";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const FILTER_BOOKS_BY_GENRE = "FILTER_BOOKS_BY_GENRE";
export const GET_BOOKS = "GET_BOOKS";
export const SORT_BY_TITLE = "SORT_BY_TITLE";
export const SORT_BY_PRICE = "SORT_BY_PRICE";
export const SEARCH_BOOK_BY_NAME = "SEARCH_BOOK_BY_NAME";
export const CHANGE_NAME = "CHANGE_NAME";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_FROM_STORAGE = "UPDATE_CART_FROM_STORAGE";

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
export const sortByTitle = (order) => ({
  type: SORT_BY_TITLE,
  payload: order,
});

export const search_book_by_name = (name) => {
  return async function (dispatch) {
    await fetch(`https://open-book-back.onrender.com/book?name=${name}`)
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: SEARCH_BOOK_BY_NAME,
          payload: data,
        })
      );
  };
};
export const change_name = (name) => {
  return { type: CHANGE_NAME, payload: name };
};

export const sortByPrice = (order) => ({
  type: SORT_BY_PRICE,
  payload: order,
});
export function getBooksFilterGenre(genre) {
  return {
    type: FILTER_BOOKS_BY_GENRE,
    payload: genre,
  };
}
export const getBooks = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://open-book-back.onrender.com/book"
      );
      dispatch({
        type: GET_BOOKS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
