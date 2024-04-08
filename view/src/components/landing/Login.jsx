import React from 'react'
import '../../styles/Login.css'

export function Login({ setCurrentPage }) {
    const handleLogin = () => {
        setCurrentPage('dashboard')
    }

    return (
        <div className='login-div'>
            <h2 className='login-title'>FORKKIES</h2>
            <form className='login-form'>
                <input type="text" placeholder='business tag' className='login-input' />
                <input type="password" className='login-input' placeholder='business password' />
                <button onClick={handleLogin} className='login-button'>Next</button>
            </form>
            <p className='login-register-link'>Don't have an account? <span onClick={() => setCurrentPage('register')}>Register</span></p>
        </div>
    )
}