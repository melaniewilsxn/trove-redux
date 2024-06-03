import React from 'react';
import { Container, Header, Divider, Segment, Grid, GridColumn, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home(){
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user);

    return (
        <Container text>
            <Header as='h1' textAlign='center' style={{color: 'white', fontFamily: 'Bagel Fat One', fontSize: '50px'}} >Welcome back to Trove, {user.first_name}!</Header>
            <Divider />
            <Segment padded='very'>
                <Grid columns={3} relaxed>
                    <GridColumn>
                        <Button fluid onClick={() => navigate(`/books`)}>Browse Books</Button>
                    </GridColumn>
                    <GridColumn>
                        <Button fluid onClick={() => navigate(`/library`)}>Your Library</Button>
                    </GridColumn>
                    <GridColumn>
                        <Button fluid onClick={() => navigate(`/discover`)}>Discover Genres</Button>
                    </GridColumn>
                </Grid>
            </Segment>
            <Divider />
            <Header as='h2' textAlign='center' style={{color: 'white', fontFamily: 'Bagel Fat One', fontSize: '25px'}}>Explore, Read, and Enjoy!</Header>
            <Divider hidden />
            <Segment textAlign='center'>
                This is a simple book management system where you can manage and review your favorite books.
            </Segment>
            <Divider hidden />
            <Segment textAlign='center' color='grey'>
                © 2024 Trove. All Rights Reserved.
            </Segment>
        </Container>
    )
}

export default Home