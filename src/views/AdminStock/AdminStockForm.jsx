import React from "react";
import axios from "axios";
import NotBookFound from "./NotBookFound";
import LoadingStockComponent from "../LoadingStock/LoadingStockComponent";
import { Link } from "react-router-dom";
import { IoIosSave } from "react-icons/io";
import { BsFillPencilFill } from "react-icons/bs";

const AdminStockForm = () => {
  const [allBooks, setAllBooks] = React.useState(null);
  const [isbnForSeach, setIsbnForSearch] = React.useState("");
  const [filteredBooks, setFilteredBooks] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://open-book-l9pv.onrender.com/book")
      .then(({ data }) => {
        setAllBooks(data);
        setFilteredBooks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const hadleIsbnSearch = (event) => {
    console.log(event.target.value);
    setIsbnForSearch(() => {
      setFilteredBooks(
        allBooks.filter((book) => {
          return book.ISBN.includes(event.target.value);
        })
      );

      return event.target.value;
    });
  };

  const handleEditStockAmount = (event) => {
    event.preventDefault();
    console.log(event.target);
  };

  return filteredBooks && allBooks?.length ? (
    <div className="container w-2/3 p mx-auto mt-20 rounded-xl">
      <div>
        <div className="flex justify-center bg-cyan-0 rounded-xl mb-2">
          <h5 className="w-fit px-11 text-black">
            Stock Management Control Panel
          </h5>
        </div>
        <div className="flex flex-row justify-start mb-2">
          <label
            className="w-1/8 text-lg font-bold text-black px-2 flex align-center justify-center items-center"
            htmlFor="ISBN"
          >
            Search by ISBN number
          </label>
          <input
            className="w-1/4 border-2 border-blue-0 rounded-lg text-base px-2 text-blue-0 border-opacity-50 mr-4"
            htmlFor="ISBN"
            name="ISBN"
            type="text"
            value={isbnForSeach}
            onChange={hadleIsbnSearch}
            autoComplete="off"
          />
          <span className="w-1/8 text-lg text-black px-2 font-bold flex align-center justify-center items-center">
            Create Entry
          </span>
          <button
            className="flex align-center justify-center items-center"
            title="Crear Nuevo Registro"
          >
            <Link to={"/create_book"}>
              <IoIosSave className="text-orange-0" />
            </Link>
          </button>
        </div>

        <table className="table-fixed rounded-xl bg-[#fef3ed]">
          <thead className="bg-cyan-0">
            <tr className="px-2 text-lg">
              <th className="w-1/12">Item</th>
              <th className="w-1/6">ISBN Number</th>
              <th className="w-2/4">Book Title</th>
              <th className="w-1/12">Stock Number</th>
              <th className="w-1/6">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks?.length ? (
              filteredBooks.map((book, index) => {
                return (
                  <tr
                    id={book.ISBN}
                    className={`px-2 text-sm/[13px] text-blue-0 ${
                      (index + 1) % 2 === 0 ? "bg-orange-0 bg-opacity-5" : ""
                    }`}
                    key={index + 1}
                  >
                    <td className="flex align-center justify-center content-center">
                      {index + 1}
                    </td>

                    <td>{book.ISBN}</td>

                    <td>{book.book_title}</td>

                    <td className="flex align-center justify-center content-center">
                      <input
                        className="w-14 px-1 font-bold"
                        value={book.quantity}
                        type="number"
                      />

                      <button
                        className="px-1/6 py-1/6 h-5 w-5 ml-2"
                        name={book.ISBN}
                        onClick={handleEditStockAmount}
                        title="Editar Cantidad"
                      >
                        <BsFillPencilFill />
                      </button>
                    </td>

                    <td className="px-6">
                      <select
                        className="w-max font-bold"
                        name="book_status"
                        id="book_status"
                        value={book.book_status ? "ACTIVE" : "INACTIVE"}
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                      </select>

                      <button
                        className="px-1/6 py-1/6 h-5 w-5 ml-2"
                        name={book.ISBN}
                        onClick={handleEditStockAmount}
                        title="Editar Cantidad"
                      >
                        <BsFillPencilFill />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="w-full">
                <td className="py-0" colSpan={5}>
                  <NotBookFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <LoadingStockComponent />
  );
};

export default AdminStockForm;
