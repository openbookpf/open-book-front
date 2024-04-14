import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import arrayGenres from "../../data/arrayGenres";
import {
  getBooks,
  getBooksFilterGenre,
  sortByTitle,
  sortByPrice,
} from "../../redux/actions";

const BookList = () => {
  const books = useSelector((state) => state.filteredBooks);
  let numLibros = books.length;
  const dispatch = useDispatch();

  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    if (selectedGenre === "all") {
      dispatch(getBooks());
    } else {
      dispatch(getBooksFilterGenre(selectedGenre));
    }
  }, [dispatch, selectedGenre]);

  useEffect(() => {
    if (selectedTitle !== "") {
      dispatch(sortByTitle(selectedTitle));
    }
  }, [dispatch, selectedTitle]);

  useEffect(() => {
    if (selectedPrice !== "") {
      dispatch(sortByPrice(selectedPrice));
    }
  }, [dispatch, selectedPrice]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };
  const handleSortChange = (event) => {
    const [sortType, sortDirection] = event.target.value.split("-");

    if (sortType === "title") {
      setSelectedTitle(sortDirection);
    } else if (sortType === "price") {
      setSelectedPrice(sortDirection);
    } else {
      setSelectedTitle("");
      setSelectedPrice("");
    }
  };
  return (
    <div className="mt-20 flex flex-col ">
      <div className="flex flex-col mx-80 px-20 text-black">
        <div className="flex flex-row justify-between">
          {/* <h1 className="text-xl font-bold">Filter by:</h1> */}
          <div className="text-lg flex mt-3">
            <p className="pr-2">Genre:</p>
            <select onChange={handleGenreChange}>
              <option value="all">All genres</option>

              {arrayGenres.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className="text-lg flex mt-3">
            <p className="pr-2">Sort by:</p>
            <select onChange={handleSortChange}>
              <option value="">None</option>
              <option value="title-asc">Title (A - Z)</option>
              <option value="title-desc">Title (Z - A)</option>
              <option value="price-min">Price (Low - High)</option>
              <option value="price-max">Price (High - Low)</option>
            </select>
          </div>
        </div>
        <p className="font-light text-lg text-gray-500">{numLibros} results</p>
        {/* <h1 className="font-bold text-black">All of our books</h1> */}
      </div>

      <div className="flex flex-row justify-center mx-auto content-center">
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
