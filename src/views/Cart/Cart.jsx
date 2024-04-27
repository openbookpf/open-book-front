import React from "react";
import ItemCount from "../../components/ItemCount/ItemCount";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions";
import { IoTrashOutline } from "react-icons/io5";
import { addToCart } from "../../redux/actions";
import { removeAll } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

function Cart() {
  const cartProducts = useSelector((state) => state.items);
  const cartCounter = useSelector((state) => state.totalItems);
  const cartTotalPrice = useSelector((state) => state.cartTotalPrice);
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleSubtractFromCart = (isbn) => {
    dispatch(removeFromCart(isbn));
  };

  const handleRemoveAll = (isbn) => {
    dispatch(removeAll(isbn));
  };

  return (
    <div className="flex flex-row font-poppins my-10 md:container md:mx-auto   min-h-screen min-w-screen">
      <div className="flex-col basis-3/4 container py-10 px-15">
        {cartProducts && cartProducts.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {cartProducts.map((p) => (
              <div
                key={p.ISBN}
                className="md:container md:mx-auto bg-[#fef3ed] flex items-center p-4 shadow-lg rounded-lg"
              >
                <img
                  className="basis-1/8 w-16 h-24 object-cover rounded"
                  src={p.book_cover_url}
                  alt={p.book_title}
                />

                <div className="ml-4 basis-1/2">
                  <p className="text-gray-600 text-lg">{p.author}</p>
                  <Link to="">
                    <p className="text-gray-800 font-bold ">{p.book_title}</p>
                  </Link>
                </div>

                <div className="basis-1/3 items-center mt-2">
                  <ItemCount
                    counter={p.quantity}
                    onAdd={() => handleAddToCart(p)}
                    onSubtract={() => handleSubtractFromCart(p.ISBN)}
                    onChange={(value) => handleChangeCartAmount(p, value)}
                  />
                </div>
                <div className="basis-1/4 items-center mt-2 flex flex-row">
                  <div className="font-bold text-lg ml-auto">
                    ${Math.max(0, p.quantity * p.price).toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleRemoveAll(p.ISBN)}
                    className="bg-[#fef3ed] hover:bg-gray-200 py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400 ml-2"
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-16 ">
            <div className="bg-[#fef3ed] p-4 w-1/2 shadow-lg rounded-lg">
              <p className="flex justify-center items-center text-gray-800 font-medium">
                Your cart is empty
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col mt-10 h-64 space-y-4 basis-1/5 bg-[#fef3ed] container py-14 px-15   md:container md:mx-11 items-center shadow-lg rounded-lg">
        <div className="font-bold text-lg">
          Total books: {Math.max(0, cartCounter)}
        </div>
        <div className="font-bold text-lg">
          Total price: ${Math.max(0, cartTotalPrice).toFixed(2)}
        </div>
        {cartCounter > 0 ? (
          <Link
            to={isAuthenticated ? "/checkout" : "#"}
            title={`${isAuthenticated ? "" : "log in to buy books"}`}
            className={`${
              isAuthenticated
                ? "bg-cyan-0 hover:bg-green-700"
                : "bg-blue-0 bg-opacity-25"
            } text-white py-2 px-4 rounded-lg`}
          >
            <span className="ml-1">Checkout</span>
          </Link>
        ) : (
          <Link
            to="#"
            className={`bg-cyan-0 hover:bg-green-700 text-white py-2 px-4 rounded-lg ${
              cartCounter === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <span className="ml-1">Checkout</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Cart;
