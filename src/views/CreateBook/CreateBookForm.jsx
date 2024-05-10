import { useEffect, useState } from "react";
import axios from "axios";
import { validationsForm, validationImg } from "./validationsFormCreate";
import { MdError } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import arrayGenres from "../../data/arrayGenres";
import { useDispatch, useSelector } from "react-redux";
import { getGenresAndAuthors } from "../../redux/actions";
import { IoMdClose } from "react-icons/io";
import { IoAlertCircleSharp } from "react-icons/io5";

const CreateBookForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenresAndAuthors());
  }, []);

  const formInitialState = {
    ISBN: "",
    book_title: "",
    author: "",
    genre: [],
    book_description: "",
    price: 0,
    editorial: "",
    year_of_edition: "",
    language: "",
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [createProgress, setCreateProgress] = useState(0);
  const [bookData, setBookData] = useState(formInitialState);
  const [showOther, setShowOther] = useState(false);
  const [other, setOther] = useState("");
  const [alertGenre, setAlertGenre] = useState("");

  const genres = useSelector((state) => state.genres);
  // console.log(genres);

  const [errorForm, setErrorForm] = useState({
    ISBN: "",
    book_title: "",
    author: "",
    genre: "",
    book_description: "",
    price: "",
    img: "",
    editorial: "",
    year_of_edition: "",
    lenguage: "",
  });

  //? descripciones de cada campo:

  const ISBMDescription = "The ISBN is a unique identifier for books.";
  const authorName = "Author's full name (cannot contain numbers).";
  const priceBook = "Book price (specify cents).";
  const imgBook = "Book cover (only .jpg and .png files accepted)";
  const yearEdition = "Specifies the year of the released";

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
    console.log(bookData);

    if (
      !bookData.ISBN ||
      !bookData.book_title ||
      !bookData.author ||
      !bookData.genre ||
      !bookData.book_description ||
      !bookData.editorial ||
      !bookData.year_of_edition ||
      !bookData.language ||
      !bookData.price ||
      !selectedFile
    ) {
      const remainingFields = [];

      if (!bookData.ISBN) remainingFields.push("ISBN");
      if (!bookData.book_title) remainingFields.push("BOOK TITLE");
      if (!bookData.author) remainingFields.push("AUTHOR'S NAME");
      if (!bookData.editorial) remainingFields.push("EDITORIAL");
      if (!bookData.language) remainingFields.push("LANGUAGE");
      if (!bookData.year_of_edition) remainingFields.push("YEAR OF EDITION");
      if (!bookData.genre.length) remainingFields.push("GENRE");
      if (!bookData.book_description) remainingFields.push("BOOK DESCRIPTION");
      if (!bookData.price) remainingFields.push("PRICE");
      if (!selectedFile) remainingFields.push("IMAGE");

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
      errorForm.editorial ||
      errorForm.year_of_edition ||
      errorForm.lenguage ||
      errorForm.price ||
      errorForm.img
    ) {
      const wrongFields = [];

      if (errorForm.ISBN) wrongFields.push("ISBN");
      if (errorForm.book_title) wrongFields.push("BOOK TITLE");
      if (errorForm.author) wrongFields.push("AUTHOR'S NAME");
      if (errorForm.editorial) wrongFields.push("EDITORIAL");
      if (errorForm.lenguage) wrongFields.push("LANGUAGE");
      if (errorForm.year_of_edition) wrongFields.push("YEAR OF EDITION");
      if (errorForm.genres) wrongFields.push("GENRE");
      if (errorForm.book_description) wrongFields.push("BOOK DESCRIPTION");
      if (errorForm.price) wrongFields.push("PRICE");
      if (errorForm.img) wrongFields.push("IMAGE");

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
      formData.append("editorial", bookData.editorial);
      formData.append("year_of_edition", Number(bookData.year_of_edition));
      formData.append("language", bookData.language);
      formData.append("price", Number(bookData.price));

      // console.log("THIS IS THE DATA", formData.keys());
      console.log(formData);

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
        "https://open-book-back.onrender.com/books",

        "http://localhost:3001/books",
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

  const handleGenre = (event) => {
    const value = event.target.value;

    if (bookData.genre.length === 3) {
      return setAlertGenre("Max three genres");
    }

    setAlertGenre("");
    setErrorForm({ ...errorForm, genres: "" });
    if (value === "Other") {
      return setShowOther(true);
    }

    if (value !== "Other") {
      setShowOther(false);
    }

    if (bookData.genre.includes(value)) {
      return;
    }

    setBookData({ ...bookData, genre: [...bookData.genre, value] });
  };

  const handleOtherChange = (event) => {
    const value = event.target.value;
    setOther(value);
  };

  const handleOtherClink = (event) => {
    event.preventDefault();
    if (bookData.genre.length === 3) {
      return setAlertGenre("Max three genres");
    }
    if (bookData.genre.includes(other)) {
      return;
    }
    setBookData({ ...bookData, genre: [...bookData.genre, other] });
    setOther("");
  };

  const handleCloseTag = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;

    setBookData({
      ...bookData,
      genre: [...bookData.genre].filter((fil) => fil !== value),
    });

    if (bookData.genre.filter((fil) => fil !== value).length < 3) {
      setAlertGenre("");
    }

    if (bookData.genre.filter((fil) => fil !== value).length === 0) {
      setErrorForm({ ...errorForm, genres: "This field is required" });
    } else {
      setErrorForm({ ...errorForm, genres: "" });
    }
  };

  const handleLanguage = (event) => {
    setBookData({ ...bookData, language: event.target.value });
  };

  const handleDataChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    console.log(key);
    console.log(value);

    // validationsForm(key, value, errorForm, setErrorForm);

    updateData(key, value);
  };

  // useEffect(() => {
  //     console.log(errorForm);
  // }, [errorForm]);

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
              className="mr-3 font-semibold"
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
                  ? "rounded-xl border-2 border-orange-0 grow pl-2"
                  : " pl-2 rounded-xl border-2 grow"
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
            <label className=" mr-3 font-semibold" htmlFor="book_title">
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
                  ? "rounded-xl border-2 border-orange-0 grow pl-2"
                  : "rounded-xl border-2 grow pl-2"
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
              className="mr-3 font-semibold"
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
                  ? "rounded-xl border-2 border-orange-0 grow pl-2"
                  : "rounded-xl border-2 grow pl-2"
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

          {/* EDITORIAL INPUT FIELD */}
          <div className="w-5/6 flex mt-3">
            <label className=" mr-3 font-semibold" htmlFor="editorial">
              Editorial:
            </label>
            <input
              name="editorial"
              type="text"
              autoComplete="off"
              value={bookData.editorial}
              onChange={handleDataChange}
              className={
                errorForm.editorial
                  ? "rounded-xl border-2 border-orange-0 grow pl-2"
                  : "rounded-xl border-2 grow pl-2"
              }
            />
            <div
              data-tooltip-id="Editorial-tooltip"
              data-tooltip-content={errorForm.editorial}
              className="flex justify-center items-center"
            >
              <MdError
                className={
                  errorForm.editorial ? "text-orange-0 ml-1" : "hidden"
                }
              />
            </div>
            <Tooltip className="text-xs" id="Editorial-tooltip" />
          </div>

          <div className="flex items-center justify-start w-5/6">
            {/* LENGUAGE INPUT FIELD */}
            <div className="w-64 flex items-center mt-3">
              <label className=" mr-3 font-semibold" htmlFor="language">
                Language:
              </label>
              <select
                name="language"
                onChange={handleLanguage}
                className={
                  errorForm.lenguage
                    ? "border-2 border-orange-0 rounded-xl"
                    : "border-2 rounded-xl"
                }
              >
                <option disabled selected>
                  Select one
                </option>
                <option>Spanish</option>
                <option>English</option>
              </select>
              <div
                data-tooltip-id="Lenguage-tooltip"
                data-tooltip-content={errorForm.lenguage}
                className="flex justify-center items-center"
              >
                <MdError
                  className={
                    errorForm.editorial ? "text-orange-0 ml-1" : "hidden"
                  }
                />
              </div>
              <Tooltip className="text-xs" id="Lenguage-tooltip" />
            </div>

            {/* YEAR OF EDITION FIELD */}
            <div className="grow flex items-center mt-3">
              <label
                className="mr-3 font-semibold"
                htmlFor="year_of_edition"
                data-tooltip-id="year-description"
                data-tooltip-content={yearEdition}
              >
                Year of Edition:
              </label>
              <Tooltip className="text-xs" id="year-description" />
              <input
                name="year_of_edition"
                type="number"
                autoComplete="off"
                value={bookData.yearEdition}
                onChange={handleDataChange}
                className={
                  errorForm.year_of_edition
                    ? "rounded-xl border-2 border-orange-0 pl-2 grow"
                    : "rounded-xl border-2 grow pl-2"
                }
              />
              <div
                data-tooltip-id="Year-tooltip"
                data-tooltip-content={errorForm.year_of_edition}
                className="flex justify-center items-center"
              >
                <MdError
                  className={
                    errorForm.year_of_edition ? "text-orange-0 ml-1" : "hidden"
                  }
                />
              </div>
              <Tooltip className="text-xs" id="Year-tooltip" />
            </div>
          </div>

          {/* GENRES FIELD */}
          <div className="flex flex-col mt-3 w-5/6 ">
            <div className="w-5/6 flex flex-row items-center">
              <label className="mr-3 font-semibold">Genres:</label>
              <select
                onChange={handleGenre}
                value="Select one"
                className={
                  errorForm.genres
                    ? "rounded-xl border-2 border-orange-0 mr-2 w-40"
                    : "rounded-xl border-2 mr-2 w-40"
                }
              >
                <option value="Select one" disabled selected>
                  Select one
                </option>
                {genres.map((genre) => (
                  <option key={genre}>{genre}</option>
                ))}
                <option>Other</option>
              </select>
              {showOther ? (
                <div className="flex items-center">
                  <input
                    onChange={handleOtherChange}
                    value={other}
                    type="text"
                    name="other"
                    className="rounded-xl border-2 pl-2 w-40 "
                  />
                  <button
                    className="text-2xl duration-200 hover:text-orange-0 ml-2"
                    onClick={handleOtherClink}
                  >
                    {">"}
                  </button>
                </div>
              ) : null}
              {alertGenre ? (
                <div className="flex items-center">
                  <IoAlertCircleSharp className="text-xl text-blue-500 ml-2" />
                  <p className="text-blue-500 ml-1">{alertGenre}</p>
                </div>
              ) : null}
              <div
                data-tooltip-id="Genre-tooltip"
                data-tooltip-content={errorForm.genres}
                className="flex justify-center items-center"
              >
                <MdError
                  className={errorForm.genres ? "text-orange-0 ml-1" : "hidden"}
                />
              </div>
              <Tooltip className="text-xs" id="Genre-tooltip" />
            </div>
            <div className="bg-gray-50 h-14 border-2 rounded-xl mt-2 flex items-center px-2 justify-around">
              {bookData.genre.length ? null : (
                <p className="text-gray-400 ml-3 mt-1">
                  You can add three genres per book
                </p>
              )}
              {bookData.genre.map((gen, index) => (
                <div
                  key={index + 1}
                  className="flex px-2 py-1 justify-between items-center w-48 rounded-full border-2 border-gray-400"
                >
                  <p className="truncate text-lg font-bold ml-2">{gen}</p>
                  <button
                    onClick={handleCloseTag}
                    value={gen}
                    className="duration-200 hover:text-orange-0 text-2xl"
                  >
                    <IoMdClose />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* BOOK'S DESCRIPTION FIELD */}
          <div className="flex flex-col w-5/6 mt-3">
            <div className="flex font-semibold">
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
              className="mr-3 font-semibold"
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

          {/* IMG FIELD */}
          <div className="w-5/6 flex mt-3">
            <label
              className="mr-3 font-semibold"
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
