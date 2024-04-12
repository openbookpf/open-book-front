import React from "react";
import arrayLibros from "../../data/arrayLibros";
const BookList = () => {
  let numLibros = arrayLibros.length;
  return (
    <div className="mx-auto mt-5">
      <h1 className="font-bold text-black">Todos los libros</h1>
      <p className="font-light text-sm text-gray-500">
        Tenemos {numLibros} libros disponibles
      </p>

      <div className="flex flex-row justify-center content-center">
        <div className="grid grid-cols-4 my-11 gap-6 mx-auto p-2 ">
          {arrayLibros.map((book) => {
            return (
              <div
                className="flex flex-col shadow-md gap-2 max-w-52 mb-2 pb-3 rounded-xl bg-[#fef3ed]"
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
                    <p className="font-bold truncate hover:underline hover:cursor-pointer  delay-200 text-base w-full">
                      {book.book_title}
                    </p>
                    <p className="font-light text-xs">{book.author}</p>
                    <p className="font-semibold text-lg">${book.price}</p>
                  </div>
                </div>
                <div className="flex flex-row mx-auto gap-1.5 ">
                  <button className="bg-orange-0 h-auto rounded-2xl w-auto hover:scale-110 transition ease-in delay-100">
                    <span className="text-white-0 align-middle py-1 px-4 text-sm">
                      Comprar
                    </span>
                  </button>
                  <button
                    id="cart"
                    className="bg-blue-0 h-auto rounded-2xl w-auto hover:scale-110 transition ease-in delay-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus"
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
                  <button
                    id="wishlist"
                    className="bg-cyan-0 h-auto rounded-2xl hover:scale-110 transition ease-in delay-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="stroke-white-0 m-2"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-heart"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookList;
