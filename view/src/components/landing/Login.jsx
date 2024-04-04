import React from 'react'
import { Link } from 'react-router-dom'

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
            <p>Don't have an account? <Link to="/register" onClick={() => setCurrentPage('register')}>Register</Link></p>
        </div>
    )
}