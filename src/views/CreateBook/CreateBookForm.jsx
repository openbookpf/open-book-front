import { useState } from "react";
import axios from "axios";
import { validationsForm, validationImg } from "./validationsFormCreate";
import { MdError } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import arrayGenres from "../../data/arrayGenres";

const CreateBookForm = () => {
  const formInitialState = {
    ISBN: "",
    book_title: "",
    author: "",
    genre: "",
    book_description: "",
    price: 0,
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [createProgress, setCreateProgress] = useState(0);
  const [bookData, setBookData] = useState(formInitialState);

  const [errorForm, setErrorForm] = useState({
    ISBN: "",
    book_title: "",
    author: "",
    genre: "",
    book_description: "",
    price: "",
    img: "",
  });

  //? descripciones de cada campo:

  const ISBMDescription = "The ISBN is a unique identifier for books.";
  const authorName = "Author's full name (cannot contain numbers).";
  const priceBook = "Book price (specify cents).";
  const imgBook = "Book cover (only .jpg and .png files accepted)";
  //? ----------------------------

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    validationImg(event.target.files[0], errorForm, setErrorForm);
  };

  function stripValues(str) {
    return Number(str.replace(/\D/g, ""));
  }

  const handleUpload = async (event) => {
    event.preventDefault();

    if (
      !bookData.ISBN ||
      !bookData.book_title ||
      !bookData.author ||
      !bookData.genre ||
      !bookData.book_description ||
      !bookData.price ||
      !selectedFile
    ) {
      const remainingFields = [];
      for (let key in bookData) {
        if (!bookData[key]) {
          remainingFields.push(key);
        }
      }
      if (!selectedFile) remainingFields.push("image");

      return Swal.fire({
        title: `Complete the fields ${remainingFields.join(
          ", "
        )} to add a book!`,
        text: "",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#D34720",
        background: "#fef3ed",
      });
    }

    if (
      errorForm.ISBN ||
      errorForm.book_title ||
      errorForm.author ||
      errorForm.genre ||
      errorForm.book_description ||
      errorForm.price ||
      errorForm.img
    ) {
      const wrongFields = [];
      for (let key in errorForm) {
        if (errorForm[key]) {
          wrongFields.push(key);
        }
      }

      const wrongMessage =
        wrongFields.length === 1
          ? `Verify that the data in the ${wrongFields.join(
              ", "
            )} field is correct`
          : `Verify that the data in the ${wrongFields.join(
              ", "
            )} fields are correct`;

      return Swal.fire({
        title: "Wrong data!",
        text: wrongMessage,
        icon: "error",
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

      console.log("THIS IS THE DATA", formData.keys());

      const config = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted =
            (progressEvent.loaded / progressEvent.total) * 100;

          setCreateProgress(percentCompleted);
          console.log(percentCompleted);
        },
      };

      // Send the image data to your backend
      const response = await axios.post(
        "https://open-book-back.onrender.com/book",

        // "http://localhost:3001/book",
        formData,
        config,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully:", response.data);
      // alert("LIBRO REGISTRADO");
      setBookData(formInitialState);
      setCreateProgress(0);
      setSelectedFile(null);
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
      setCreateProgress(0);
      return Swal.fire({
        title: "Error",
        text: "Something went wrong when loading the book, check the data and try again",
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
        className="w-4/6 py-5 text-base bg-[#fef3ed] shadow-md rounded-xl p-3"
        action="submit"
        id="register_a_book"
      >
        <div className="flex justify-center">
          <h5 className="text-center bg-blue-0 text-white-0 font-semibold text-2xl w-4/6 py-3 mb-5 rounded-xl">
            Register your Book
          </h5>
        </div>

        <div className="flex flex-col items-center">
          {/* ISBN INPUT FIELD */}
          <div className="w-5/6 flex mt-3 duration-200">
            <label
              className="mr-3"
              htmlFor="ISBN"
              data-tooltip-id="ISBM-description"
              data-tooltip-content={ISBMDescription}
            >
              ISBN Number:
            </label>
            <Tooltip className="text-xs" id="ISBM-description" />
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
              Book title:
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
            <label
              className="mr-3"
              htmlFor="author"
              data-tooltip-id="author-description"
              data-tooltip-content={authorName}
            >
              {"Author's name:"}
            </label>
            <Tooltip className="text-xs" id="author-description" />
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
          <div className="w-5/6 flex mt-3 font-poppins">
            <label className="mr-3" htmlFor="genre">
              Genre:
            </label>
            <select
              name="genre"
              value={bookData.genre}
              onChange={handleDataChange}
              className={
                errorForm.genre
                  ? "rounded-xl border-2 border-orange-0 grow"
                  : "rounded-xl border-2 grow pl-5"
              } //className="rounded-xl border-2 grow"
            >
              {arrayGenres.map((genre, index) => (
                <option className="text-black " key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
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
            <div className="flex">
              <label htmlFor="book_description">Book description:</label>
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
                  ? "rounded-xl border-2 pl-2 border-orange-0"
                  : "rounded-xl border-2 pl-2"
              }
            />
          </div>
          {/* PRICE FIELD */}
          <div className="w-5/6 flex mt-3">
            <label
              className="mr-3"
              htmlFor="price"
              data-tooltip-id="price-description"
              data-tooltip-content={priceBook}
            >
              Price (USD):
            </label>
            <Tooltip className="text-xs" id="price-description" />
            <input
              name="price"
              type="number"
              autoComplete="off"
              value={bookData.price}
              onChange={handleDataChange}
              className={
                errorForm.price
                  ? "rounded-xl border-2 border-orange-0 pl-2 grow"
                  : "rounded-xl border-2 grow pl-2"
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
            <label
              className="mr-3"
              htmlFor="book_cover"
              data-tooltip-id="Img-description"
              data-tooltip-content={imgBook}
            >
              Book cover:
            </label>
            <Tooltip className="text-xs" id="Img-description" />
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
            className="mt-5 text-lg bg-orange-0 px-10 py-2 rounded-full text-white-0 duration-200 hover:scale-110 hover:bg-[#D48620]"
            onClick={handleUpload}
          >
            Add book
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBookForm;
