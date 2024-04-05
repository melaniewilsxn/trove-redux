import React from "react";
import { Card } from 'semantic-ui-react'

function GenreCard({ genre }){
    const colors = [
        '#C94C4C', // red
        '#D9A760', // orange
        '#D9D760', // yellow
        '#5E793C', // earthy green
        '#8FB586', // olive green
        '#CBF0F8', // light blue
        '#6C8EBF', // dusty blue
        '#4B5D7E', // soft indigo
        '#9E7BB5', // muted violet
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

    return(
        <Card style={cardStyle}>
            <Card.Content>
                <Card.Header style={{ color: 'black', textAlign: 'left' }}>{genre.name}</Card.Header>
            </Card.Content>
        </Card>
    )
}

export default GenreCard