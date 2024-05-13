import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Segment, GridColumn } from 'semantic-ui-react'

function LoginForm({ setShowLogin, onLogin }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    
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
            r.json().then((err) => setError(err.error));
          }
        });
      }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <GridColumn style={{ maxWidth: 450 }}>
                <Segment inverted>
                  <Image src='http://localhost:3000/trove.png' size="massive"/>
                  <Header as="h2" textAlign='center'> 
                      Log-in to your account
                  </Header>
                </Segment>
                <Form size='large' onSubmit={handleSubmit} >
                    <Segment stacked inverted>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button fluid size='large' type="submit">
                            Login
                        </Button>
                        {error ? 
                          <div style={{ color: '#cc0000', marginTop: '10px'}}>{error}</div>
                        : null}
                    </Segment>
                </Form>
                <Segment inverted>
                    New to us? <a href='#' onClick={() => setShowLogin(false)}>Sign Up</a>
                </Segment>
            </GridColumn>
        </Grid>
    )
}

export default LoginForm