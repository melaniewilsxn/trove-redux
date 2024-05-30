import React from "react";
import { Card, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function BookCard({book}){
    const navigate = useNavigate()

    function handleCLick() {
        navigate(`/books/${encodeURIComponent(book.id)}`)
    }

    return (
        <Card onClick={handleCLick}>
            <Card.Content>
                <Image src={book.cover_image_url} style={{ padding: '5px'}}/>
                <Card.Header style={{ fontFamily: 'Bagel Fat One'}}>{book.title}</Card.Header>
                <Card.Meta style={{ fontFamily: 'Bagel Fat One'}}>{book.author}</Card.Meta>
            </Card.Content>
        </Card>
    )
}

export default BookCard