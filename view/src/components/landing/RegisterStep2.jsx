import { useState, useEffect } from 'react'

export function RegisterStep2({ setCurrentStep, setDivHeight, divHeight }) {
    const handleRegister = () => {
        setDivHeight("zero")
        setCurrentStep(3)
    }

    const handleGoBack = () => {
        setDivHeight("zero")
        setCurrentStep(1)
        setTimeout(() => {
            setDivHeight("full")
        }, 400)
    }

    return (
        <form className={`register-form ${divHeight}`}>
            <button className='register-back' onClick={handleGoBack}>Go Back</button>
            <input type="password" name="" id="password" placeholder='create a business password...' className='register-input' />
            <input type="password" name="" id="repeat-password" placeholder='repeat the business password...' className='register-input' />
            <button className='register-button' onClick={handleRegister}>Next</button>
        </form>
    )
}