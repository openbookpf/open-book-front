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
        <div className="mt-20 flex justify-center">
            <form className="w-4/6 bg-[#fef3ed] shadow-md rounded-xl p-3" action="submit">
                <div className="flex justify-center">
                    <h5 className="text-3xl text-center bg-cyan-0 w-4/6 py-1 rounded-xl">
                        Stock creation form: Register your Book
                    </h5>
                </div>

                <div className="flex flex-col items-center text-2xl">
                    {/* ISBN INPUT FIELD */}
                    <div className="w-5/6 flex mt-3">
                        <label className="mr-3" htmlFor="ISBN">
                            ISBN Number:
                        </label>
                        <input
                            name="ISBN"
                            type="text"
                            autoComplete="off"
                            value={bookData.ISBN}
                            onChange={handleDataChange}
                            className="rounded-xl border-2 grow"
                        />
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
                            className="rounded-xl border-2 grow"
                        />
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
                            className="rounded-xl border-2 grow"
                        />
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
                            className="rounded-xl border-2 grow"
                        />
                    </div>
                    {/* BOOK'S DESCRIPTION FIELD */}
                    <div className="flex flex-col w-5/6 mt-3">
                        <label htmlFor="book_description">Book Description:</label>
                        <textarea
                            name="book_description"
                            type="text"
                            autoComplete="off"
                            rows="5"
                            value={bookData.book_description}
                            onChange={handleDataChange}
                            className="rounded-xl border-2"
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
                            className="rounded-xl border-2 grow"
                        />
                    </div>
                    <div className="w-5/6 flex mt-3">
                        <label className="mr-3" htmlFor="book_cover">
                            Image:{" "}
                        </label>
                        <input type="file" onChange={handleFileChange} />
                        <img src={selectedFile} alt="" />
                    </div>
                    <button className="mt-5 text-3xl bg-orange-0 px-3 rounded-xl text-white-0 duration-200 hover:scale-105 hover:bg-[#D48620]">
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBookForm;
