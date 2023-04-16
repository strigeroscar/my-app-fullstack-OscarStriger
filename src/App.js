import { Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './pages/Home.js'
import Pokemon from './pages/pokemon.js'
function App() {
  return (
    <>
        <nav>
            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/pokemon'}>Pokemon</Link>
                </li>
            </ul>
        </nav>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pokemon" element={<Pokemon />} />
    </Routes>
    </>
)
}

export default App;
