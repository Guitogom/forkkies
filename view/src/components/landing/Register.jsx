import React from 'react'
import { Link } from 'react-router-dom'

export function Register({ setCurrentPage }) {
    const handleRegister = () => {
        setCurrentPage('dashboard')
    }

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleRegister}>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login" onClick={() => setCurrentPage('login')}>Login</Link></p>
        </div>
    )
}