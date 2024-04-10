import { Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="text-3xl font-bold underline">
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
    </div>
  )
}

export default App