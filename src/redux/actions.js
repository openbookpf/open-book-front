import arrayLibros from "../data/arrayLibros";
import { useNavigate } from "react-router-dom";
// export const getAllBooks = () => {
//     return async (dispatch) => {
//         try {
//             const result = await axios.get("https://open-book-back.onrender.com/book");
//             return dispatch({
//                 type: "GET_BOOKS",
//                 payload: result.data,
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };

// export const getBooksFilterPrice = (objPrice) => {
//     return {
//         type: "GET_BOOKS_FILTER_PRICE",
//         payload: objPrice,
//     };
// };

// export const getBooksFilterAuthor = (author) => {
//     if (author === "All") {
//         return {
//             type: "GET_BOOKS_FILTER_AUTHOR",
//             payload: author,
//         };
//     }
//     return async (dispatch) => {
//         try {
//             const result = await axios.get(`https://open-book-back.onrender.com/book/filtrar-autor?author=${author}`);
//             return dispatch({
//                 type: "GET_BOOKS_FILTER_AUTHOR",
//                 payload: result.data,
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };

// export const getBooksFilterGenre = (genre) => {
//     if (genre === "All") {
//         return {
//             type: "GET_BOOKS_FILTER_GENERO",
//             payload: genre,
//         };
//     }
//     return async (dispatch) => {
//         try {
//             const result = await axios.get(`https://open-book-back.onrender.com/book/filtrar-genre?genre=${genre}`);
//             return dispatch({
//                 type: "GET_BOOKS_FILTER_GENERO",
//                 payload: result.data,
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };

export const FILTER_BOOKS_BY_GENRE = "FILTER_BOOKS_BY_GENRE";
export const GET_BOOKS = "GET_BOOKS";
export const SORT_BY_TITLE = "SORT_BY_TITLE";
export const SORT_BY_PRICE = "SORT_BY_PRICE";
export const SEARCH_BOOK_BY_NAME = "SEARCH_BOOK_BY_NAME";
export const CHANGE_NAME = "CHANGE_NAME";
export const RESET_SEARCHED_BOOKS = "RESET_SEARCHED_BOOKS";

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
          payload: [...data.filter((book) => book.book_status)],
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
  return async function (dispatch) {
    await fetch(`https://open-book-back.onrender.com/book`)
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: GET_BOOKS,
          payload: [...data.filter((book) => book.book_status)],
        })
      );
  };
};

export const resetSearchedBooks = () => ({
  type: RESET_SEARCHED_BOOKS,
  payload: "",
});
