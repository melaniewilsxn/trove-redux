import React from "react";
import { Container, Segment, Header } from 'semantic-ui-react';

function Account({ user }){
    return(
        <Container text>
        <Header as='h1' textAlign='center' style={{color: 'white', fontFamily: 'Bagel Fat One', fontSize: '50px'}}>Account</Header>
        <Segment padded='very' style={{ marginTop: '2em' }}>
            <Header as='h2' style={{ fontFamily: 'Bagel Fat One', fontSize: '25px' }}>Name:</Header>
            <span>{user.first_name} {user.last_name}</span>
            <Header as='h2' style={{ fontFamily: 'Bagel Fat One', fontSize: '25px' }}>Username:</Header>
            <span>{user.username}</span>
            <Header as='h2' style={{ fontFamily: 'Bagel Fat One', fontSize: '25px' }}>Email:</Header>
            <span>{user.email}</span>
        </Segment>
    </Container>
    )
}

export default Account