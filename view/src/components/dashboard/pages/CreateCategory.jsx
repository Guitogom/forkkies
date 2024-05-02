import '../../../styles/Categories.css'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export function CreateCategory() {
    const [categoryName, setCategoryName] = useState('New Category')
    const [backgroundImage, setBackgroundImage] = useState('/src/assets/media/camera.webp')
    const [backgroundSize, setBackgroundSize] = useState('60px')
    const [inputBackground, setInputBackground] = useState('none')
    const [error, setError] = useState('')
    const { id } = useParams()

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

        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            const timeout = setTimeout(() => {
                setCurrentPage('error')
            }, 8000)

            const file = backgroundImage
            const reader = new FileReader()
            reader.onload = () => {
                const base64Image = reader.result.split(',')[1]

                fetch('http://147.182.207.78:3000/newcategory', {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ template_id: id, category: { name: categoryName, img: base64Image } })
                })
                    .then(response => {
                        clearTimeout(timeout)
                        if (!response.ok) {
                            window.location.href = '/error'
                        }
                        return response.json()
                    })
                    .then(business => {
                        console.log(business)
                        setActiveTemplate(business.active_template)
                        setTemplates(business.templates)
                        setLoaded(true)
                    })
                    .catch(error => {
                        clearTimeout(timeout)
                        console.error('Error:', error.message)
                        window.location.href = '/error'
                    })
            }
            reader.readAsDataURL(file)
        }

        window.location.href = `/dashboard/t/${id}`
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