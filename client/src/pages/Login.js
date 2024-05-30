import React, { useState } from 'react';
import LoginForm from '../components/UserForms/LoginForm';
import SignUpForm from '../components/UserForms/SignUpForm';

function Login({ onLogin }){
    const [showLogin, setShowLogin] = useState(true);
    return (
        <div style={{ backgroundColor: "black", height: '100%'}}>
            {showLogin ? <LoginForm setShowLogin={setShowLogin} onLogin={onLogin}/> : <SignUpForm setShowLogin={setShowLogin} onLogin={onLogin}/>}
        </div>
    )
}

export default Login