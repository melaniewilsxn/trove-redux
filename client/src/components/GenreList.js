import React, { useState, useEffect } from 'react'
import GenreCard from './GenreCard';
import { CardGroup, Container, Divider, Segment, Button } from 'semantic-ui-react'

function GenreList(){
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        fetch("/genres")
        .then((r) => r.json())
        .then(genres => setGenreList(genres));
    }, []);

    const displayeGenres = genreList.map((genre) => {
        return <GenreCard genre={genre} key={genre.id}/>
    })

    return (
        <CardGroup itemsPerRow={4}>
            {displayeGenres}
        </CardGroup>
    )
}

export default GenreList