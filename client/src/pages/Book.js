import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import BookInfo from '../components/BookInfo';

function Book(){
    const { bookID } = useParams()

    return (
        <div>
            <BookInfo id={parseInt(bookID)}/>
        </div>
    )
}

export default Book