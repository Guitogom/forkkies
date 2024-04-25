import { useState, useEffect } from 'react'
import "./../../styles/Header.css"

export function Header({ business }) {
    const [businessName, setBusinessName] = useState(business.name)
    const [businessType, setBusinessType] = useState(business.type)
    const [businessStatus, setBusinessStatus] = useState(business.active_template)

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