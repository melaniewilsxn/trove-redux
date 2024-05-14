import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import BookInfo from '../components/BookInfo';

function Book({ user }){
    const { bookID } = useParams()

    return (
        <div>
            <BookInfo id={bookID} user={user}/>
        </div>
    )
}

export default Book