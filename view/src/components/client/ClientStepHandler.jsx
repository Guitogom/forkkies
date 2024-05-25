import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Steps
import { OptionStep } from './props/OptionStep.jsx'
import { DeletableStep } from './props/DeletableStep.jsx'
import { ExtraStep } from './props/ExtraStep.jsx'
import { ClientFinalStep } from './ClientFinalStep.jsx'
import { act } from 'react'

export function ClientStepHandler({ categories, secondaryColor, themeColor, primaryColor, cart, setCart }) {
    const { tag, categoryId, productId } = useParams()
    const category = categories.find(cat => cat.id === parseInt(categoryId))
    const product = category ? category.products.find(pro => pro.id === parseInt(productId)) : null
    const steps = product ? product.steps : []

    const navigate = useNavigate()

    const [stepNumber, setStepNumber] = useState(0)
    const [stepTitle, setStepTitle] = useState(steps[0]?.title || '')
    const [optionSpecials, setOptionSpecials] = useState({})
    const [deletableSpecials, setDeletableSpecials] = useState({})
    const [extraSpecials, setExtraSpecials] = useState({})
    const [actualSpecial, setActualSpecial] = useState([])

    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (steps[stepNumber]) {
            setStepTitle(steps[stepNumber].title)
        } else {
            setStepTitle('You are done with the steps!')
        }
    }, [stepNumber, steps])

    const currentStep = steps[stepNumber]

    const renderStep = (step) => {
        switch (step.type) {
            case '1':
                return <OptionStep key={step.id} step={step} primaryColor={primaryColor} actualSpecial={actualSpecial} setActualSpecial={setActualSpecial} />
            case '2':
                return <DeletableStep key={step.id} step={step} primaryColor={primaryColor} actualSpecial={actualSpecial} setActualSpecial={setActualSpecial} />
            case '3':
                return <ExtraStep key={step.id} step={step} primaryColor={primaryColor} actualSpecial={actualSpecial} setActualSpecial={setActualSpecial} />
            default:
                return <p key={step.id}>Step not found</p>
        }
    }

    const handleNext = () => {
        if (actualSpecial.length > 0) {
            switch (currentStep.type) {
                case '1':
                    setOptionSpecials(prev => {
                        const updatedSpecials = { ...prev }
                        updatedSpecials[currentStep.id] = [...(updatedSpecials[currentStep.id] || []), ...actualSpecial]
                        return updatedSpecials
                    })
                    break
                case '2':
                    setDeletableSpecials(prev => {
                        const updatedSpecials = { ...prev }
                        updatedSpecials[currentStep.id] = [...(updatedSpecials[currentStep.id] || []), ...actualSpecial]
                        return updatedSpecials
                    })
                    break
                case '3':
                    setExtraSpecials(prev => {
                        const updatedSpecials = { ...prev }
                        updatedSpecials[currentStep.id] = [...(updatedSpecials[currentStep.id] || []), ...actualSpecial]
                        return updatedSpecials
                    })
                    break
                default:
                    break
            }
        }
        setStepNumber(prev => Math.min(prev + 1, steps.length))
        setActualSpecial([])
    }

    const handleBack = () => {
        if (stepNumber > 0) {
            const previousStep = steps[stepNumber - 1]
            switch (previousStep.type) {
                case '1':
                    setOptionSpecials(prev => {
                        const updatedSpecials = { ...prev }
                        delete updatedSpecials[previousStep.id]
                        return updatedSpecials
                    })
                    break
                case '2':
                    setDeletableSpecials(prev => {
                        const updatedSpecials = { ...prev }
                        delete updatedSpecials[previousStep.id]
                        return updatedSpecials
                    })
                    break
                case '3':
                    setExtraSpecials(prev => {
                        const updatedSpecials = { ...prev }
                        delete updatedSpecials[previousStep.id]
                        return updatedSpecials
                    })
                    break
                default:
                    break
            }
        }
        setStepNumber(prev => Math.max(prev - 1, 0))
    }

    const handleFinish = () => {
        if (actualSpecial.length > 0) {
            switch (currentStep.type) {
                case '1':
                    setOptionSpecials(prev => {
                        const updatedSpecials = { ...prev }
                        updatedSpecials[currentStep.id] = [...(updatedSpecials[currentStep.id] || []), ...actualSpecial]
                        return updatedSpecials
                    })
                    break
                case '2':
                    setDeletableSpecials(prev => {
                        const updatedSpecials = { ...prev }
                        updatedSpecials[currentStep.id] = [...(updatedSpecials[currentStep.id] || []), ...actualSpecial]
                        return updatedSpecials
                    })
                    break
                case '3':
                    setExtraSpecials(prev => {
                        const updatedSpecials = { ...prev }
                        updatedSpecials[currentStep.id] = [...(updatedSpecials[currentStep.id] || []), ...actualSpecial]
                        return updatedSpecials
                    })
                    break
                default:
                    break
            }
        }
        setIsFinished(true)
    }

    const css = `
    .step-option.option-selected img {
        border: 3px solid ${primaryColor};
    }
    
    .step-option.option-selected .step-option-image-filter {
        animation: fadeOpacity 0.5s forwards;
        background-color: ${primaryColor};
    }
    `

    return (
        <section className='client-step-handler'>
            <style>{css}</style>
            {isFinished ? (
                <ClientFinalStep
                    optionSpecials={optionSpecials}
                    deletableSpecials={deletableSpecials}
                    extraSpecials={extraSpecials}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    themeColor={themeColor}
                    cart={cart}
                    setCart={setCart}
                    product={product}
                />
            ) : (
                <>
                    <div className='client-step-progress-bar'>
                        <div className='client-step-progress-bar-inner' style={{ width: `${(stepNumber + 1) * 100 / (steps.length)}%`, backgroundColor: `${secondaryColor}` }}></div>
                    </div>
                    <h3 style={{ color: secondaryColor }}>{stepTitle}</h3>
                    {currentStep && renderStep(currentStep)}
                    <div className="step-controller">
                        {stepNumber === 0 ? (
                            <button onClick={() => navigate(`/b/${tag}/c/${categoryId}/sp/${productId}`)} className='step-button step-back-button' style={{ color: themeColor, backgroundColor: primaryColor, borderRight: `1px solid ${themeColor}` }}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M4 4V20M8 12H20M8 12L12 8M8 12L12 16" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </g>
                                </svg>
                                Exit
                            </button>
                        ) : (
                            <button onClick={handleBack} className='step-button step-back-button' style={{ color: themeColor, backgroundColor: primaryColor, borderRight: `1px solid ${themeColor}` }}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </g>
                                </svg>
                                Back
                            </button>
                        )}
                        {stepNumber === steps.length - 1 ? (
                            <button onClick={handleFinish} className='step-button step-next-button' style={{ color: themeColor, backgroundColor: primaryColor, borderLeft: `1px solid ${themeColor}` }}>
                                Finish
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M20 4V20M4 12H16M16 12L12 8M16 12L12 16" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </g>
                                </svg>
                            </button>
                        ) : (
                            <button onClick={handleNext} className='step-button step-next-button' style={{ color: themeColor, backgroundColor: primaryColor, borderLeft: `1px solid ${themeColor}` }}>
                                Next
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </g>
                                </svg>
                            </button>
                        )}
                    </div>
                </>
            )}
        </section>
    )
}
