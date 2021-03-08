import React, { useState, useEffect, useReducer, useMemo, useRef, useCallback } from 'react';
import Search from "./Search";

import "../styles/components/Characters.css";

const initialState = {
    favorites: []
};

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_FAVORITE":
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        default:
            return state;
    }
}

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] = useState("");
    const searchInput = useRef(null);

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character/")
            .then(response => response.json())
            .then(data => setCharacters(data.results))
            .catch(err => console.error(err))
    }, []);

    const handleClick = favorite => {
        dispatch({ type: "ADD_TO_FAVORITE", payload: favorite })
    }

    // const handleSearch = () => {
    //     setSearch(searchInput.current.value);
    // }

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    }, [])

    // const filteredUsers = characters.filter(user => {
    //     return user.name.toLowerCase().includes(search.toLowerCase())
    // })

    const filteredUsers = useMemo(() =>
        characters.filter(user => {
            return user.name.toLowerCase().includes(search.toLowerCase())
        })
        , [characters, search])

    return (
        <div className="Characters">

            {favorites.favorites.map(favorite => (
                <li key={favorite.id}>
                    {favorite.name}
                </li>
            ))}
            <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

            {filteredUsers.map(character => (
                <article className="Character" key={character.id}>
                    <img className="Character__img" src={character.image} alt={character.name} />
                    <section className="Character__description">
                        <h2 className="Character__name">{character.name}</h2>
                        <p className="Character__status"><strong>Status:</strong> {character.status}</p>
                        <p className="Character__location"><strong>Location:</strong> {character.origin.name}</p>
                        <p className="Character__specie"><strong>Specie:</strong> {character.species}</p>
                        <p className="Character__gender"><strong>Gender:</strong> {character.gender}</p>
                        <button className="Character__button" type="button" onClick={() => handleClick(character)}>Add to Favorites</button>
                    </section>
                </article>
            ))}
        </div>
    )
}

export default Characters