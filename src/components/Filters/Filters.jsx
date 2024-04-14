import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getAllBooks, getBooksFilterPrice, getBooksFilterAuthor, getBooksFilterGenre } from "../../redux/action";

const Filter = () => {
    const [objPrice, setObjPrice] = useState({
        min: "",
        max: "",
    });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllBooks());
    }, []);

    const books = useSelector((state) => state.books);
    const booksFilter = useSelector((state) => state.booksFilter);
    const genres = [];
    const author = [];

    //! filtro por genero ----------------------------------------------------
    const handlerChangeGenre = (event) => {
        dispatch(getBooksFilterGenre(event.target.value));
    };

    const handlerChangeAuthor = (event) => {
        dispatch(getBooksFilterAuthor(event.target.value));
    };

    //! filtro por precio ----------------------------------------------------
    const handlerChangePrice = (event) => {
        const property = event.target.name;
        const value = Number(event.target.value);

        if (typeof value === "number") {
            if (value === 0) {
                return setObjPrice({ ...objPrice, [property]: "" });
            }
            setObjPrice({ ...objPrice, [property]: value });
        }
        if (typeof value === NaN) {
            console.log("El valor debe ser un numero");
        }
    };

    const handleSendFilterPrice = () => {
        dispatch(getBooksFilterPrice(objPrice));
        console.log(objPrice);
    };
    //!------------------------------------------------------------------------

    const getGenresAndAuthors = (books) => {
        books.map((book) => {
            if (!genres.includes(book.genre)) {
                genres.push(book.genre);
            }
            if (!author.includes(book.author)) {
                author.push(book.author);
            }
        });
    };
    getGenresAndAuthors(books);

    //? los filtros no se combinan

    return (
        <div className="font-poppins text-black">
            <h1 className="text-xl">Filter by:</h1>
            <div className="text-lg flex mt-3">
                <p>Genre:</p>
                <select onChange={handlerChangeGenre} className="bg-gray-300 ml-3 rounded-lg w-36">
                    <option>All</option>
                    {genres.map((genres) => (
                        <option>{genres}</option>
                    ))}
                </select>
            </div>
            <div className="text-lg flex mt-3">
                <p>Author:</p>
                <select onChange={handlerChangeAuthor} className="bg-gray-300 ml-3 rounded-lg w-36">
                    <option>All</option>
                    {author.map((author) => (
                        <option>{author}</option>
                    ))}
                </select>
            </div>
            <div className="text-lg mt-3">
                <label htmlFor="min">Min:</label>
                <input
                    type="text"
                    name="min"
                    onChange={handlerChangePrice}
                    className="w-14 bg-gray-300 rounded-lg mx-3"
                />
                <label htmlFor="max">Max:</label>
                <input
                    type="text"
                    name="max"
                    onChange={handlerChangePrice}
                    className="w-14 bg-gray-300 rounded-lg mx-3"
                />
                <button onClick={handleSendFilterPrice} className="bg-orange-0 w-8 rounded-lg">
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default Filter;
