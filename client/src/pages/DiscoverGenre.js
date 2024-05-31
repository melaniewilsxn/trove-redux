import React from 'react';
import { useParams } from 'react-router-dom';
import GenreBookList from '../components/GenreComponents/GenreBookList';

function DiscoverGenre(){
    const { genreName } = useParams();

    return (
        <div>
            <h1 style={{ fontFamily: 'Bagel Fat One', fontSize: '50px'}}>{decodeURIComponent(genreName)}</h1>
            <GenreBookList genreName={genreName}/>
        </div>
    )
}

export default DiscoverGenre