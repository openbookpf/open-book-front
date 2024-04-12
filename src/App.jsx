import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import AdminStockForm from "./views/AdminStock/AdminStockForm";
import CreateBookForm from "./views/CreateBook/CreateBookForm";

function App() {
  return (
    <div className="text-3xl font-poppins text-cyan-0 flex justify-center content-center items-center">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin_stock" element={<AdminStockForm />} />
          <Route path="/create_book" element={<CreateBookForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
