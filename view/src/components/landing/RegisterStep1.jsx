import { useState, useEffect } from 'react'
import debounce from "just-debounce-it"

export function RegisterStep1({ setCurrentStep, setDivHeight, divHeight, setBusinessName, setTag, setPhoneNumber, setBusinessLocation, businessName, tag, phoneNumber, businessLocation }) {
    const [avalibleTag, setAvalibleTag] = useState(false)
    const [tagProvisional, setTagProvisional] = useState('')


    const handleNameChange = (e) => {
        setBusinessName(e.target.value)
    }

    const handleTagChange = (e) => {
        setTagProvisional(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleLocationChange = (e) => {
        setBusinessLocation(e.target.value)
    }

    const handleRegister = () => {
        if (businessName.trim() === '') {
            alert('Business name cannot be empty')
            return
        }

        if (tag.trim() === '') {
            alert('Tag cannot be empty')
            return
        }

        if (phoneNumber.trim() === '') {
            alert('Phone number cannot be empty')
            return
        }

        if (businessLocation.trim() === '') {
            alert('Business location cannot be empty')
            return
        }

        setDivHeight("zero")
        setCurrentStep(2)
        setTimeout(() => {
            setDivHeight("full")
        }, 400)
    }

    const fetchTagExists = async () => {
        try {
            const response = await fetch(
                `http://147.182.207.78:3000/verifytag?tag=${tagProvisional}`
            )
            const data = await response.json()
            if (data.exists) {
                setAvalibleTag(false)
            } else {
                setAvalibleTag(true)
                setTag(tagProvisional)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    useEffect(() => {
        debounce(fetchTagExists, 500)()
    }, [tagProvisional])

    return (
        <div className={`register-form ${divHeight}`}>
            <input type="text" placeholder='business name' onInput={handleNameChange} className='register-input' value={businessName} />
            <p className='register-tag-text'>The tag is a unique word that identifies your business publicly on forkkies. <span className={tagProvisional.length == 0 ? "not-available" : (avalibleTag ? "available" : "not-available")}>
                {tagProvisional.length == 0 ? "Tag can't be empty" : (avalibleTag ? "This tag is available" : "This tag is in use")}</span></p>
            <input type="text" placeholder='tag' onInput={handleTagChange} className='register-input' />
            <input type="text" placeholder='phone number' onInput={handlePhoneChange} className='register-input' value={phoneNumber} />
            <input type="text" placeholder='business location' onInput={handleLocationChange} className='register-input' value={businessLocation} />
            <button className='register-button' onClick={handleRegister}>Next</button>
        </div>
    )
}