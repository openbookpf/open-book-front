import { useState } from "react";
import axios from "axios";
import { validationsForm, validationImg } from "./validationsFormCreate";
import { MdError } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const CreateBookForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [bookData, setBookData] = useState({
    ISBN: "",
    book_title: "",
    author: "",
    genre: "",
    book_description: "",
    price: 0,
  });

  const [errorForm, setErrorForm] = useState({
    ISBN: "",
    book_title: "",
    author: "",
    genre: "",
    book_description: "",
    price: "",
    img: "",
  });

  const handleFileChange = (event) => {
    validationImg(selectedFile, errorForm, setErrorForm);
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  function stripValues(str) {
    return Number(str.replace(/\D/g, ""));
  }

  const handleUpload = async (event) => {
    event.preventDefault();

    if (
      errorForm.ISBN ||
      errorForm.book_title ||
      errorForm.author ||
      errorForm.genre ||
      errorForm.book_description ||
      errorForm.price ||
      errorForm.img
    ) {
      return Swal.fire({
        title: "Wrong data!",
        text: "Verify that the data entered is correct",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#D34720",
        background: "#fef3ed",
      });
    }

    if (
      !bookData.ISBN &&
      !bookData.book_title &&
      !bookData.author &&
      !bookData.genre &&
      !bookData.book_description &&
      !bookData.price &&
      !selectedFile
    ) {
      return Swal.fire({
        title: "Complete the fields to add a book!",
        text: "",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#D34720",
        background: "#fef3ed",
      });
    }

    try {
      const formData = new FormData();
      formData.append("book_cover_url", selectedFile);
      formData.append("ISBN", stripValues(bookData.ISBN));
      formData.append("book_title", bookData.book_title);
      formData.append("author", bookData.author);
      formData.append("book_description", bookData.book_description);
      formData.append("genre", bookData.genre);
      formData.append("price", Number(bookData.price));

      console.log("THIS IS THE DATA", formData);

      // Send the image data to your backend
      const response = await axios.post(
        "https://open-book-back.onrender.com/book",

        // "http://localhost:3001/book",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully:", response.data);
      // alert("LIBRO REGISTRADO");
      return Swal.fire({
        title: "Book registered correctly!",
        text: "",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#81B29A",
        background: "#fef3ed",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      return Swal.fire({
        title: `Error uploading image: ${error}`,
        text: ":(",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#D34720",
        background: "#fef3ed",
      });
    }
  };

  const updateData = (key, value) => {
    setBookData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleDataChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    validationsForm(key, value, errorForm, setErrorForm);

    updateData(key, value);
  };

  return (
    <div className="mt-20 flex justify-center">
      <form
        className="w-4/6 bg-[#fef3ed] shadow-md rounded-xl p-3"
        action="submit"
      >
        <div className="flex justify-center">
          <h5 className="text-3xl text-center bg-cyan-0 w-4/6 py-1 rounded-xl">
            Stock creation form: Register your Book
          </h5>
        </div>

        <div className="flex flex-col items-center text-2xl">
          {/* ISBN INPUT FIELD */}
          <div className="w-5/6 flex mt-3 duration-200">
            <label className="mr-3" htmlFor="ISBN">
              ISBN Number:
            </label>
            <input
              name="ISBN"
              type="text"
              autoComplete="off"
              value={bookData.ISBN}
              onChange={handleDataChange}
              className={
                errorForm.ISBN
                  ? "rounded-xl border-2 border-orange-0 grow"
                  : "rounded-xl border-2 grow"
              }
              // className="rounded-xl border-2 grow"
            />
            <div
              data-tooltip-id="ISBM-tooltip"
              data-tooltip-content={errorForm.ISBN}
              className="flex justify-center items-center"
            >
              <MdError
                className={errorForm.ISBN ? "text-orange-0 ml-1" : "hidden"}
              />
            </div>
            <Tooltip className="text-xs" id="ISBM-tooltip" />
          </div>
          {/* BOOK TITLE INPUT FIELD */}
          <div className="w-5/6 flex mt-3">
            <label className=" mr-3" htmlFor="book_title">
              Book Title:
            </label>
            <input
              name="book_title"
              type="text"
              autoComplete="off"
              value={bookData.book_title}
              onChange={handleDataChange}
              className={
                errorForm.book_title
                  ? "rounded-xl border-2 border-orange-0 grow"
                  : "rounded-xl border-2 grow"
              }
            />
            <div
              data-tooltip-id="Title-tooltip"
              data-tooltip-content={errorForm.book_title}
              className="flex justify-center items-center"
            >
              <MdError
                className={
                  errorForm.book_title ? "text-orange-0 ml-1" : "hidden"
                }
              />
            </div>
            <Tooltip className="text-xs" id="Title-tooltip" />
          </div>
          {/* AUTHOR'S NAME FIELD */}
          <div className="w-5/6 flex mt-3">
            <label className="mr-3" htmlFor="author">
              {"Author's Name:"}
            </label>
            <input
              name="author"
              type="text"
              autoComplete="off"
              value={bookData.author}
              onChange={handleDataChange}
              className={
                errorForm.author
                  ? "rounded-xl border-2 border-orange-0 grow"
                  : "rounded-xl border-2 grow"
              }
            />
            <div
              data-tooltip-id="Author-tooltip"
              data-tooltip-content={errorForm.author}
              className="flex justify-center items-center"
            >
              <MdError
                className={errorForm.author ? "text-orange-0 ml-1" : "hidden"}
              />
            </div>
            <Tooltip className="text-xs" id="Author-tooltip" />
          </div>

          {/* GENRE FIELD */}
          <div className="w-5/6 flex mt-3">
            <label className="mr-3" htmlFor="genre">
              Genre:
            </label>
            <input
              name="genre"
              type="text"
              autoComplete="off"
              value={bookData.genre}
              onChange={handleDataChange}
              className={
                errorForm.genre
                  ? "rounded-xl border-2 border-orange-0 grow"
                  : "rounded-xl border-2 grow"
              }
            />
            <div
              data-tooltip-id="Genre-tooltip"
              data-tooltip-content={errorForm.genre}
              className="flex justify-center items-center"
            >
              <MdError
                className={errorForm.genre ? "text-orange-0 ml-1" : "hidden"}
              />
            </div>
            <Tooltip className="text-xs" id="Genre-tooltip" />
          </div>
          {/* BOOK'S DESCRIPTION FIELD */}
          <div className="flex flex-col w-5/6 mt-3">
            <div
              className="flex
                        "
            >
              <label htmlFor="book_description">Book Description:</label>
              <div
                data-tooltip-id="Description-tooltip"
                data-tooltip-content={errorForm.book_description}
                className="flex justify-center items-center"
              >
                <MdError
                  className={
                    errorForm.book_description ? "text-orange-0 ml-1" : "hidden"
                  }
                />
              </div>
              <Tooltip className="text-xs" id="Description-tooltip" />
            </div>
            <textarea
              name="book_description"
              type="text"
              autoComplete="off"
              rows="5"
              value={bookData.book_description}
              onChange={handleDataChange}
              className={
                errorForm.book_description
                  ? "rounded-xl border-2 border-orange-0"
                  : "rounded-xl border-2"
              }
            />
          </div>
          {/* PRICE FIELD */}
          <div className="w-5/6 flex mt-3">
            <label className="mr-3" htmlFor="price">
              Price:
            </label>
            <input
              name="price"
              type="number"
              autoComplete="off"
              value={bookData.price}
              onChange={handleDataChange}
              className={
                errorForm.price
                  ? "rounded-xl border-2 border-orange-0 grow"
                  : "rounded-xl border-2 grow"
              }
            />
            <div
              data-tooltip-id="Price-tooltip"
              data-tooltip-content={errorForm.price}
              className="flex justify-center items-center"
            >
              <MdError
                className={errorForm.price ? "text-orange-0 ml-1" : "hidden"}
              />
            </div>
            <Tooltip className="text-xs" id="Price-tooltip" />
          </div>
          <div className="w-5/6 flex mt-3">
            <label className="mr-3" htmlFor="book_cover">
              Image:{" "}
            </label>
            <input type="file" onChange={handleFileChange} />
            <img src={selectedFile} alt="" />
            <div
              data-tooltip-id="Img-tooltip"
              data-tooltip-content={errorForm.img}
              className="flex justify-center items-center"
            >
              <MdError
                className={errorForm.img ? "text-orange-0 ml-1" : "hidden"}
              />
            </div>
            <Tooltip className="text-xs" id="Img-tooltip" />
          </div>
          <button
            className="mt-5 text-3xl bg-orange-0 px-3 rounded-xl text-white-0 duration-200 hover:scale-105 hover:bg-[#D48620]"
            onClick={handleUpload}
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBookForm;
