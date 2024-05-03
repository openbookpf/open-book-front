import { act } from "react";
import {
    GET_USERS,
    FILTER_BOOKS_BY_GENRE,
    GET_BOOKS,
    SORT_BY_TITLE,
    SORT_BY_PRICE,
    SEARCH_BOOK_BY_NAME,
    CHANGE_NAME,
    GET_GENRES_AND_AUTHORS,
    GET_BOOKS_FILTERS,
    APPLIED_FILTERS,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_FROM_STORAGE,
    RESET_SEARCHED_BOOKS,
    REMOVE_ALL,
    GET_BOOKS_BY_GENRE,
    ADD_TO_FAVORITES,
    REMOVE_FROM_FAVORITES,
    LOAD_FAVORITES_FROM_STORAGE,
    GET_BOOK_COLECTION_USER,
} from "./actions";

const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
};

const calculateTotalItems = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
};

const initialState = {
    users: [],
    books: [],
    filteredBooks: [],
    filterGenreBooks: [],
    searchbook: [],
    searchname: "",
    genres: [],
    authors: [],
    appliedFilters: {
        genres: [],
        authors: [],
        appliedFilters: {
            genres: [],
            author: [],
            min: "",
            max: "",
        },
    },
    items: [],
    favorites: [],
    totalItems: 0,
    cartTotalPrice: 0,
    bookColectionUser: [],
};

function booksReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case CHANGE_NAME:
            return { ...state, searchname: action.payload };

        case SEARCH_BOOK_BY_NAME:
            return { ...state, searchbook: action.payload };

        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
                filteredBooks: action.payload,
                filteresBooksCopy: action.payload,
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

        case GET_GENRES_AND_AUTHORS:
            return {
                ...state,
                genres: action.payload.genres,
                authors: action.payload.authors,
            };

        case GET_BOOKS_FILTERS:
            return { ...state, filteredBooks: action.payload, filteresBooksCopy: action.payload };

        case APPLIED_FILTERS:
            return { ...state, appliedFilters: action.payload };

        case ADD_TO_CART:
            const existingItem = state.items.find((item) => item.ISBN === action.payload.ISBN);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.ISBN === action.payload.ISBN ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                    totalItems: state.totalItems + 1,
                    cartTotalPrice: state.cartTotalPrice + action.payload.price,
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                    totalItems: state.totalItems + 1,
                    cartTotalPrice: state.cartTotalPrice + action.payload.price,
                };
            }
        case REMOVE_FROM_CART:
            const itemToRemove = state.items.find((item) => item.ISBN === action.payload);
            if (itemToRemove) {
                if (itemToRemove.quantity > 1) {
                    return {
                        ...state,
                        items: state.items.map((item) =>
                            item.ISBN === action.payload ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                        totalItems: state.totalItems - 1,
                        cartTotalPrice: state.cartTotalPrice - itemToRemove.price,
                    };
                } else {
                    return {
                        ...state,
                        items: state.items.filter((item) => item.ISBN !== action.payload),
                        totalItems: state.totalItems - 1,
                        cartTotalPrice: state.cartTotalPrice - itemToRemove.price,
                    };
                }
            }
            return state;

        case UPDATE_CART_FROM_STORAGE:
            return {
                ...state,
                items: action.payload,
                totalItems: calculateTotalItems(action.payload),
                cartTotalPrice: calculateTotalPrice(action.payload),
            };

        case REMOVE_ALL:
            return {
                ...state,
                items: action.payload,
                totalItems: calculateTotalItems(action.payload),
                cartTotalPrice: calculateTotalPrice(action.payload),
            };
        case RESET_SEARCHED_BOOKS:
            return { ...state, searchbook: action.payload };

        case GET_BOOKS_BY_GENRE:
            return { ...state, filterGenreBooks: action.payload };

        case ADD_TO_FAVORITES:
            const existingFavorite = state.favorites.find((item) => item.ISBN === action.payload.ISBN);
            if (!existingFavorite) {
                const updatedFavorites = [...state.favorites, action.payload];
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                return {
                    ...state,
                    favorites: updatedFavorites,
                };
            }
            return state;

        case REMOVE_FROM_FAVORITES:
            const updatedFavorites = state.favorites.filter((item) => item.ISBN !== action.payload);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return {
                ...state,
                favorites: updatedFavorites,
            };

        case LOAD_FAVORITES_FROM_STORAGE:
            return {
                ...state,
                favorites: action.payload,
            };

        case GET_BOOK_COLECTION_USER:
            return {
                ...state,
                bookColectionUser: action.payload,
            };

        default:
            return state;
    }
}

export default booksReducer;
