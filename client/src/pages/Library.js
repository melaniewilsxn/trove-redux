import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import BookCard from '../components/BookInfo';
import LibraryBookList from '../components/LibraryBookList';

function Library(){
    const { libraryID } = useParams();

    return (
        <div>
            <h1>Library {libraryID}</h1>
            <LibraryBookList libraryID={libraryID}/>
        </div>
    )
}

export default Library