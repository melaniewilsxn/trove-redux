import React from "react";
import { CardGroup } from "semantic-ui-react";
import BookCard from "../BookComponents/BookCard";

function LibraryBookList({ library }){
    const bookList = library.books

    return (
        <CardGroup>
            {bookList.map((book) => <BookCard book={book} key={book.id}/>)}
        </CardGroup>
    )
}

export default LibraryBookList