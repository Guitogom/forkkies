import React, { useState } from 'react';
import '../../styles/Login.css';
import sha256 from 'crypto-js/sha256'

export function Login({ setCurrentPage }) {
    const [loginTag, setLoginTag] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLogin = async () => {
        try {
            const hashedPassword = sha256(loginPassword).toString()
            const response = await fetch(`http://147.182.207.78:3000/logbusiness?tag=${loginTag}&password=${hashedPassword}`)
            console.log(response)
            console.log(hashedPassword)
            if (response.ok) {
                setCurrentPage('dashboard');
            } else {
                setLoginError('Tag and password do not match');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <div className='login-div'>
            <h2 className='login-title'>FORKKIES</h2>
            <div className='login-form'>
                <p className='login-error'>{loginError}</p>
                <input type="text" placeholder='business tag' className='login-input' value={loginTag} onChange={(event) => setLoginTag(event.target.value)} />
                <input type="password" className='login-input' placeholder='business password' value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} />
                <button onClick={handleLogin} className='login-button'>Next</button>
            </div>
            <p className='login-register-link'>Don't have an account? <span onClick={() => setCurrentPage('register')}>Register</span></p>
        </div>
    );
}
