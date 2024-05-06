import '../../../../styles/Categories.css'
import { useState } from 'react'
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

    const handleSaveCategory = () => {
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

            fetch('http://147.182.207.78:3000/newcat', {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ template_id: id, category: { name: categoryName, img: backgroundImage } })
            })
                .then(response => {
                    if (!response.ok) {
                        window.location.href = '/error'
                    }
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.error('Error en el fetch:', error.message)
                    console.log('Error:', error);
                    console.log('Error message:', error.message);
                    console.log('Error stack:', error.stack);
                    console.log('Error name:', error.name);
                    console.log('Error code:', error.code);
                    console.log('Error status:', error.status);
                    console.log('Error response:', error.response);
                    console.log('Error data:', error.data);
                    console.log('Error config:', error.config);
                    window.location.href = '/error'
                })
        }

        // window.location.href = `/dashboard/t/${id}`
    }


    return (
        <section className='new-category'>
            <div className="image-input" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: `${backgroundSize}` }}>
                <label htmlFor="categoryImage"></label>
                <input type="file" name="categoryImage" id="categoryImage" onChange={handleImageChange} />
            </div>
            <input type="text" placeholder='Category Name' value={categoryName} onChange={handleNameChange} style={{ backgroundColor: `${inputBackground}` }} />
            <p className='error-text'>{error}</p>
            <button onClick={handleSaveCategory} className='save-button'>Save</button>
        </section>
    )
}