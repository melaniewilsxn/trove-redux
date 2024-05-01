import React, { useEffect, useState } from "react";
import { Segment, Image, HeaderSubheader, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function BookCard({ id }){
    const [book, setBook] = useState()

    useEffect(() => {
        fetch(`/books/${id}`)
        .then(r => r.json())
        .then(book => setBook(book))
    }, [])

    return (
        <Segment>
            {book ? 
            <div class="ui two column very relaxed grid">
                <div class="column">
                    <Image src={book.cover_image_url}/>
                </div>
                <div class="column">
                    <h1 class="ui header">
                        <div class="content">
                            {book.title}
                            <div class="sub header">{book.author}</div>
                        </div>
                    </h1>
                    <p>{book.summary}</p>
                </div>
                <div class="ui vertical divider"></div>
            </div>
            : null}
        </Segment>
    )
}

export default BookCard