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
            <button className='register-back' onClick={handleGoBack}>Back</button>
            <input type="password" name="" id="" placeholder='create a business password...' className='register-input' />
            <input type="password" name="" id="" placeholder='repeat the business password...' className='register-input' />
            <button className='register-button' onClick={handleRegister}>Next</button>
        </form>
    )
}