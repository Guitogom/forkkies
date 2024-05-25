import { useState, useEffect } from 'react'

export function ExtraStep({ step, primaryColor, actualSpecial, setActualSpecial }) {
    const [selectedOptions, setSelectedOptions] = useState([])

    useEffect(() => {
        const selectedSpecials = selectedOptions.map(id => step.specials.find(special => special.id === id))
        setActualSpecial(selectedSpecials)
    }, [selectedOptions, step.specials, setActualSpecial])

    const handleOptionToggle = (option) => {
        setSelectedOptions((prevSelectedOptions) => {
            const isSelected = prevSelectedOptions.includes(option.id)
            if (isSelected) {
                return prevSelectedOptions.filter(id => id !== option.id)
            } else {
                return [...prevSelectedOptions, option.id]
            }
        })
    }

    return (
        <div className="client-step">
            {step.specials.map((option) => (
                <div
                    key={option.id}
                    className={`step-option ${selectedOptions.includes(option.id) ? 'option-selected' : ''}`}
                    onClick={() => handleOptionToggle(option)}
                >
                    <p style={{ color: primaryColor }}>{option.name}</p>
                    <div className="step-option-image">
                        <img src={`data:image/jpeg;base64,${option.img}`} alt={option.name} />
                        <div className='step-option-image-filter'></div>
                        <div className="step-option-image-price-changer">
                            <p>{option.price_changer}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
