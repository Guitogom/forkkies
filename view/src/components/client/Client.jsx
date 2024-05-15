import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../../styles/Client.css'

// Componentes
import { ClientHeader } from './ClientHeader.jsx'
import { ClientFooter } from './ClientFooter.jsx'
import { LoadingWithText } from "../dashboard/LoadingWithText.jsx"

export function Client() {
    const { tag } = useParams()
    const [loaded, setLoaded] = useState(false)
    const [template, setTemplate] = useState({})

    useEffect(() => {
        fetch(`http://147.182.207.78:3000/clienttemplate?tag=${tag}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    window.location.href = '/error'
                }
                setLoaded(true)
                return response.json()
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error('Error:', error.message)
            })

    }, [])


    // if (!loaded) return <LoadingWithText />

    return (
        <>
            <ClientHeader name={template.name} />
            <div className="client-screen">

            </div>
            <ClientFooter />
        </>
    )
}