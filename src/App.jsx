import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import BookList from "./views/List/BookList";
import Detail from "./views/Detail/Detail";
import About from "./components/About/About";
import arrayBestSellers from "./data/arrayBestSellers";
import AdminStockForm from "./views/AdminStock/AdminStockForm";
import CreateBookForm from "./views/CreateBook/CreateBookForm";
import ShowSearchByName from "./views/ShowSearchByName/ShowSearchByName";
import Cart from "./views/Cart/Cart";
import ShowFilterByGenre from "./views/ShowFilterByGenre/ShowFilterByGenre";
/* import Checkout from "./components/Checkout/Checkout"; */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBooks, updateCartFromStorage } from "./redux/actions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const cartItems = localStorage.getItem("cart");
        if (cartItems) {
            const parsedCartItems = JSON.parse(cartItems);
            dispatch(updateCartFromStorage(parsedCartItems));
        }
        dispatch(getBooks());
    }, [dispatch]);

    return (
        <div className="App flex flex-col text-3xl font-poppins">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home books={arrayBestSellers} />} />
                <Route path="/aboutus" element={<About />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/detail/:isbn" element={<Detail />} />
                <Route path="/admin_stock" element={<AdminStockForm />} />
                <Route path="/create_book" element={<CreateBookForm />} />
                <Route path="/searchbook" element={<ShowSearchByName />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route path="/filterbook/:genre" element={<ShowFilterByGenre />} />
                {/* <Route exact path="/checkout" element={<Checkout />} /> */}
            </Routes>
        </div>
    );
}

export default App;
