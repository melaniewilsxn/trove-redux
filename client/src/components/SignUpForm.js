import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function SignUpForm({ setShowLogin }){
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image src='trove.png' size="massive"/>
                <Header as="h2" style={{ color: '#5E793C' }} textAlign='center'> 
                    Sign Up
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='mail' iconPosition='left' placeholder='Email' />
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />
                        <Button style={{ color: '#5E793C' }} fluid size='large'>
                            Create Account
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already have an account? <a href='#' onClick={() => setShowLogin(true)}>Login</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default SignUpForm