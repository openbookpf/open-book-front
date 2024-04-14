import axios from "axios";

export const getAllBooks = () => {
    return async (dispatch) => {
        try {
            const result = await axios.get("https://open-book-back.onrender.com/book");
            return dispatch({
                type: "GET_BOOKS",
                payload: result.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getBooksFilterPrice = (objPrice) => {
    return {
        type: "GET_BOOKS_FILTER_PRICE",
        payload: objPrice,
    };
};

export const getBooksFilterAuthor = (author) => {
    if (author === "All") {
        return {
            type: "GET_BOOKS_FILTER_AUTHOR",
            payload: author,
        };
    }
    return async (dispatch) => {
        try {
            const result = await axios.get(`https://open-book-back.onrender.com/book/filtrar-autor?author=${author}`);
            return dispatch({
                type: "GET_BOOKS_FILTER_AUTHOR",
                payload: result.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getBooksFilterGenre = (genre) => {
    if (genre === "All") {
        return {
            type: "GET_BOOKS_FILTER_GENERO",
            payload: genre,
        };
    }
    return async (dispatch) => {
        try {
            const result = await axios.get(`https://open-book-back.onrender.com/book/filtrar-genre?genre=${genre}`);
            return dispatch({
                type: "GET_BOOKS_FILTER_GENERO",
                payload: result.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};
