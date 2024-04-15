import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import BookList from "./views/List/BookList";
import Detail from "./views/Detail/Detail";
import About from "./components/About/About";
import arrayLibros from "./data/arrayLibros";
import AdminStockForm from "./views/AdminStock/AdminStockForm";
import CreateBookForm from "./views/CreateBook/CreateBookForm";

function App() {
  return (
    <div className="App flex flex-col text-3xl font-poppins">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home books={arrayLibros} />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/" element={<BookList />} />
        <Route path="/detail/:isbn" element={<Detail />} />
        <Route path="/admin_stock" element={<AdminStockForm />} />
        <Route path="/create_book" element={<CreateBookForm />} />
      </Routes>
    </div>
  );
}

export default App;
