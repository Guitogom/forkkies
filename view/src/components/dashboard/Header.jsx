import { useState, useEffect } from 'react'
import "./../../styles/Header.css"

export function Header({ businessName, businessLocation, businessStatus }) {

    return (
        <header className="business-header">
            <p className="business-name">{businessName}</p>
            <div className="flex">
                <p className="business-type">{businessLocation}</p>
                <div className={`business-status ${businessStatus ? 'on' : 'off'}`}>
                    <div className="business-status-circle"></div>
                    <p className="business-status-text">{businessStatus ? 'Online' : 'Offline'}</p>
                </div>
            </div>
        </header>
    )
}