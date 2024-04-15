import arrayLibros from "../data/arrayLibros";
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
