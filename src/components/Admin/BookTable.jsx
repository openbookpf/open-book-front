import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/actions";
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
        <button className="text-sm" onClick={deleteBooks}>
          Delete selected
        </button>
      </div>
      <table className="table-auto p-5 border-collapse border border-slate-500">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className=" p-2  border border-slate-500"
                onChange={(e) =>
                  setSelectedBooks(
                    e.target.checked ? books.map((book) => book.id) : []
                  )
                }
              />
            </th>
            <th className=" p-2 text-sm border border-slate-500">ISBN</th>
            <th className=" p-2 text-sm border border-slate-500">Title</th>
            <th className=" p-2 text-sm border border-slate-500">Author</th>
            <th className="text-sm p-2  border border-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center text-sm">
          {books.map((book) => (
            <tr key={book.ISBN}>
              <td className=" p-2 border border-slate-500">
                <input
                  type="checkbox"
                  checked={selectedBooks.includes(book.ISBN)}
                  onChange={() => toggleSelectBook(book.ISBN)}
                />
              </td>
              <td className=" p-2 border border-slate-500">{book.ISBN}</td>
              <td className=" p-2 border border-slate-500">
                {book.book_title}
              </td>
              <td className="p-2 border border-slate-500">{book.author}</td>
              <td className="flex flex-row gap-3 p-1 border border-slate-500">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
