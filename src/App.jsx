import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import BookList from "./views/List/BookList";

function App() {
  return (
    <div className="App flex text-3xl font-poppins text-orange-0 mx-5">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/libros" element={<BookList />} />
      </Routes>
    </div>
  );
}

export default App;
