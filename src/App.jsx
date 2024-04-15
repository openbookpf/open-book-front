import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import BookList from "./views/List/BookList";
import Detail from "./views/Detail/Detail";
import About from "./components/About/About";
// import Cards from "./components/Cards/Cards";
import AdminStockForm from "./views/AdminStock/AdminStockForm";
import CreateBookForm from "./views/CreateBook/CreateBookForm";

function App() {
  return (
    <div className="App flex flex-col text-3xl font-poppins">
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/books" element={<Cards />} /> */}
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
