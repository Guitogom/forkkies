import { useState, useEffect } from 'react';
import "./../styles/Header.css";
import { getFetch } from '../utils/fetch.js'

export function Header() {
    const [businessName, setBusinessName] = useState('None');
    const [businessType, setBusinessType] = useState('NULL');
    const [businessStatus, setBusinessStatus] = useState(false);


    async function fetchBusinessName() {
        try {
            const data = await getFetch('nombreNegocio');
            setBusinessName(data || 'Fetch fail');
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    useEffect(() => {
        fetchBusinessName();
    }, []);

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