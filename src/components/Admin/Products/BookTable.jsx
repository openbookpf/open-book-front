import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../../redux/actions";
import { LuPencil, LuTrash2 } from "react-icons/lu";

const BookTable = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const [selectedBooks, setSelectedBooks] = useState([]);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const toggleSelectBook = (bookId) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(bookId)
        ? prevSelectedBooks.filter((id) => id !== bookId)
        : [...prevSelectedBooks, bookId]
    );
  };

  const editBooks = () => {
    // Implementar lógica de edición aquí
  };

  const deleteBooks = () => {
    // Implementar lógica de eliminación aquí
  };

  return (
    <div className="mt-5 mb-24 p-5 flex flex-col justify-center px-10 items-center w-full">
      <div className="flex gap-2">
        {/* <button className="text-sm" onClick={deleteBooks}>
          Delete selected
        </button> */}
      </div>
      <table className="table-auto p-5 border-collapse ">
        <thead className="">
          <tr className="bg-blue-0 text-white-0 grid grid-cols-5 gap-2 mb-1 text-lg rounded-md">
            {/* <th>
              <input
                type="checkbox"
                className=" p-2"
                onChange={(e) =>
                  setSelectedBooks(
                    e.target.checked ? books.map((book) => book.id) : []
                  )
                }
              />
            </th> */}
            <th className="font-medium p-2">ISBN</th>
            <th className="font-medium p-2">Cover</th>
            <th className="font-medium p-2">Title</th>
            <th className="font-medium p-2">Author</th>
            <th className="font-medium p-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center text-sm">
          {books.map((book) => (
            <tr
              className="bg-white-1 hover:bg-white-2 text-blue-1 transition-colors delay-50 grid grid-cols-5 mb-2 text-sm rounded-md"
              key={book.ISBN}
            >
              {/* <td className=" p-2 flex flex-shrink-0">
                <input
                  type="checkbox"
                  checked={selectedBooks.includes(book.ISBN)}
                  onChange={() => toggleSelectBook(book.ISBN)}
                />
              </td> */}
              <td className="font-light my-auto p-2">{book.ISBN}</td>
              <td className=" my-auto mx-auto p-2">
                <img
                  src={book.book_cover_url}
                  alt={book.book_title}
                  className="w-10"
                />
              </td>
              <td className=" my-auto p-2 truncate">{book.book_title}</td>
              <td className="p-2  my-auto">{book.author}</td>
              <td className="flex flex-row  gap-2 justify-center  p-1">
                <button
                  className="bg-cyan-0 p-2 my-auto rounded-md"
                  onClick={() => editBook(book.ISBN)}
                >
                  <LuPencil className="text-white-0" />
                </button>
                <button
                  className="bg-red-600 p-2 my-auto rounded-md"
                  onClick={() => deleteBook(book.ISBN)}
                >
                  <LuTrash2 className="text-white-0" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
