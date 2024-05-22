import { useState, useEffect } from 'react'

export function ExtraStep({ step, primaryColor, actualSpecial, setActualSpecial }) {
    const [selectedOptions, setSelectedOptions] = useState([])

    useEffect(() => {
        const selectedSpecials = selectedOptions.map(id => step.specials.find(special => special.id === id))
        setActualSpecial(selectedSpecials)
    }, [selectedOptions, step.specials, setActualSpecial])
    console.log(step.specials)

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
                    <img src={`data:image/jpeg;base64,${option.img}`} alt={option.name} />
                    <p>{option.price_changer}</p>
                </div>
            ))}
        </div>
    )
}
