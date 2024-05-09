import React, { useState } from "react";
import { Card } from 'semantic-ui-react'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LibraryCard({ library }){
    const history = useHistory()

    // Define styles for the card
    const cardStyle = {
        backgroundColor: '#A9A9A9', // Set the background color to the randomly selected color
        width: '175px', // Set a fixed width for square shape
        height: '175px', // Set a fixed height for square shape
        display: 'flex', // Use flexbox for centering content
        alignItems: 'center', // Center content vertically
        color: 'black', // Set text color (adjust as needed for readability)
    };

    function handleClick() {
        history.push(`/library/${encodeURIComponent(library.id)}`)
    }

    return(
        <Card style={cardStyle} onClick={handleClick}>
            <Card.Content>
                <Card.Header style={{ color: 'white', textAlign: 'center' }}>{library.name}</Card.Header>
            </Card.Content>
        </Card>
    )
}

export default LibraryCard