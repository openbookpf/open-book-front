import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../../redux/actions";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import EditBooksModal from "./EditBooksModal";

const BookTable = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.allBooks);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  // Estado para almacenar el ISBN del libro que se va a eliminar
  const [isbnToDelete, setIsbnToDelete] = useState(null);
  // Estado para almacenar el libro que se va a editar
  const [bookToEdit, setBookToEdit] = useState(null);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const handleEditBook = (book) => {
    // Almacenar el libro que se va a editar
    setBookToEdit(book);
    // Abrir el modal de edición
    setOpenEdit(true);
  };
  const handleSubmitEdit = (editedBook) => {
    axios
      .put(
        `https://open-book-back.onrender.com/books/book-id/${editedBook.ISBN}`,
        editedBook
      )
      .then((response) => {
        console.log(response.data);
        // Cerrar el modal después de editar el libro
        setOpenEdit(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteBook = () => {
    axios
      .put(
        `https://open-book-back.onrender.com/books/book-id/${isbnToDelete}`,
        {
          book_status: false,
        }
      )
      .then((response) => {
        console.log(response.data);
        // Cerrar el modal después de eliminar el libro
        setOpenDelete(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="mt-5 mb-24 p-5 flex flex-col justify-center px-10 items-center w-full">
      <table className="table-auto p-5 border-collapse ">
        <thead className="">
          <tr className="bg-blue-0 text-white-0 grid grid-cols-6 gap-2 mb-1 text-lg rounded-md">
            <th className="font-medium p-2">ISBN</th>
            <th className="font-medium p-2">Cover</th>
            <th className="font-medium p-2">Title</th>
            <th className="font-medium p-2">Author</th>
            <th className="font-medium p-2">Actions</th>
            <th className="font-medium p-2">Status</th>
          </tr>
        </thead>
        <tbody className="text-center text-sm">
          {books.map((book) => (
            <tr
              className="bg-white-1 hover:bg-white-2 text-blue-1 transition-colors delay-50 grid grid-cols-6 mb-2 text-sm rounded-md"
              key={book.ISBN}
            >
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
                  onClick={() => handleEditBook(book)}
                  // onClick={() => editBook(book.ISBN)}
                >
                  <LuPencil className="text-white-0" />
                </button>
                <button
                  className="bg-red-600 p-2 my-auto rounded-md"
                  onClick={() => {
                    setOpenDelete(true);
                    setIsbnToDelete(book.ISBN);
                  }}
                >
                  <LuTrash2 className="text-white-0" />
                </button>
              </td>
              <td className="my-auto p-2">
                {book.book_status ? (
                  <p className="text-green-600">Available</p>
                ) : (
                  <p className="text-red-600">Unavailable</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mb-24 items-center p-5 ">
        <EditBooksModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          className="mt-16 py-5"
          defaultValues={bookToEdit}
          onSubmit={handleSubmitEdit}
        >
          <div className="text-center mx-auto py-5">
            <LuPencil
              size={56}
              className="text-white-0 bg-cyan-0 p-2 mx-auto rounded-md "
            />
            <h3 className="text-lg mt-2 font-black text-blue-1">Edit book</h3>
          </div>
        </EditBooksModal>
      </div>
      <div className="flex justify-center items-center">
        <DeleteModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          className="mt-24 py-5"
        >
          <div className="text-center mx-auto py-5">
            <LuTrash2
              size={56}
              className="text-white-0 bg-red-600 p-2 mx-auto rounded-md "
            />
            <h3 className="text-lg mt-2 font-black text-blue-1">
              Confirm delete
            </h3>
            <p className="text-sm text-blue-0">
              Are you sure you want to delete this book?
            </p>
          </div>
          <div className="flex gap-2 p-2">
            <button
              onClick={handleDeleteBook}
              className="p-2 rounded-lg text-sm bg-red-600 hover:bg-red-700 hover:text-white-0 transition-colors text-white-2 w-full"
            >
              Delete
            </button>
            <button
              className="p-2 rounded-lg text-sm bg-white-0 hover:bg-white-2 hover:text-blue-0 transition-colors w-full"
              onClick={() => setOpenDelete(false)}
            >
              Cancel
            </button>
          </div>
        </DeleteModal>
      </div>
    </div>
  );
};

export default BookTable;
