import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByGenre } from "../../redux/actions";
import { useParams } from "react-router";
import Card from "../../components/Card/Card";

const ShowFilterByGenre = () => {
    const dispatch = useDispatch();
    const { genre } = useParams();
    useEffect(() => {
        dispatch(getBooksByGenre(genre));
    }, []);

    const [selected, setSelected] = useState("");

    const filterGenreBooks = useSelector((state) => state.filterGenreBooks);
    const authors = [];
    filterGenreBooks.map((book) => {
        if (!authors.includes(book.author)) authors.push(book.author);
    });

    let books = selected ? filterGenreBooks.filter((book) => book.author === selected) : filterGenreBooks;

    const handleFilt = (event) => {
        const author = event.target.innerHTML;

        if (selected === author) {
            setSelected("");
        } else {
            setSelected(author);
        }
    };
    // text-lg hover:text-orange-0
    return (
        <div className="mt-20 flex flex-row w-sreen">
            <div className="ml-10 w-60 mt-10">
                <p className="text-xl">Authors</p>
                <div className="ml-10">
                    {authors.map((auth) => (
                        <button
                            className={
                                selected === auth
                                    ? "text-lg text-cyan-0 hover:text-orange-0"
                                    : "text-lg hover:text-orange-0"
                            }
                            onClick={handleFilt}
                            key={auth}
                        >
                            {auth}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center mx-auto content-center w-5/6">
                <h1 className="bg-cyan-0 px-4 mt-3 rounded-xl">{genre} books</h1>
                <div className="flex flex-wrap justify-center mx-auto p-2 mt-5">
                    {books.map((book) => {
                        return (
                            <div key={book.ISBN}>
                                <Card book={book} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ShowFilterByGenre;
