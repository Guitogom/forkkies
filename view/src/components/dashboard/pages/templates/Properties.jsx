import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PlusSVG } from "../../../../assets/svg/PlusSVG"

export function Properties() {
    const [properties, setProperties] = useState([])

    const navigate = useNavigate()

    const uploadProperty = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            if (localStorage.getItem('session_token') !== null) {
                const token = localStorage.getItem('session_token')
                fetch('https://api.forkkies.live/newproperty', {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: file.name.split('.')[0],
                        img: reader.result.split(',')[1]
                    })
                })
                    .then(response => {
                        if (!response.ok) {
                            navigate('/error')
                        }
                        return response.json()
                    })
                    .then(property => {
                        let newPropierty = {
                            id: property.result,
                            name: file.name.split('.')[0],
                            img: reader.result.split(',')[1]
                        }
                        setProperties([...properties, newPropierty])
                    })
                    .catch(error => {
                        console.error('Error:', error.message)
                        navigate('/error')
                    })
            }
        }
    }

    const deleteProperty = (id) => {
        return () => {
            if (localStorage.getItem('session_token') !== null) {
                const token = localStorage.getItem('session_token')
                fetch('https://api.forkkies.live/deleteproperty', {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                })
                    .then(response => {
                        if (!response.ok) {
                            navigate('/error')
                        }
                        return response.json()
                    })
                    .then(property => {
                        setProperties(properties.filter(property => property.id !== id))
                    })
                    .catch(error => {
                        console.error('Error:', error.message)
                        navigate('/error')
                    })
            }
        }
    }

    useEffect(() => {
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            fetch('https://api.forkkies.live/getproperties', {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        navigate('/error')
                    }
                    return response.json()
                })
                .then(properties => {
                    setProperties(properties.result.properties)
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    navigate('/error')
                })
        }
    }, [])

    return (
        <section className="properties">
            <h2>Properties</h2>
            <div className="properties-container">
                <div className="propierties-flex">
                    {
                        properties.length > 0 ? (properties.map((property, index) => {
                            return (
                                <div className="property" key={index}>
                                    <img src={`data:image/png;base64,${property.img}`} alt={property.name} />
                                    <div className="delete-property" onClick={deleteProperty(property.id)}>
                                        <svg fill="#fff" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"></path> </g></svg>
                                    </div>
                                </div>
                            )
                        })) : <p>No properties</p>
                    }
                </div>
            </div>
            <div className="properties-add">
                <input type="file" onInput={uploadProperty} />
                <PlusSVG />
            </div>
        </section>
    )
}