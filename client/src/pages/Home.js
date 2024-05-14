import React from 'react'
import { Container, Header, Divider, Segment, Grid, GridColumn, Button } from 'semantic-ui-react'

function Home(){
    return (
        <Container text>
            <Header as='h1' textAlign='center' style={{color: 'white'}}>Welcome back to Trove!</Header>
            <Divider />
            <Segment padded='very'>
                <Grid columns={3} relaxed>
                    <GridColumn>
                        <Button fluid style={{color: '#55A891'}} href="/books">Browse Books</Button>
                    </GridColumn>
                    <GridColumn>
                        <Button fluid style={{color: '#27856A'}} href="/library">Your Library</Button>
                    </GridColumn>
                    <GridColumn>
                        <Button fluid style={{color: '#5F8109'}} href="/discover">Discover Genres</Button>
                    </GridColumn>
                </Grid>
            </Segment>
            <Divider />
            <Header as='h2' textAlign='center' style={{color: 'white'}}>Explore, Read, and Enjoy!</Header>
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