import React, { useEffect, useState } from "react";
import { CardGroup } from "semantic-ui-react";
import GenreBookCard from "./GenreBookCard";

function GenreBookList({ genreName }){
    const [bookList, setBookList] = useState([])

    useEffect(() => {
        fetch(`/genres/${genreName}`)
        .then(r => r.json())
        .then(books => setBookList(books))
    }, [])

    // bookList.map((book) => console.log(book))

    return (
        <CardGroup>
            {bookList.map((book) => <GenreBookCard book={book} key={book.id}/>)}
        </CardGroup>
    )
}

export default GenreBookList