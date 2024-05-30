import React from "react";
import { Card } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

function LibraryCard({ library }){
    const navigate = useNavigate()

    const colorPairs = [
        { background: '#55A891', font: '#c030fc' },
        { background: '#27856A', font: '#07004D' },
        { background: '#5F8109', font: '#2b0981' },
        { background: '#F037A5', font: '#66f4a0' },
        { background: '#AF2896', font: '#71eaf7' },
        { background: '#477D95', font: '#001C55' },
        { background: '#509BF5', font: '#f28f18' },
        { background: '#1D3164', font: '#FF6590' },
        { background: '#E8115B', font: '#115be8' },
        { background: '#eb230d', font: '#00aee1' },
        { background: '#f68217', font: '#FFFFFF' },
    ];

    const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];

    // Define styles for the card
    const cardStyle = {
        backgroundColor: colorPair.background,
        width: '188px', // Set a fixed width for square shape
        height: '188px', // Set a fixed height for square shape
        display: 'flex', // Use flexbox for centering content
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        color: colorPair.font, // Set text color to the selected font color
        textAlign: 'center', // Center text inside the card
    };

    // Define styles for the content to center the text
    const contentStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    };

    function handleClick() {
        navigate(`/library/${encodeURIComponent(library.id)}`)
    }

    return(
        <Card style={cardStyle} onClick={handleClick}>
            <Card.Content style={contentStyle}>
                <Card.Header style={{ color: colorPair.font, textAlign: 'center', fontFamily: 'Bagel Fat One', fontSize: '30px' }}>{library.name}</Card.Header>
            </Card.Content>
        </Card>
    )
}

export default LibraryCard