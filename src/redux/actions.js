import arrayLibros from "../data/arrayLibros";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const FILTER_BOOKS_BY_GENRE = "FILTER_BOOKS_BY_GENRE";
export const GET_BOOKS = "GET_BOOKS";
export const SORT_BY_TITLE = "SORT_BY_TITLE";
export const SORT_BY_PRICE = "SORT_BY_PRICE";
export const SEARCH_BOOK_BY_NAME = "SEARCH_BOOK_BY_NAME";
export const CHANGE_NAME = "CHANGE_NAME";
export const GET_GENRES_AND_AUTHORS = "GET_GENRES_AND_AUTHORS";
export const GET_BOOKS_FILTERS = "GET_BOOKS_FILTERS";
export const APPLIED_FILTERS = "APPLIED_FILTERS";

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

export const sortByTitle = (order) => ({
    type: SORT_BY_TITLE,
    payload: order,
});

export const sortByPrice = (order) => ({
    type: SORT_BY_PRICE,
    payload: order,
});

//!
export function getBooksFilterGenre(genre) {
    return {
        type: FILTER_BOOKS_BY_GENRE,
        payload: genre,
    };
}
export const getBooks = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("https://open-book-back.onrender.com/book");
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
            const response = await axios.get("https://open-book-back.onrender.com/book/filters");
            dispatch({
                type: GET_GENRES_AND_AUTHORS,
                payload: response.data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const getBooksFilter = (objFilters) => {
    return async (dispatch) => {
        const { genre, author, min, max } = objFilters;
        try {
            const response = await axios.get(
                `https://open-book-back.onrender.com/book/filtrar?author=${author}&genre=${genre}&min=${min}&max=${max}`
            );
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
