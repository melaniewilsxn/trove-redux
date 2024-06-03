import React from 'react';
import { useParams } from 'react-router-dom';
import BookInfo from '../components/BookComponents/BookInfo';

function Book(){
    const { bookID } = useParams()

    return (
        <div>
            <BookInfo id={bookID} />
        </div>
    )
}

export default Book