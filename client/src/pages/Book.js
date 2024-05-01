import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import BookCard from '../components/BookCard';

function Book(){
    const { bookID } = useParams();

    return (
        <div>
            <BookCard id={bookID}/>
        </div>
    )
}

export default Book