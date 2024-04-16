// reducer.js
import {
  FILTER_BOOKS_BY_GENRE,
  GET_BOOKS,
  SORT_BY_PRICE,
  SORT_BY_TITLE,
  SEARCH_BOOK_BY_NAME,
  CHANGE_NAME,
  RESET_SEARCHED_BOOKS,
} from "./actions";

const initialState = {
  books: [], // Suponiendo que tienes una lista inicial de libros
  filteredBooks: [],
  searchbook: [],
  searchname: "",
};

function booksReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return { ...state, searchname: action.payload };
    case SEARCH_BOOK_BY_NAME:
      return { ...state, searchbook: action.payload };
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

    case SORT_BY_TITLE:
      const sortedBooksByTitle = [...state.filteredBooks].sort((a, b) => {
        if (action.payload === "asc") {
          if (a.book_title && b.book_title) {
            return a.book_title.localeCompare(b.book_title);
          }
        } else if (action.payload === "desc") {
          if (a.book_title && b.book_title) {
            return b.book_title.localeCompare(a.book_title);
          }
        }
        return 0;
      });
      return { ...state, filteredBooks: sortedBooksByTitle };

    case SORT_BY_PRICE:
      const sortedBooksByPrice = [...state.filteredBooks].sort((a, b) => {
        if (action.payload === "min") {
          return a.price - b.price;
        } else if (action.payload === "max") {
          return b.price - a.price;
        }
        return 0;
      });
      return { ...state, filteredBooks: sortedBooksByPrice };

    case RESET_SEARCHED_BOOKS:
      return { ...state, searchbook: action.payload };

    default:
      return state;
  }
}

export default booksReducer;
