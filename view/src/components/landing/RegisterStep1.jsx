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
        setPhoneMistake('')
        setPhoneNumber(e.target.value)
    }

    const handleLocationChange = (e) => {
        setLocationMistake('')
        setBusinessLocation(e.target.value)
    }

    const handleRegister = () => {
        setNameMistake(businessName.trim() === '' ? 'wrong' : '')
        setTagMistake(tagProvisional.trim() === '' || !availableTag ? 'wrong' : '')
        setPhoneMistake(phoneNumber.trim() === '' ? 'wrong' : '')
        setLocationMistake(businessLocation.trim() === '' ? 'wrong' : '')

        if (businessName.trim() === '' || tagProvisional.trim() === '' || !availableTag || phoneNumber.trim() === '' || businessLocation.trim() === '') return

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

    return (
        <div className={`register-form ${divHeight}`}>
            <input type="text" placeholder='business name' onInput={handleNameChange} className={`register-input ${nameMistake}`} value={businessName} />
            <p className='register-tag-text'>The tag is a unique word that identifies your business publicly on forkkies. <span className={tagProvisional.length == 0 ? "not-available" : (availableTag ? "available" : "not-available")}>
                {tagProvisional.length == 0 ? "Tag can't be empty" : (availableTag ? "This tag is available" : "This tag is in use")}</span></p>
            <input type="text" placeholder='tag' onInput={handleTagChange} className={`register-input ${tagMistake}`} />
            <input type="text" placeholder='phone number' onInput={handlePhoneChange} className={`register-input ${phoneMistake}`} value={phoneNumber} />
            <input type="text" placeholder='business location' onInput={handleLocationChange} className={`register-input ${locationMistake}`} value={businessLocation} />
            <button className='register-button' onClick={handleRegister}>Next</button>
        </div>
    )
}