import { useState, useEffect } from 'react'
import { CheckSVG } from '../../assets/svg/CheckSVG'
import { WarnSVG } from '../../assets/svg/WarnSVG'
import sha256 from 'crypto-js/sha256'


export function RegisterStep2({ setCurrentStep, setDivHeight, divHeight, setPassword, handleRegisterBusiness }) {
    const [passwordProvisional, setPasswordProvisional] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(false)

    const [passwordMistake, setPasswordMistake] = useState('')
    const [repeatMistake, setRepeatMistake] = useState('')


    const handlePassword = (e) => {
        setPasswordMistake('')
        setPasswordProvisional(e.target.value)
    }

    const handleRepeatPassword = (e) => {
        setRepeatMistake('')
        setRepeatPassword(e.target.value)
    }

    const handleGoBack = () => {
        setDivHeight("zero")
        setCurrentStep(1)
        setTimeout(() => {
            setDivHeight("full")
        }, 400)
    }

    const handleCheckRegister = () => {
        let hasError = false

        if (passwordProvisional === '') {
            setPasswordMistake("Password can't be empty")
            hasError = true
        }

        if (repeatPassword === '') {
            setRepeatMistake("Repeat password can't be empty")
            hasError = true
        }

        if (!passwordMatch) {
            setRepeatMistake("Passwords don't match")
            hasError = true
        }

        if (hasError) return

        handleRegisterBusiness()
    }


    useEffect(() => {
        if (passwordProvisional === repeatPassword && passwordProvisional.length > 0) {
            setPasswordMatch(true)
            const hashedPassword = sha256(passwordProvisional).toString()
            console.log('Password: ', hashedPassword)
            setPassword(hashedPassword)
        } else {
            setPasswordMatch(false)
        }
    }, [passwordProvisional, repeatPassword])

    return (
        <div className={`register-form ${divHeight}`}>
            <button className='register-back' onClick={handleGoBack}>Go Back</button>
            <p className='register-password-text'>Password must have 8 digits</p>
            <input type="password" name="" id="password" placeholder='create a business password...' className={`register-input ${passwordMistake !== '' ? 'wrong' : ''}`} onInput={handlePassword} />
            <p className="mistake-error">{passwordMistake}</p>
            <input type="password" name="" id="repeat-password" placeholder='repeat the business password...' className={`register-input ${repeatMistake !== '' ? 'wrong' : ''}`} onInput={handleRepeatPassword} />
            <p className="mistake-error">{repeatMistake}</p>
            <div className="password-feedback">{passwordMatch ? <CheckSVG /> : <WarnSVG />}</div>
            <button className='register-button' onClick={handleCheckRegister}>Next</button>
        </div>
    )
}