import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Login.css';
import sha256 from 'crypto-js/sha256'

export function Login() {
    const [loginTag, setLoginTag] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    const handleLoginTag = (event) => {
        setLoginError('')
        setLoginTag(event.target.value)
    }

    const handleLoginPassword = (event) => {
        setLoginError('')
        setLoginPassword(event.target.value)
    }

    const handleLogin = async () => {
        if (loginTag === '' || loginPassword === '') {
            setLoginError("Tag and password can't be empty")
            return
        }

        try {
            const hashedPassword = sha256(loginPassword).toString()
            const response = await fetch(`https://api.forkkies.live/logbusiness?tag=${loginTag}&password=${hashedPassword}`)
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('session_token', data.token)
                window.location.href = '/dashboard'
            } else {
                setLoginError('Tag and password do not match')
            }
        } catch (error) {
            console.error('Error:', error.message)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleLogin()
    }

    // useEffect(() => {
    //     if (localStorage.getItem('session_token') !== null) {
    //         window.location.href = '/dashboard'
    //     }
    // }, [])

    return (
        <div className='login-div'>
            <h2 className='login-title'>FORKKIES</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <p className='login-error'>{loginError}</p>
                <input type="text" placeholder='business tag' className={`login-input ${loginError !== '' ? 'wrong' : ''}`} value={loginTag} onChange={handleLoginTag} />
                <input type="password" className={`login-input ${loginError !== '' ? 'wrong' : ''}`} placeholder='business password' value={loginPassword} onChange={handleLoginPassword} />
                <button type="submit" className='login-button'>Next</button>
            </form>
            <p className='login-register-link'>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
    )
}
