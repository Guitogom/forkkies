import { useState, useEffect, useCallback } from 'react'
import debounce from "just-debounce-it"

export function RegisterStep1({ setCurrentStep, setDivHeight, divHeight, setBusinessName, setTag, setPhoneNumber, setBusinessLocation, businessName, tag, phoneNumber, businessLocation }) {
    const [availableTag, setAvailableTag] = useState(false)
    const [tagProvisional, setTagProvisional] = useState('')
    const [nameMistake, setNameMistake] = useState('')
    const [tagMistake, setTagMistake] = useState('')
    const [phoneMistake, setPhoneMistake] = useState('')
    const [locationMistake, setLocationMistake] = useState('')


    const handleNameChange = (e) => {
        setNameMistake('')
        setBusinessName(e.target.value)
    }

    const handleTagChange = (e) => {
        setTagMistake('')
        setTagProvisional(e.target.value);
    }

    const handlePhoneChange = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = e.target.value.slice(0, -1)
        }
        setPhoneMistake('')
        setPhoneNumber(e.target.value)
    }

    const handleLocationChange = (e) => {
        setLocationMistake('')
        setBusinessLocation(e.target.value)
    }

    const handleRegister = () => {
        let hasError = false

        if (businessName.trim() === '') {
            setNameMistake("Business name can't be empty")
            hasError = true
        }

        if (tagProvisional.trim() === '') {
            setTagMistake("Business tag can't be empty")
            hasError = true
        }

        if (!availableTag) {
            setTagMistake("Business tag is already in use")
            hasError = true
        }

        if (phoneNumber.trim() === '') {
            setPhoneMistake("Business phone number can't be empty")
            hasError = true
        }

        if (businessLocation.trim() === '') {
            setLocationMistake("Business location can't be empty")
            hasError = true
        }

        if (hasError) return

        setDivHeight("zero")
        setCurrentStep(2)
        setTimeout(() => {
            setDivHeight("full")
        }, 400)
    }

    const fetchTagExists = async (tag) => {
        try {
            const response = await fetch(
                `https://api.forkkies.live/verifytag?tag=${tag}`
            )
            const data = await response.json()
            if (data.exists) {
                setAvailableTag(false)
            } else {
                setAvailableTag(true)
                setTag(tag)
            }
        } catch (error) {
            setAvailableTag(false)
            console.error('Error:', error)
        }
    }

    const debouncedFetchTagExists = useCallback(
        debounce((tag) => {
            fetchTagExists(tag)
        }, 300),
        []
    )

    useEffect(() => {
        if (tagProvisional.trim() !== '') {
            debouncedFetchTagExists(tagProvisional)
        }
    }, [tagProvisional])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleRegister()
        }
    }

    window.addEventListener('keydown', handleKeyPress)

    return (
        <div className={`register-form ${divHeight}`}>
            <input type="text" placeholder='business name' onInput={handleNameChange} className={`register-input ${nameMistake !== '' ? 'wrong' : ''}`} value={businessName} />
            <p className="mistake-error">{nameMistake}</p>
            <p className='register-tag-text'>The tag is a unique word that identifies your business publicly on forkkies. <span className={tagProvisional.length == 0 ? "not-available" : (availableTag ? "available" : "not-available")}>
                {tagProvisional.length == 0 ? "Tag can't be empty" : (availableTag ? "This tag is available" : "This tag is in use")}</span></p>
            <input type="text" placeholder='tag' onInput={handleTagChange} className={`register-input ${tagMistake !== '' ? 'wrong' : ''}`} />
            <p className="mistake-error">{tagMistake}</p>
            <input type="text" placeholder='phone number' onInput={handlePhoneChange} className={`register-input ${phoneMistake !== '' ? 'wrong' : ''}`} value={phoneNumber} />
            <p className="mistake-error">{phoneMistake}</p>
            <input type="text" placeholder='business location' onInput={handleLocationChange} className={`register-input ${locationMistake !== '' ? 'wrong' : ''}`} value={businessLocation} />
            <p className="mistake-error">{locationMistake}</p>
            <button className='register-button' onClick={handleRegister}>Next</button>
        </div>
    )
}