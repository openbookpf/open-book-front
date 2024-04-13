import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import BookList from "./views/List/BookList";
import Detail from "./views/Detail/Detail";
import About from "./components/About/About"
import Cards from "./components/Cards/Cards"

function App() {
    return (
        <div className="App flex text-3xl font-poppins mx-5">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Cards />} />
                <Route path="/aboutus" element={<About />} />
                <Route path="/libros" element={<BookList />} />
                <Route path="/detail/:isbn" element={<Detail />} />
            </Routes>
        </div>
    );
};


export default App;
