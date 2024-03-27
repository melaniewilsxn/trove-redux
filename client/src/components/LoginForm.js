import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function LoginForm({ setShowLogin, onLogin }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password, }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => console.log("login failed"));
          }
        });
      }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image src='trove.png' size="massive"/>
                <Header as="h2" style={{ color: '#5E793C' }} textAlign='center'> 
                    Log-in to your account
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
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
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='#' onClick={() => setShowLogin(false)}>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default LoginForm