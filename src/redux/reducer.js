// reducer.js
import { FILTER_BOOKS_BY_GENRE, GET_BOOKS } from "./actions";

const initialState = {
  books: [], // Suponiendo que tienes una lista inicial de libros
  filteredBooks: [],
};

function booksReducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_BOOKS_BY_GENRE:
      // return {
      //   ...state,
      //   filteredBooks: state.books.filter(
      //     (book) => book.genre === action.payload
      //   ),
      // };
      const filtered = [...state.books].filter((book) => {
        // Verificamos si book.genre es un array y contiene action.payload
        return book.genre.includes(action.payload);
      });
      return {
        ...state,
        filteredBooks: filtered,
      };

    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        filteredBooks: action.payload,
      };

    default:
      return state;
  }
}

export default booksReducer;
