import React from 'react'
import { useState } from "react";
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { Button, Container, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function Login(){
    const [showLogin, setShowLogin] = useState(true);
    return (
        <Container>
            {showLogin ? <LoginForm setShowLogin={setShowLogin}/> : <SignUpForm setShowLogin={setShowLogin}/>}
        </Container>
    )
}

export default Login