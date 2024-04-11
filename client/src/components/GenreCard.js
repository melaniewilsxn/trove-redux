import React from "react";
import { Card } from 'semantic-ui-react'

function GenreCard({ genre }){
    const colors = [
        '#fa1b23', // red
        '#f53f02', // orange
        '#001252', // deep blue
        '#0053fa', // bright blue
        '#01452c', // deep teal
        '#8041bf', // light purple
        '#6C8EBF', // dusty blue
        '#e802ba', // bright pink
        '#4c0d8c', // dark violet
        '#058205', // bright green
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
                <Card.Header style={{ color: 'white', textAlign: 'center' }}>{genre.name}</Card.Header>
            </Card.Content>
        </Card>
    )
}

export default GenreCard