import { useState, useEffect } from 'react'
import "./../../styles/Header.css"
import { getFetch } from '../../utils/fetch.js'

export function Header() {
    const [businessName, setBusinessName] = useState('Not feched yet')
    const [businessType, setBusinessType] = useState('Not feched yet')
    const [businessStatus, setBusinessStatus] = useState(false)


    async function fetchBusinessName() {
        try {
            const nombre = await getFetch('nombreNegocio')
            const tipo = await getFetch('tipoNegocio')
            const status = await getFetch('statusNegocio')
            setBusinessName(nombre || 'Fetch fail')
            setBusinessType(tipo || 'Fetch fail')
            setBusinessStatus(status || 'Fetch fail')
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    useEffect(() => {
        // fetchBusinessName()
    }, [])

    return (
        <header className="business-header">
            <p className="business-name">{businessName}</p>
            <div className="flex">
                <p className="business-type">{businessType}</p>
                <div className={`business-status ${businessStatus ? 'on' : 'off'}`}>
                    <div className="business-status-circle"></div>
                    <p className="business-status-text">{businessStatus ? 'Online' : 'Offline'}</p>
                </div>
            </div>
        </header>
    )
}