import { useState, useEffect } from "react";

const useCharacters = url => {
    const [characters, setCharacters] = useState([]);
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setCharacters(data.results))
            .catch(err => console.error(err))
    }, [url]);
    return characters;
};

export default useCharacters