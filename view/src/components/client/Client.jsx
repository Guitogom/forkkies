import { useEffect, useState } from "react"
import { Route, Routes, Navigate, useParams, Link } from "react-router-dom"
import '../../styles/Client.css'

// Componentes
import { ClientHeader } from './ClientHeader.jsx'
import { ClientFooter } from './ClientFooter.jsx'
import { ClientLoading } from "./ClientLoading.jsx"
import { ClientCategories } from "./ClientCategories.jsx"

export function Client() {
    const { tag } = useParams()
    const [loaded, setLoaded] = useState(false)
    const [template, setTemplate] = useState({})

    const [primaryColor, setPrimaryColor] = useState("#ADD861")
    const [secondaryColor, setSecondaryColor] = useState("#4D4D4D")
    const [callToActionColor, setCallToActionColor] = useState("#D9D9D9")
    const [themeColor, setThemeColor] = useState("#F9FBFD")

    useEffect(() => {
        fetch(`https://api.forkkies.live/loadbusiness?tag=${tag}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Error:', response.statusText)
                }
                return response.json()
            })
            .then(response => {
                console.log(response)
                setTemplate(response.result.business)
                setPrimaryColor(response.result.business.color1)
                setSecondaryColor(response.result.business.color2)
                setCallToActionColor(response.result.business.color3)
                setThemeColor(response.result.business.color4)
                setLoaded(true)
            })
            .catch(error => {
                console.error('Error:', error.message)
            })

    }, [])


    if (!loaded) return <ClientLoading />

    return (
        <main className="client-app">
            <ClientHeader name={template.name} primaryColor={primaryColor} secondaryColor={secondaryColor} callToActionColor={callToActionColor} themeColor={themeColor} />
            <div className="client-screen" style={{ backgroundColor: themeColor }}>
                <Link to={`/b/${tag}/categories`}>AAAAA</Link>
                <Routes>
                    <Route path='/categories' element={<ClientCategories categories={template.categories} secondaryColor={secondaryColor} />} />
                    <Route path='/c/:categoryId' element={<ClientCategories categories={template.categories} secondaryColor={secondaryColor} />} />
                    <Route path="*" element={<Navigate to={`/b/${tag}/categories`} />} />
                </Routes>
            </div>
            <ClientFooter primaryColor={primaryColor} secondaryColor={secondaryColor} callToActionColor={callToActionColor} themeColor={themeColor} />
        </main>
    )
}