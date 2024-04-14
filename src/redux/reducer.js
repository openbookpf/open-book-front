const initialState = {
    books: [],
    booksFilter: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_BOOKS":
            return {
                ...state,
                books: action.payload,
                booksFilter: action.payload,
            };

        case "GET_BOOKS_FILTER_AUTHOR":
            if (action.payload === "All") {
                return { ...state, booksFilter: [...state.books] };
            }
            return { ...state, booksFilter: action.payload };

        case "GET_BOOKS_FILTER_GENERO":
            if (action.payload === "All") {
                return { ...state, booksFilter: [...state.books] };
            }
            return { ...state, booksFilter: action.payload };

        case "GET_BOOKS_FILTER_PRICE":
            return {
                ...state,
                booksFilter: state.books.filter(
                    (book) =>
                        (action.payload.min === "" || book.price >= action.payload.min) &&
                        (action.payload.max === "" || book.price <= action.payload.max)
                ),
            };

        default:
            return { ...state };
    }
};

export default reducer;
