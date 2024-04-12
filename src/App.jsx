import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import BookList from "./views/List/BookList";
import Detail from "./views/Detail/Detail";

function App() {
  return (
    <div className="App flex text-3xl font-poppins mx-5">
      <NavBar />
      <Routes>
        <Route path="/detail/:isbn" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path="/libros" element={<BookList />} />
      </Routes>
    </div>
  );
}

export default App;
