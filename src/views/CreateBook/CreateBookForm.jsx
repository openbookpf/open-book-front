import { useState } from "react";
import axios from "axios";

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  function stripValues(str) {
    return Number(str.replace(/\D/g, ""));
  }

  const handleUpload = async (event) => {
    event.preventDefault();
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
      alert("LIBRO REGISTRADO");
    } catch (error) {
      console.error("Error uploading image:", error);
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

    updateData(key, value);
  };

  return (
    <div className="mx-auto mt-20">
      <form
        className="container border border-orange-0 border-opacity-50"
        action="submit"
      >
        <div className="w-full flex justify-center items-center bg-orange-0 bg-opacity-25">
          <h5 className="w-fit px-11 text-black font-bold">
            STOCK CREATION FORM: Register your Book
          </h5>
        </div>

        <div className="bg-blue-0 bg-opacity-15">
          {/* ISBN INPUT FIELD */}
          <div className="flex flex-col align-center items-center justify-center mx-1 my-1">
            <label
              className="w-full text-lg text-cyan-0 font-bold"
              htmlFor="ISBN"
            >
              ISBN NUMBER
            </label>
            <input
              className="border border-blue-0 rounded w-full text-lg text-blue-0 px-2"
              name="ISBN"
              type="text"
              autoComplete="off"
              value={bookData.ISBN}
              onChange={handleDataChange}
            />
          </div>
          {/* BOOK TITLE INPUT FIELD */}
          <div className="flex flex-col align-center items-center justify-center mx-1 my-1">
            <label
              className="w-full text-lg text-cyan-0 font-bold"
              htmlFor="book_title"
            >
              BOOK TITLE
            </label>
            <input
              className="border border-blue-0 rounded w-full text-lg text-blue-0 px-2"
              name="book_title"
              type="text"
              autoComplete="off"
              value={bookData.book_title}
              onChange={handleDataChange}
            />
          </div>
          {/* AUTHOR'S NAME FIELD */}
          <div className="flex flex-col align-center items-center justify-center mx-1 my-1">
            <label
              className="w-full text-lg text-cyan-0 font-bold"
              htmlFor="author"
            >
              {"AUTHOR'S NAME"}
            </label>
            <input
              className="border border-blue-0 rounded w-full text-lg text-blue-0 px-2"
              name="author"
              type="text"
              autoComplete="off"
              value={bookData.author}
              onChange={handleDataChange}
            />
          </div>

          {/* GENRE FIELD */}
          <div className="flex flex-col align-center items-center justify-center mx-1 my-1">
            <label
              className="w-full text-lg text-cyan-0 font-bold"
              htmlFor="genre"
            >
              GENRE
            </label>
            <input
              className="border border-blue-0 rounded w-full text-lg text-blue-0 px-2"
              name="genre"
              type="text"
              autoComplete="off"
              value={bookData.genre}
              onChange={handleDataChange}
            />
          </div>
          {/* BOOK'S DESCRIPTION FIELD */}
          <div className="flex flex-col align-center items-center justify-center mx-1 my-1">
            <label
              className="w-full text-lg text-cyan-0 font-bold"
              htmlFor="book_description"
            >
              BOOK DESCRIPTION
            </label>
            <textarea
              className="border border-blue-0 rounded w-full text-lg text-blue-0 px-2"
              name="book_description"
              type="text"
              autoComplete="off"
              rows="5"
              value={bookData.book_description}
              onChange={handleDataChange}
            />
          </div>
          {/* PRICE FIELD */}
          <div className="flex flex-col align-center items-center justify-center mx-1 my-1">
            <label
              className="w-full text-lg text-cyan-0 font-bold"
              htmlFor="price"
            >
              PRICE
            </label>
            <input
              className="border border-blue-0 rounded w-full text-lg text-blue-0 px-2"
              name="price"
              type="number"
              autoComplete="off"
              value={bookData.price}
              onChange={handleDataChange}
            />
          </div>
          <div className="flex flex-col align-center items-center justify-center mx-1 my-1">
            <label
              className="w-full text-lg text-cyan-0 font-bold"
              htmlFor="book_cover"
            >
              IMAGE
            </label>
            <input
              className="flexblock w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 my-3"
              type="file"
              onChange={handleFileChange}
            />
            <button
              className="text-sm/[19px] font-bold text-white-0 border border-orange-0 py-1 px-1 rounded bg-orange-0"
              onClick={handleUpload}
            >
              CREAR REGISTRO
            </button>
            <img src={selectedFile} alt="" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBookForm;
