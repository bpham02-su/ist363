import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pokefav.css'



function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('favoritePokemon')) || [];
        setFavorites(stored);
    }, []);

    const removeFavorite = (id) => {
        const updated = favorites.filter(p => p.id !== id);
        localStorage.setItem('favoritePokemon', JSON.stringify(updated));
        setFavorites(updated);
    };

    return (
        <div className="favoritesPage d-flex flex-column flex-md-row text-center">
        <div className="container mt-5 mb-5 text-center">
            <div className="d-flex align-items-center mb-4 justify-content-evenly">
                <button className="btn btn-danger" onClick={() => navigate('/')}>← Back to Home</button>
                <h1 className="text-uppercase fw-bold px-5text-dark">⭐ My Favorites</h1>
                <div></div>
            </div>

            {favorites.length === 0 ? (
                <div className="text-center mt-5">
                    <p className="fs-4">You haven't added any favorites yet!</p>
                    <button className="btn btn-success" onClick={() => navigate('/')}>
                        Go find some Pokémon!
                    </button>
                </div>
            ) : (
                <div className="d-flex flex-wrap justify-content-evenly gap-4 mt-4 text-dark">
                    {favorites.map(p => (
                        <div key={p.id} className="text-center" style={{ width: '180px' }}>
                            <img
                                src={p.sprite}
                                alt={p.name}
                                width={150}
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/pokemon/${p.id}`)}
                            />
                            <p className="text-uppercase fw-bold fs-5">{p.name}</p>
                            <div className="d-flex justify-content-center gap-1 mb-2">
                                {p.types.map(t => (
                                    <span key={t} className="badge bg-success text-uppercase">{t}</span>
                                ))}
                            </div>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeFavorite(p.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
}

export default Favorites;