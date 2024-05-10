import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Filter from "../../components/Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import arrayGenres from "../../data/arrayGenres";
import { Paginator } from "primereact/paginator";
import { IoMdClose } from "react-icons/io";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";

import {
  getBooks,
  getBooksFilterGenre,
  sortByTitle,
  sortByPrice,
  appliedFilter,
  getBooksFilter,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/actions";

const BookList = () => {
  const books = useSelector((state) => state.filteredBooks);
  const favorites = useSelector((state) => state.favorites);

  const dispatch = useDispatch();

  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(9);

  const [showFilters, setShowFilters] = useState(false);

  const handleShowFilters = () => {
    if (showFilters) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    dispatch(getBooks());
  }, []);

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
    if (sortType === "none") {
      dispatch;
    }
  };

  return (
    <div className="mt-20 flex flex-col w-sreen px-10">
      <div className="flex flex-row">
        <div className="mv:hidden lg:flex basis-1/4 bg-[#fef3ed] shadow-lg rounded-xl h-min pb-10">
          <Filter />
        </div>

        <div className="flex flex-col basis-11/12 w-full mv:ml-0 sm:ml-10">
          <div className="flex flex-col h-10 items-center justify-items-end">
            <div className="flex flex-row justify-between mv:w-screen mv:px-4 sm:w-full">
              <div className="lg:hidden">
                <FiMenu
                  onClick={handleShowFilters}
                  className="bg-orange-0 bg-opacity-15 shadow-full rounded-full h-min text-4xl duration-200 hover:bg-orange-0 hover:bg-opacity-30 cursor-pointer p-2"
                />
                {showFilters ? (
                  <div className="absolute bg-[#fef3ed] shadow-2xl rounded-xl h-min w-80">
                    <Filter menu={true} setShowFilters={setShowFilters} />
                  </div>
                ) : null}
              </div>
              <div className="flex items-center justify-end bg-orange-0 bg-opacity-30 px-2 py-1 rounded-xl ml-auto">
                <div className="text-lg flex justify-end ">
                  <p className="pr-2">Sort by:</p>
                  <select onChange={handleSortChange} className="rounded-xl">
                    <option value="">None</option>
                    <option value="title-asc">Title (A - Z)</option>
                    <option value="title-desc">Title (Z - A)</option>
                    <option value="price-min">Price (Low - High)</option>
                    <option value="price-max">Price (High - Low)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {books.length ? (
            <div className="flex flex-col content-start grow">
              <div className="flex flex-wrap mv:justify-center lg:justify-start sm:content-start my-11 ">
                {books.slice(first, first + rows).map((book) => (
                  <Card
                    book={book}
                    key={book.ISBN}
                    favorites={favorites}
                    showFavoriteButton={true}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <p className="text-2xl">No books found</p>
              <HiOutlineEmojiSad className="ml-3" />
            </div>
          )}
        </div>
      </div>

      <footer className="flex items-center text-center justify-center my-4 py-2 ">
        {books.length > 9 ? (
          <div className="text-lg text-black font-semibold border-2 rounded-full h-12 flex items-center justify-center">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={books.length}
              onPageChange={onPageChange}
              rowsPerPageOptions={[10, 20, 30]}
              template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            />
          </div>
        ) : null}
      </footer>
    </div>
  );
};

export default BookList;
