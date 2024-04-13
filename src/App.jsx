import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import About from "./components/About/About"
import Cards from "./components/Cards/Cards"

function App() {
    return (
        <div className="text-3xl font-poppinds text-orange-0 mx-5">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Cards />} />
                <Route path="/aboutus" element={<About />} />
            </Routes>
        </div>
    );
};

export default App;
