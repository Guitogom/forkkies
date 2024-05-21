import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

//Steps
import { OptionStep } from './props/OptionStep.jsx'
import { DeletableStep } from './props/DeletableStep.jsx'
import { ExtraStep } from './props/ExtraStep.jsx'

export function ClientStepHandler({ categories, secondaryColor }) {
    const { tag, categoryId, productId } = useParams()
    const category = categories.find(cat => cat.id === parseInt(categoryId))
    const product = category ? category.products.find(pro => pro.id === parseInt(productId)) : null
    const steps = product ? product.steps : []
    console.log(steps)

    const [stepTitle, setStepTitle] = useState('')
    const [stepNumer, setStepNumber] = useState(0)

    return (
        <section className='client-step-handler'>
            <div className='client-step-progress-bar'>
                <div className='client-step-progress-bar-inner' style={{ width: `${(stepNumer) * 100 / steps.length}%`, backgroundColor: `${secondaryColor}` }}></div>
            </div>
            <h3 style={{ color: secondaryColor }}>{stepTitle}</h3>
            {steps.map((step, index) => {
                switch (step.type) {
                    case '1':
                        return <OptionStep key={index} step={step} setStepTitle={setStepTitle} setStepNumber={setStepNumber} />
                    case '2':
                        return <DeletableStep key={index} step={step} setStepTitle={setStepTitle} setStepNumber={setStepNumber} />
                    case '3':
                        return <ExtraStep key={index} step={step} setStepTitle={setStepTitle} setStepNumber={setStepNumber} />
                    default:
                        return <p key={index}>Step not found</p>
                }
            })}
            <div className="step-controller">
                <button onClick={() => setStepNumber(prevState => prevState - 1)} disabled={stepNumer === 0}>Back</button>
                <button onClick={() => setStepNumber(prevState => prevState + 1)} disabled={stepNumer === steps.length}>Next</button>
            </div>
        </section>
    )
}
