import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../../redux/actions";
import { LuPencil, LuTrash2 } from "react-icons/lu";

const ProductCard = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const [selectedBooks, setSelectedBooks] = useState([]);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full justify-center">
      {books.map((book) => (
        <div
          className="flex w-full text-sm flex-row justify-center gap-10"
          key={book.ISBN}
        >
          <p className="start-0 p-2">{book.ISBN}</p>
          <div className="flex flex-row w-1/2 justify-between">
            <h2 className="start-0 p-2">{book.book_title}</h2>
            <h3 className="end-0 p-2 text-right">{book.author}</h3>
          </div>
          <div className="flex flex-row gap-3 p-1">
            <button
              className="bg-blue-0 p-2 rounded-md"
              onClick={() => editBook(book.ISBN)}
            >
              <LuPencil className="text-white-0" />
            </button>
            <button
              className="bg-red-600 p-2 rounded-md"
              onClick={() => deleteBook(book.ISBN)}
            >
              <LuTrash2 className="text-white-0" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
