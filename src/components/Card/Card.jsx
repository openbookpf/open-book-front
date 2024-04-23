/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Card = ({ book, favorites, showFavoriteButton }) => {
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      setIsFav(favorites.some((fav) => fav.ISBN === book.ISBN));
    }
  }, [favorites, book.ISBN]);

  const handleAddToCart = () => {
    const productToAdd = {
      ISBN: book.ISBN,
      book_title: book.book_title,
      book_cover_url: book.book_cover_url,
      author: book.author,
      price: book.price,
      quantity: 1,
    };
    dispatch(addToCart(productToAdd));
  };

  const handleFavoriteButtonClick = () => {
    if (isFav) {
      setIsFav(false);
      dispatch(removeFromFavorites(book.ISBN));
    } else {
      setIsFav(true);
      dispatch(addToFavorites(book));
    }
  };

  const handleBuyButton = () => {
    handleAddToCart();
  };

  /* const handleRemoveFromFavorites = () => {
    handleRemoveFromFavorites(book.ISBN);
  }; */

  return (
    <div
      className="flex flex-col shadow-md gap-2 w-52 h-[400px] mb-5 pb-3 rounded-xl bg-[#fef3ed] mx-10"
      key={book.ISBN}
    >
      <div className="flex flex-col gap-10">
        <div className="max-h-40 my-2 mx-auto">
          <img
            className="max-h-64 rounded-lg object-contain"
            src={book.book_cover_url}
            alt={book.book_title}
          />
        </div>
        <div className="flex flex-col text-black mx-auto mt-12 pt-2 px-5 w-full">
          <Link to={`/detail/${book.ISBN}`} rel="noopener noreferrer">
            <p className="font-bold truncate hover:underline hover:cursor-pointer  delay-200 text-base w-full">
              {book.book_title}
            </p>
          </Link>
          <p className="font-light text-xs">{book.author}</p>
          <p className="font-semibold text-lg">${book.price}</p>
        </div>
      </div>
      <div className="flex flex-row mx-auto gap-1.5 ">
        <Link to={isAuthenticated ? "/checkout" : "#"}>
          <button
            onClick={handleBuyButton}
            className={`${
              isAuthenticated ? "bg-orange-0" : "bg-blue-0 bg-opacity-25"
            } h-auto rounded-2xl w-auto hover:scale-110 transition ease-in delay-100`}
            disabled={isAuthenticated ? false : true}
            title={`${isAuthenticated ? "" : "log in to buy books"}`}
          >
            <span className="text-white-0 align-middle py-1 px-4 text-sm">
              BUY NOW
            </span>
          </button>
        </Link>

        <button
          onClick={handleAddToCart}
          className="bg-blue-0 h-auto rounded-2xl w-auto hover:scale-110 transition ease-in delay-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-white-0 m-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M12.5 17h-6.5v-14h-2" />
            <path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
          </svg>
        </button>
        {showFavoriteButton && (
          <button
            onClick={handleFavoriteButtonClick}
            className={`bg-cyan-0 h-auto rounded-2xl hover:scale-110 transition ease-in delay-100 ${
              isFav ? "text-red-500" : ""
            }`}
          >
            {isFav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-red-800 m-2"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-slate-50 m-2"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
