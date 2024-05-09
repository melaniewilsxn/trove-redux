import React, { useEffect, useState } from "react";
import { CardGroup } from "semantic-ui-react";
import BookCard from "./BookCard";

function GenreBookList({ genreName }){
    const [bookList, setBookList] = useState([])

    useEffect(() => {
        fetch(`/genres/${genreName}`)
        .then(r => r.json())
        .then(books => setBookList(books))
    }, [])

    return (
        <CardGroup>
            {bookList.map((book) => <BookCard book={book} key={book.id}/>)}
        </CardGroup>
    )
}

export default GenreBookList