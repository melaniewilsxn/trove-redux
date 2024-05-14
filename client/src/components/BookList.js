import React, { useEffect, useState } from "react";
import { CardGroup } from "semantic-ui-react";
import BookCard from "./BookCard";

function BookList({  }){
    const [bookList, setBookList] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetch(`/books`)
        .then(r => r.json())
        .then(books => setBookList(books))
    }, [])

    return (
        <CardGroup>
            {bookList.map((book) => <BookCard book={book} key={book.id}/>)}
        </CardGroup>
    )
}

export default BookList