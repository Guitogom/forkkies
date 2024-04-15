import { useState, useEffect } from 'react'
import '../../styles/Register.css'

import { RegisterStep1 } from './RegisterStep1.jsx'
import { RegisterStep2 } from './RegisterStep2.jsx'
import { RegisterStep3 } from './RegisterStep3.jsx'

export function Register({ setCurrentPage }) {
    const [currentStep, setCurrentStep] = useState(1)
    const [divHeight, setDivHeight] = useState("full")
    const content = null

    return (
        <div className='register-div'>
            <h2 className='register-title'>Register your business</h2>
            {
                (() => {
                    switch (currentStep) {
                        case 1:
                            return <RegisterStep1 setCurrentStep={setCurrentStep} setDivHeight={setDivHeight} divHeight={divHeight} />
                        case 2:
                            return <RegisterStep2 setCurrentStep={setCurrentStep} setDivHeight={setDivHeight} divHeight={divHeight} />
                        case 3:
                            return <RegisterStep3 setCurrentPage={setCurrentPage} />
                        default:
                            return <RegisterStep1 setCurrentStep={setCurrentStep} setDivHeight={setDivHeight} divHeight={divHeight} />
                    }
                })()
            }
            <p className='register-login-link'>Already have an account? <span onClick={() => setCurrentPage('login')} >Login</span></p>
        </div>
    )
}