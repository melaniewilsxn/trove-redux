import React from 'react';
import { useParams } from 'react-router-dom';
import BookInfo from '../components/BookComponents/BookInfo';

function Book({ user }){
    const { bookID } = useParams()

    return (
        <div>
            <BookInfo id={bookID} user={user}/>
        </div>
    )
}

export default Book