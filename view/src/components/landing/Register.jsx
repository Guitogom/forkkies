import React from 'react'

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
            <p>Already have an account? <span onClick={() => setCurrentPage('login')}>Login</span></p>
        </div>
    )
}