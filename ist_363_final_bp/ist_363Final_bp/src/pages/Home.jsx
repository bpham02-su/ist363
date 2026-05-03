import React, { useState, useEffect } from 'react';
import styles from "./Home.module.css";
import { useNavigate } from 'react-router-dom'

function Home(){

    const [pokemon1, setPokemon1] = useState([]);
    const [pokemon2, setPokemon2] = useState([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const getRandomIds = () => {
        const ids = [];
        while (ids.length < 5) {
            const randomId = Math.floor(Math.random() * 1025) + 1;
            if (!ids.includes(randomId)) ids.push(randomId); 
        }
        return ids;
    };

    const navigate = useNavigate();

    const fetchPokemon = async () => {
        setLoading(true);

    const [results1, results2] = await Promise.all([
        Promise.all(getRandomIds().map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()))),
        Promise.all(getRandomIds().map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())))
    ]);

    setPokemon1(results1);
    setPokemon2(results2);
    setLoading(false);
};

    useEffect(() => {
    if (query.length < 2) {
        setSearchResults([]);
        return;
    }

    const timeout = setTimeout(async () => {
        setSearching(true);
        try {
    
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
            const data = await res.json();
            const filtered = data.results
                .filter(p => p.name.includes(query.toLowerCase()))
                .slice(0, 8); 
            setSearchResults(filtered);
        } catch (err) {
            console.error(err);
        }
        setSearching(false);
    }, 300); 

    return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        fetchPokemon();
    }, []); 




    return (
        <>
            <header className={`pt-4 pb-4 ${styles.reco_header}`}>
                <div className = "text-center">
                    
                <h1 className={`navbar-brand ${styles.reco_title}`}>PokeInfo</h1>

                        
                </div>
            </header>

            <main className={styles.main}>
                <div className=" pt-5 pb-5">
                    <div className = "d-flex flex-column align-items-center">
                        <h1 className={"${styles.main_h1} mb-3 text-white"}>Welcome Trainer!</h1>
            
                        <div style={{ position: 'relative', width: '25%' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for Pokemon..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />

                        {(searchResults.length > 0 || searching) && (
                            <ul className="list-group" style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                zIndex: 999,
                                maxHeight: '300px',
                                overflowY: 'auto'
                            }}>
                                {searching && <li className="list-group-item">Searching...</li>}
                                {searchResults.map((p) => {
                                    const id = p.url.split('/').filter(Boolean).pop(); 
                                    return (
                                        <li
                                            key={p.name}
                                            className="list-group-item list-group-item-action d-flex align-items-center gap-2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                navigate(`/pokemon/${id}`);
                                                setQuery('');
                                                setSearchResults([]);
                                            }}
                                        >
                                            <img
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                                alt={p.name}
                                                width={40}
                                            />
                                            <span className="text-uppercase">{p.name}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                    <button 
                        className="btn btn-warning  text-uppercase fw-bold mt-3"
                        onClick={() => navigate('/favorites')}>
                    
                        ⭐ Favorites
                    </button>
          
                        

                    </div>
                    

                    {loading ? (
                        <p>Loading Pokémon...</p>
                    ) : (
                        <div className="d-flex flex-column flex-md-row justify-content-evenly align-items-center flex-wrap  mt-5">
                            {pokemon1.map((p) => (
                                <div key={p.id} onClick={() => navigate(`/pokemon/${p.id}`)} style={{ cursor: 'pointer' }}>
                                    <img src={p.sprites.other['official-artwork'].front_default} alt={p.name} width={150} />
                                    <p className="text-center fs-4 text-uppercase">{p.name}</p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
                <div className="text-center pt-5 pb-5">

                    {loading ? (
                        <p>Loading Pokémon...</p>
                    ) : (
                        <div className="d-flex flex-column flex-md-row justify-content-evenly flex-wrap">
                            {pokemon2.map((c) => (
                            <div key={c.id} onClick={() => navigate(`/pokemon/${c.id}`)} style={{ cursor: 'pointer' }}>
                                <img src={c.sprites.other['official-artwork'].front_default} alt={c.name} width={150} />
                                <p className="text-center fs-4 text-uppercase">{c.name}</p>
                            </div>
                        ))}
                        </div>
                    )}

                    <img src="../src/assets/Poke_Ball_.png" onClick={fetchPokemon}style={{ width: '100px', cursor: 'pointer' }}/>
                    <p>Click Here to Reroll!</p>
                </div>
            </main>

            <footer className={`d-flex justify-content-around ${styles.reco_footer}`}>
                <div className="mt-5 ms-5">
                    <p className="ms-2"> ©2025 PokeInfo</p>
                    <p>All Rights Reserved</p>
                </div>
                <div className={`mt-5 me-5 pt-1 pe-2 fs-2 ${styles.footer_deco}`}>
                    <a href="https://www.linkedin.com/in/bphamds" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>

                    <a href="https://github.com/bpham02-su" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-square-github"></i>
                    </a>
                    
                    
                </div>       
            </footer>
        </>
    )
}

export default Home;