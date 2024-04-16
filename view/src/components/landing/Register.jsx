import { useState, useEffect } from 'react'
import '../../styles/Register.css'

import { RegisterStep1 } from './RegisterStep1.jsx'
import { RegisterStep2 } from './RegisterStep2.jsx'
import { RegisterStep3 } from './RegisterStep3.jsx'

export function Register({ setCurrentPage }) {
    const [currentStep, setCurrentStep] = useState(1)
    const [divHeight, setDivHeight] = useState("full")

    /* REGISTER BUSINESS */
    const [businessName, setBusinessName] = useState('')
    const [tag, setTag] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [businessType, setBusinessType] = useState('')
    const [password, setPassword] = useState('')

    const handleRegisterBusiness = async () => {
        try {
            const response = await fetch('http://147.182.207.78:3000/newbusiness', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: businessName,
                    tag: tag,
                    type: businessType,
                    tel: phoneNumber,
                }),
            })


            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('token', data.token)
                setDivHeight("zero")
                setCurrentStep(3)
                setTimeout(() => {
                    setDivHeight("full")
                }, 400)
            } else {
                console.error('Error al registrar el negocio:', response.statusText)
            }
        } catch (error) {
            console.error('Error al comunicarse con el servidor:', error.message)
        }
    }


    return (
        <div className='register-div'>
            <h2 className='register-title'>Register your business</h2>
            {
                (() => {
                    switch (currentStep) {
                        case 1:
                            return <RegisterStep1 setCurrentStep={setCurrentStep} setDivHeight={setDivHeight} divHeight={divHeight} setBusinessName={setBusinessName} setTag={setTag} setPhoneNumber={setPhoneNumber} setBusinessType={setBusinessType} businessName={businessName} tag={tag} phoneNumber={phoneNumber} businessType={businessType} />
                        case 2:
                            return <RegisterStep2 setCurrentStep={setCurrentStep} setDivHeight={setDivHeight} divHeight={divHeight} setPassword={setPassword} handleRegisterBusiness={handleRegisterBusiness} />
                        case 3:
                            return <RegisterStep3 setCurrentPage={setCurrentPage} />
                        default:
                            return <RegisterStep1 setCurrentStep={setCurrentStep} setDivHeight={setDivHeight} divHeight={divHeight} setBusinessName={setBusinessName} setTag={setTag} setPhoneNumber={setPhoneNumber} setBusinessType={setBusinessType} businessName={businessName} tag={tag} phoneNumber={phoneNumber} businessType={businessType} />
                    }
                })()
            }
            <p className='register-login-link'>Already have an account? <span onClick={() => setCurrentPage('login')} >Login</span></p>
        </div>
    )
}