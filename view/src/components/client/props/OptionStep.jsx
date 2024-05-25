import { useState, useEffect } from 'react'

export function OptionStep({ step, primaryColor, actualSpecial, setActualSpecial }) {
    const [selectedOption, setSelectedOption] = useState(step.specials.length > 0 ? step.specials[0].id : null)

    useEffect(() => {
        if (step.specials.length > 0) {
            setSelectedOption(step.specials[0].id)
            setActualSpecial([step.specials[0]])
        }
    }, [step, setActualSpecial])

    const handleOptionSelect = (option) => {
        setSelectedOption(option.id)
        setActualSpecial([option])
    }

    return (
        <div className="client-step">
            {step.specials.map((option) => (
                <div key={option.id} className={`step-option ${selectedOption === option.id ? 'option-selected' : ''}`} onClick={() => handleOptionSelect(option)}>
                    <p style={{ color: primaryColor }}>{option.name}</p>
                    <div className="step-option-image">
                        <img src={`data:image/jpeg;base64,${option.img}`} alt={option.name} />
                        <div className='step-option-image-filter'></div>
                    </div>
                </div>
            ))}
        </div>
    )
}
