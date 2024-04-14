// import axios from "axios";

import arrayLibros from "../data/arrayLibros";

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

export const sortByTitle = (order) => ({
  type: SORT_BY_TITLE,
  payload: order,
});

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
  return {
    type: GET_BOOKS,
    payload: arrayLibros, // Asegúrate de importar arrayLibros
  };
};
