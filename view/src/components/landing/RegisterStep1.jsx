import { useState, useEffect } from 'react'

export function RegisterStep1({ setCurrentStep, setDivHeight, divHeight, setBusinessName, tag, setTag, setPhoneNumber, setBusinessType }) {
    const [avalibleTag, setAvalibleTag] = useState(true)


    const handleNameChange = (e) => {
        setBusinessName(e.target.value)
    }

    const handleTagChange = (e) => {
        setTag(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleTypeChange = (e) => {
        setBusinessType(e.target.value)
    }

    const handleRegister = () => {
        setDivHeight("zero")
        setCurrentStep(2)
        setTimeout(() => {
            setDivHeight("full")
        }, 400)
    }

    useEffect(() => {

    }, [tag])

    return (
        <div className={`register-form ${divHeight}`}>
            <input type="text" placeholder='business name' onInput={handleNameChange} className='register-input' />
            <p className='register-tag-text'>The tag is a unique word that identifies your business publicly on forkkies. <span className={tag.length == 0 ? "not-available" : (avalibleTag ? "available" : "not-available")}>
                {tag.length == 0 ? "Tag can't be empty" : (avalibleTag ? "This tag is available" : "This tag is in use")}</span></p>
            <input type="text" placeholder='tag' onInput={handleTagChange} className='register-input' />
            <input type="text" placeholder='phone number' onInput={handlePhoneChange} className='register-input' />
            <input type="text" placeholder='business type' onInput={handleTypeChange} className='register-input' />
            <button className='register-button' onClick={handleRegister}>Next</button>
        </div>
    )
}