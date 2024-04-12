import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { BsFacebook, BsWhatsapp, BsTwitterX } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Detail() {
  const { isbn } = useParams();
  const [bookData, setBookData] = useState(null);
  const apiUrl = `https://open-book-back.onrender.com/book/${isbn}`;

  useEffect(() => {
    async function getBookById() {
      try {
        const response = await axios.get(apiUrl);
        setBookData(response.data);
      } catch (error) {
        console.error("Error al obtener el libro:", error);
      }
    }

    getBookById();
  }, [isbn]);

  const {
    ISBN,
    book_cover_url,
    book_title,
    author,
    price,
    book_description,
    genre,
  } = bookData || {};

  return (
    <div className="bg-white-0 font-poppinds">
      <div className="container mx-auto px-4 py-8">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={book_cover_url}
              alt={book_title}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:ml-20 mt-4 md:mt-0">
            <h2 className="text-5xl font-bold text-gray-800">{book_title}</h2>
            <p className="text-gray-700 font-bold mt-2">{author}</p>
            <p className="text-gray-700 mt-2">$ {price}</p>
            <div className="mt-4 flex space-x-4">
              <button className="bg-orange-0 hover:bg-orange-700 text-white-0 text-lg py-1 px-16 focus:outline-none focus:shadow-outline rounded-full">
                Agregar al Carrito
              </button>
              <button className="bg-cyan-0 hover:bg-cyan-700 text-2xl text-white-0 py-1 px-4 focus:outline-none focus:shadow-outline rounded-full">
                <MdFavoriteBorder />
              </button>
            </div>
            <p className="text-gray-700 mt-4 font-bold text-lg">Descripción:</p>
            <p className="text-gray-700 mt-2 text-sm">{book_description}</p>
            <p className="text-gray-700 mt-4 font-bold text-lg">Géneros:</p>
            <div className="mt-4 flex space-x-4">
              <button className="bg-blue-0 hover:bg-blue-700 text-white-0 text-lg py-2 px-10 focus:outline-none focus:shadow-outline rounded-full">
                {genre}
              </button>
              <button className="bg-blue-0 hover:bg-blue-700 text-white-0 text-lg py-2 px-10 focus:outline-none focus:shadow-outline rounded-full">
                Literatura
              </button>
            </div>
            <p className="text-gray-700 mt-4 font-bold text-lg">Compartir:</p>
            <div className="mt-4 flex space-x-4">
              <BsFacebook />
              <BsTwitterX />
              <BsWhatsapp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
