import React from "react";
import axios from "axios";
import NotBookFound from "./NotBookFound";
import LoadingStockComponent from "../LoadingStock/LoadingStockComponent";
import { Link } from "react-router-dom";

const AdminStockForm = () => {
  const [allBooks, setAllBooks] = React.useState(null);
  const [isbnForSeach, setIsbnForSearch] = React.useState("");
  const [filteredBooks, setFilteredBooks] = React.useState([]);

  const addStockAtrributeToData = () => {
    setAllBooks((prev) => {
      const newArray = prev.map((book) => {
        return { ...book, stock: Math.floor(Math.random() * 100) };
      });
      setFilteredBooks(newArray);
      return newArray;
    });
  };

  React.useEffect(() => {
    axios
      .get("https://open-book-back.onrender.com/book")
      .then(({ data }) => {
        setAllBooks(data);
        addStockAtrributeToData();
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
    <div className="container w-2/3 p">
      <div>
        <div className="w-full flex justify-center items-center bg-orange-0 bg-opacity-25">
          <h5 className="w-fit px-11 text-black font-bold">
            FORMULARIO DE ADMINISTRACIÓN DE STOCK
          </h5>
        </div>
        <div className="flex flex-row justify-start border-2">
          <label
            className="w-1/8 text-lg text-black px-2 font-bold flex align-center justify-center items-center"
            htmlFor="ISBN"
          >
            ISBN NUMBER
          </label>
          <input
            className="w-1/4 border-2 border-blue-0 rounded-lg text-base px-2 text-blue-0 border-opacity-50"
            htmlFor="ISBN"
            name="ISBN"
            type="text"
            value={isbnForSeach}
            onChange={hadleIsbnSearch}
            autoComplete="off"
          />
          <span className="w-1/8 text-lg text-black px-2 font-bold flex align-center justify-center items-center">
            CREAR REGISTRO
          </span>
          <button
            className="flex align-center justify-center items-center"
            title="Crear Nuevo Registro"
          >
            <Link to={"/create_book"}>💾</Link>
          </button>
        </div>

        <table className="table-fixed border-separate border">
          <thead>
            <tr className="px-2 text-lg bg-blue-0">
              <th className="w-1/12">ITEM</th>
              <th className="w-1/6">ISBN NUMBER</th>
              <th className="w-2/4">BOOK TITLE</th>
              <th className="w-1/12">STOCK NUMBER</th>
              <th className="w-1/6">STATUS</th>
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
                        className="w-14"
                        value={book.stock}
                        type="number"
                      />

                      <button
                        className="border border-blue-0 rounded px-1/6 py-1/6 bg-blue-0 h-5 w-5"
                        name={book.ISBN}
                        onClick={handleEditStockAmount}
                        title="Editar Cantidad"
                      >
                        ✏️
                      </button>
                    </td>

                    <td className="px-auto">
                      <select
                        className="w-max"
                        name="book_status"
                        id="book_status"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                      </select>

                      <button
                        className="border border-blue-0 rounded px-1/6 py-1/6 bg-blue-0 h-5 w-5"
                        name={book.ISBN}
                        onClick={handleEditStockAmount}
                        title="Editar Cantidad"
                      >
                        ✏️
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
