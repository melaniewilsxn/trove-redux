import React, { useState, useEffect } from 'react';
import GenreCard from './GenreCard';
import { CardGroup } from 'semantic-ui-react';

function GenreList(){
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        fetch("/genres")
        .then((r) => r.json())
        .then(genres => setGenreList(genres));
    }, []);

    return (
        <CardGroup itemsPerRow={4}>
            {genreList.map((genre) => <GenreCard genre={genre} key={genre.id}/>)}
        </CardGroup>
    )
}

export default GenreList