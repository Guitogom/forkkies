import '../../../styles/Categories.css'
import React, { useState } from 'react'

export function CreateCategory({ setDisplay }) {
    const [categoryName, setCategoryName] = useState('New Category')
    const [backgroundImage, setBackgroundImage] = useState('/src/assets/media/camera.webp')
    const [backgroundSize, setBackgroundSize] = useState('60px')
    const [inputBackground, setInputBackground] = useState('none')
    const [error, setError] = useState('')

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setBackgroundImage(reader.result)
                setBackgroundSize('cover')
            }
            reader.readAsDataURL(file)
        }
    }

    const handleNameChange = (e) => {
        setCategoryName(e.target.value)
    }

    const handleSave = () => {
        if (categoryName.trim() === '') {
            setError('Category name cannot be empty')
            return
        }

        if (backgroundImage === '/src/assets/media/camera.webp') {
            setError('Category image cannot be empty')
            return
        }

        setError('')

        // APi call
        setDisplay('categories')
    }

    return (
        <section className='new-category'>
            <div className="image-input" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: `${backgroundSize}` }}>
                <label htmlFor="categoryImage"></label>
                <input type="file" name="categoryImage" id="categoryImage" onChange={handleImageChange} />
            </div>
            <input type="text" placeholder='Category Name' value={categoryName} onChange={handleNameChange} style={{ backgroundColor: `${inputBackground}` }} />
            <p className='error-text'>{error}</p>
            <button onClick={handleSave} className='save-button'>Save</button>
        </section >
    )
}