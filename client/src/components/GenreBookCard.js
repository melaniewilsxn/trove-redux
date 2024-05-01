import React, { useEffect, useState } from "react";
import { Card, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function GenreBookCard({book}){
    const history = useHistory()

    function handleCLick() {
        history.push(`/books/${encodeURIComponent(book.id)}`)
    }

    return (
        <Card onClick={handleCLick}>
            <Card.Content>
                <Image src={book.cover_image_url} style={{ padding: '5px'}}/>
                <Card.Header>{book.title}</Card.Header>
                <Card.Meta>{book.author}</Card.Meta>
            </Card.Content>
        </Card>
    )
}

export default GenreBookCard