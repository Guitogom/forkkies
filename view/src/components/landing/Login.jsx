import React from 'react'

export function Login({ setCurrentPage }) {
    const handleLogin = () => {
        setCurrentPage('dashboard')
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <span onClick={() => setCurrentPage('register')}>Register</span></p>
        </div>
    )
}