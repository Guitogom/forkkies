import '../../../../styles/Categories.css'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Loading } from '../../Loading.jsx'

export function CategoryPanel() {
    const [loaded, setLoaded] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [backgroundImage, setBackgroundImage] = useState('/src/assets/media/camera.webp')
    const [backgroundSize, setBackgroundSize] = useState('60px')
    const [inputBackground, setInputBackground] = useState('none')
    const [imagenAEnviar, setImageAEnviar] = useState('')
    const [error, setError] = useState('')
    const { id } = useParams()
    const { c_id } = useParams()

    useEffect(() => {
        if (c_id !== 'new' && !loaded) {
            const token = localStorage.getItem('session_token')
            fetch(`https://api.forkkies.live/getcategory?id=${c_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        window.location.href = '/error'
                    }
                    return response.json()
                })
                .then(response => {
                    setCategoryName(response.result.category.name)
                    setBackgroundImage(`data:image/jpeg;base64,${response.result.category.img}`)
                    setBackgroundSize('cover')
                    setImageAEnviar(response.result.category.img)
                    setLoaded(true)
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    window.location.href = '/error'
                })
        } else {
            setLoaded(true)
        }
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setBackgroundImage(reader.result)
                setBackgroundSize('cover')
                setImageAEnviar(reader.result.split(',')[1])
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
            return;
        }

        if (backgroundImage === '/src/assets/media/camera.webp') {
            setError('Category image cannot be empty')
            return;
        }

        setError('');

        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')

            if (c_id === 'new') {
                fetch(`https://api.forkkies.live/newcategory`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ template_id: id, category: { name: categoryName, img: imagenAEnviar } })
                })
                    .then(response => {
                        if (!response.ok) {
                            window.location.href = '/error'
                        } else {
                            window.location.href = `/dashboard/t/${id}`
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error.message)
                    })
            } else {
                fetch(`https://api.forkkies.live/modifycategory`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ template_id: id, category: { id: c_id, name: categoryName, img: imagenAEnviar } })
                })
                    .then(response => {
                        if (!response.ok) {
                            window.location.href = '/error'
                        } else {
                            window.location.href = `/dashboard/t/${id}`
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error.message)
                    })
            }
        }
    }

    if (!loaded) return <Loading />

    return (
        <section className='new-category'>
            <div className="template-go-back-container">
                <Link className="template-goback-button" to={`/dashboard/t/${id}`}>Go Back</Link>
            </div>
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