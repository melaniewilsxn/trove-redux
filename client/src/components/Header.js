import React from 'react'
import { Button, Form, Grid, Image, Message, Segment } from 'semantic-ui-react'

function Header({user, onLogout}){
    return (
        <Grid padded className="app-header">
            <Grid.Row>
                <Grid.Column width={8} verticalAlign="middle">
                    <Image src="trove.png" size="small" />
                </Grid.Column>
                <Grid.Column width={8} textAlign="right">
                    <Image src={user.image_url} avatar />
                    <span>{user.username}</span>
                <Button onClick={onLogout} style={{ color: '#5E793C' }}>Logout</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Header