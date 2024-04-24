import React from 'react'
import { useState } from "react";
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { Container } from 'semantic-ui-react'

function Login({ onLogin }){
    const [showLogin, setShowLogin] = useState(true);
    return (
        <div style={{ backgroundColor: "black", height: '100%'}}>
            {showLogin ? <LoginForm setShowLogin={setShowLogin} onLogin={onLogin}/> : <SignUpForm setShowLogin={setShowLogin} onLogin={onLogin}/>}
        </div>
    )
}

export default Login