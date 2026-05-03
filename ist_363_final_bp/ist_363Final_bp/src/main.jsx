import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetail from './pages/PokeDetail';
import Favorites from './pages/Pokefav';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/favorites" element={<Favorites />} />
        </Routes>
    </BrowserRouter>
);