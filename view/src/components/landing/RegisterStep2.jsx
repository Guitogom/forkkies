import { useState, useEffect } from 'react'
import { CheckSVG } from '../../assets/svg/CheckSVG'
import { WarnSVG } from '../../assets/svg/WarnSVG'

export function RegisterStep2({ setCurrentStep, setDivHeight, divHeight, setPassword, handleRegisterBusiness }) {
    const [passwordProvisional, setPasswordProvisional] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')


    const handlePassword = (e) => {
        setPasswordProvisional(e.target.value)
    }

    const handleRepeatPassword = (e) => {
        setRepeatPassword(e.target.value)
    }

    const handleGoBack = () => {
        setDivHeight("zero")
        setCurrentStep(1)
        setTimeout(() => {
            setDivHeight("full")
        }, 400)
    }

    return (
        <div className={`register-form ${divHeight}`}>
            <button className='register-back' onClick={handleGoBack}>Go Back</button>
            <input type="password" name="" id="password" placeholder='create a business password...' className='register-input' onInput={handlePassword} />
            <input type="password" name="" id="repeat-password" placeholder='repeat the business password...' className='register-input' onInput={handleRepeatPassword} />
            <div className="password-feedback"><CheckSVG /><WarnSVG /></div>
            <button className='register-button' onClick={handleRegisterBusiness}>Next</button>
        </div>
    )
}