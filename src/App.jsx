import { Route, Routes } from 'react-router-dom';
import Landing from './views/Landing/Landing';

function App() {
  return (
    <div className="text-3xl font-bold underline">
      <Routes>
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </div>
  )
}

export default App
