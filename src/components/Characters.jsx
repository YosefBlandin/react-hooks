import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react';
import useCharacters from "../hooks/useCharacters.js";
import Search from "./Search";

import "../styles/components/Characters.css";

const API = "https://rickandmortyapi.com/api/character/"
const initialState = {
    favorites: []
};

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_FAVORITE":
            const exist = state.favorites.find(e => e.id === action.payload.id)
            if (exist) {
                return { ...state }
            } else {
                return {
                    ...state,
                    favorites: [...state.favorites, action.payload]
                }
            }

        default:
            return state;
    }
}

const Characters = () => {
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] = useState("");
    const searchInput = useRef(null);

    const characters = useCharacters(API);

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
        <>
            <ul className="Characters__favorites">
                <p>Favorites characters: </p>
                {favorites.favorites.map(favorite => (
                    <li key={favorite.id}>
                        {favorite.name}
                    </li>
                ))}
            </ul>
            <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />
            <div className="Characters">

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
        </>
    )
}

export default Characters