import React from 'react';
import GenreList from '../components/GenreComponents/GenreList';

function Discover(){

    return (
        <div>
            <h1 style={{ fontFamily: 'Bagel Fat One', fontSize: '50px'}}>Browse Books</h1>
            <GenreList />
        </div>
    )
}

export default Discover