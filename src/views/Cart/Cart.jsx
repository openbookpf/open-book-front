import React from "react";
import ItemCount from "../../components/ItemCount/ItemCount";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions";
import { IoTrashOutline } from "react-icons/io5";
import { addToCart } from "../../redux/actions";

function Cart() {
  const cartProducts = useSelector((state) => state.items);
  const cartCounter = useSelector((state) => state.totalItems);
  const cartTotalPrice = useSelector((state) => state.cartTotalPrice);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleSubtractFromCart = (isbn) => {
    dispatch(removeFromCart(isbn));
  };

  return (
    <div className="font-poppins my-8 md:container md:mx-auto  flex flex-col min-h-screen min-w-screen bg-gray-100">
      <div className="container py-10 px-15">
        {cartProducts.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {cartProducts.map((p) => (
              <div
                key={p.ISBN}
                className="md:container md:mx-auto bg-[#fef3ed] flex items-center p-4 shadow-lg rounded-lg"
              >
                <img
                  className="w-16 h-24 object-cover rounded"
                  src={p.book_cover_url}
                  alt={p.book_title}
                />
                <div className="ml-4 flex-1">
                  <p className="text-gray-600 text-lg">{p.author}</p>
                  <Link to="">
                    <p className="text-gray-800 font-bold ">{p.book_title}</p>
                  </Link>

                  <div className="flex items-center mt-2">
                    <ItemCount
                      counter={p.quantity}
                      onAdd={() => handleAddToCart(p)}
                      onSubtract={() => handleSubtractFromCart(p.ISBN)}
                      onChange={(value) => handleChangeCartAmount(p, value)}
                    />
                    <div className="font-bold text-lg ml-auto">
                      ${Math.max(0, p.quantity * p.price).toFixed(2)}
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(p.ISBN))}
                      className="bg-[#fef3ed] hover:bg-orange-0 py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400 ml-2"
                    >
                      <IoTrashOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <p className="text-gray-800">Your cart is empty.</p>
          </div>
        )}
      </div>

      <div className="bg-white p-4 fixed bottom-0 w-full border-t border-gray-300">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-lg">
            Total books: {Math.max(0, cartCounter)}
          </div>
          <div className="font-bold text-lg">
            Total price: ${Math.max(0, cartTotalPrice).toFixed(2)}
          </div>
          <Link
            to="/checkout"
            className={`bg-cyan-0 hover:bg-green-700 text-white py-2 px-4 rounded-lg ${
              cartCounter === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <span className="ml-1">Checkout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
