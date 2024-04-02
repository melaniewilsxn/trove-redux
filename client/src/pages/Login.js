import React from 'react'
import { useState } from "react";
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { Container } from 'semantic-ui-react'

function Login({ onLogin }){
    const [showLogin, setShowLogin] = useState(true);
    return (
        <Container>
            {showLogin ? <LoginForm setShowLogin={setShowLogin} onLogin={onLogin}/> : <SignUpForm setShowLogin={setShowLogin} onLogin={onLogin}/>}
        </Container>
    )
}

export default Login