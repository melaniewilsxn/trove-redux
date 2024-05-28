import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import GenreBookList from '../components/GenreComponents/GenreBookList';

function DiscoverGenre(){
    const { genreName } = useParams();

    return (
        <div>
            <h1>{decodeURIComponent(genreName)}</h1>
            <GenreBookList genreName={genreName}/>
        </div>
    )
}

export default DiscoverGenre