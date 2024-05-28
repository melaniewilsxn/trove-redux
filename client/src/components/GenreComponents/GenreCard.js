import React, { useState } from "react";
import { Card } from 'semantic-ui-react'
import GenreBookList from "./GenreBookList";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function GenreCard({ genre }){
    const history = useHistory()

    const colors = [
        '#55A891',
        '#27856A',
        '#5F8109',
        '#F037A5',
        '#AF2896',
        '#477D95',
        '#509BF5',
        '#1D3164',
        '#E8115B',
        '#E13300',
        '#BA5D07',
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    // Define styles for the card
    const cardStyle = {
        backgroundColor: color, // Set the background color to the randomly selected color
        width: '175px', // Set a fixed width for square shape
        height: '175px', // Set a fixed height for square shape
        display: 'flex', // Use flexbox for centering content
        alignItems: 'center', // Center content vertically
        color: 'black', // Set text color (adjust as needed for readability)
    };

    function handleClick() {
        history.push(`/discover/${encodeURIComponent(genre.name)}`)
    }

    return(
        <Card style={cardStyle} onClick={handleClick}>
            <Card.Content>
                <Card.Header style={{ color: 'white', textAlign: 'center' }}>{genre.name}</Card.Header>
            </Card.Content>
        </Card>
    )
}

export default GenreCard