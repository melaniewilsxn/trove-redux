import React, { useEffect, useState } from "react";
import { Card, Image } from "semantic-ui-react";

function GenreBookCard({book}){

    return (
        <Card>
            <Card.Content>
                <Image src={book.cover_image_url}/>
                <Card.Header>{book.title}</Card.Header>
                <Card.Meta>{book.author}</Card.Meta>
            </Card.Content>
        </Card>
    )
}

export default GenreBookCard