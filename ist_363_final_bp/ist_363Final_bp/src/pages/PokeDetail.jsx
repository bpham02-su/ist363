import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PokemonDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const getPokemon = async () => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await res.json();
            setPokemon(data);
            setLoading(false);
        };
        getPokemon();
    }, [id]);

  
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favoritePokemon')) || [];
        setIsFavorite(favorites.some(p => p.id === parseInt(id)));
    }, [id]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favoritePokemon')) || [];

        if (isFavorite) {
   
            const updated = favorites.filter(p => p.id !== pokemon.id);
            localStorage.setItem('favoritePokemon', JSON.stringify(updated));
            setIsFavorite(false);
        } else {
    
            const newFav = {
                id: pokemon.id,
                name: pokemon.name,
                sprite: pokemon.sprites.other['official-artwork'].front_default,
                types: pokemon.types.map(t => t.type.name)
            };
            localStorage.setItem('favoritePokemon', JSON.stringify([...favorites, newFav]));
            setIsFavorite(true);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <button className="btn btn-danger" onClick={() => navigate(-1)}>← Back</button>
            <button
                className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'} fs-5`}
                onClick={toggleFavorite}
            >
                {isFavorite ? '⭐ Favorited!' : '☆ Add to Favorites'}
            </button>
        </div>


        <div className="text-center">
            <h1 className="text-uppercase fw-bold">#{pokemon.id} {pokemon.name}</h1>
            <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                width={300}
            />
            <div className="d-flex justify-content-center gap-2 mt-2">
                {pokemon.types.map(t => (
                    <span key={t.type.name} className="badge bg-success fs-6 text-uppercase">
                        {t.type.name}
                    </span>
                ))}
            </div>
        </div>

        <div className="row mt-5">

        
            <div className="col-md-6 mb-4">
                <h3 className="fw-bold">Base Info</h3>
                <table className="table table-bordered">
                    <tbody>
                        <tr><td>Height</td><td>{pokemon.height / 10} m</td></tr>
                        <tr><td>Weight</td><td>{pokemon.weight / 10} kg</td></tr>
                        <tr><td>Base Experience</td><td>{pokemon.base_experience}</td></tr>
                    </tbody>
                </table>
            </div>

       
            <div className="col-md-6 mb-4">
                <h3 className="fw-bold">Stats</h3>
                {pokemon.stats.map(s => (
                    <div key={s.stat.name} className="mb-2">
                        <div className="d-flex justify-content-between">
                            <span className="text-uppercase fw-semibold">{s.stat.name}</span>
                            <span>{s.base_stat}</span>
                        </div>
                        <div className="progress">
                            <div
                                className="progress-bar bg-success"
                                style={{ width: `${(s.base_stat / 255) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="col-md-6 mb-4">
                <h3 className="fw-bold">Abilities</h3>
                <ul className="list-group">
                    {pokemon.abilities.map(a => (
                        <li key={a.ability.name} className="list-group-item text-uppercase">
                            {a.ability.name} {a.is_hidden && <span className="badge bg-secondary">Hidden</span>}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="col-md-6 mb-4">
                <h3 className="fw-bold">Moves <span className="fs-6 text-muted">(first 20)</span></h3>
                <div className="d-flex flex-wrap gap-2">
                    {pokemon.moves.slice(0, 20).map(m => (
                        <span key={m.move.name} className="badge bg-primary text-uppercase">
                            {m.move.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="col-12 mb-4">
                <h3 className="fw-bold">Sprites</h3>
                <div className="d-flex gap-3 flex-wrap">
                    <div className="text-center">
                        <img src={pokemon.sprites.front_default} alt="front" width={100}/>
                        <p>Front</p>
                    </div>
                    <div className="text-center">
                        <img src={pokemon.sprites.back_default} alt="back" width={100}/>
                        <p>Back</p>
                    </div>
                    <div className="text-center">
                        <img src={pokemon.sprites.front_shiny} alt="shiny front" width={100}/>
                        <p>Shiny Front</p>
                    </div>
                    <div className="text-center">
                        <img src={pokemon.sprites.back_shiny} alt="shiny back" width={100}/>
                        <p>Shiny Back</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
    );
}

export default PokemonDetail;