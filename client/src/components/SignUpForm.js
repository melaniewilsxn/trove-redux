import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function SignUpForm({ setShowLogin, onLogin }){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            username,
            password,
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => console.log("new user not successful"));
          }
        });
      }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image src='trove.png' size="massive"/>
                <Header as="h2" style={{ color: '#5E793C' }} textAlign='center'> 
                    Sign Up
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input fluid icon='chevron right' iconPosition='left' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
                        <Form.Input fluid icon='chevron right' iconPosition='left' placeholder='Lase Name' onChange={(e) => setLastName(e.target.value)}/>
                        <Form.Input fluid icon='mail' iconPosition='left' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button style={{ color: '#5E793C' }} fluid size='large' type="submit">
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