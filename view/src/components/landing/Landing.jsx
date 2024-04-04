import React from 'react'

export function Landing({ setCurrentPage }) {
    return (
        <header>
            <h1>Landing Page</h1>
            <span onClick={() => setCurrentPage('login')}>Login</span>
            <span onClick={() => setCurrentPage('register')}>Register</span>
        </header>
    )
}