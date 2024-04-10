import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing/Landing';

function App() {
  return (
    <div className="text-3xl font-bold underline">
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App