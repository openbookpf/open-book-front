import React, { useEffect, useState } from "react";
import arrayLibros from "../../data/arrayLibros";
import Card from "../../components/Card/Card";
import Filter from "../../components/Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import arrayGenres from "../../data/arrayGenres";
import { getBooks, getBooksFilterGenre } from "../../redux/actions";
const BookList = () => {
  const books = useSelector((state) => state.filteredBooks);
  let numLibros = books.length;
  const dispatch = useDispatch();

  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    if (selectedGenre === "all") {
      dispatch(getBooks());
    } else {
      dispatch(getBooksFilterGenre(selectedGenre));
    }
  }, [dispatch, selectedGenre]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div className="mx-auto mt-20">
      <div className=" text-black">
        <h1 className="text-xl">Filter by:</h1>
        <div className="text-lg flex mt-3">
          <p>Genre:</p>
          <select onChange={handleGenreChange}>
            <option value="all">Selecciona un tipo</option>

            {arrayGenres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h1 className="font-bold text-black">All of our books</h1>
      <p className="font-light text-lg text-gray-500">{numLibros} results</p>

      <div className="flex flex-row justify-center content-center">
        <div className="grid grid-cols-4 my-11 gap-6 mx-auto p-2 ">
          {books.map((book) => {
            return <Card book={book} key={book.ISBN} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BookList;
