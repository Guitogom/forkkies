import { Title } from "../Title"
import '../../../styles/Home.css'
import businessQR from '../../../assets/media/example_qr.png'
import { Link } from 'react-router-dom'

import { ManagementSVG } from '../../../assets/svg/ManagementSVG'
import { ProductsSVG } from '../../../assets/svg/ProductsSVG'
import { OrdersSVG } from "../../../assets/svg/OrdersSVG"
import { AnalyticsSVG } from "../../../assets/svg/AnalyticsSVG"

export function Home() {
    if (localStorage.getItem('session_token') !== null) {
        const token = localStorage.getItem('session_token')
        console.log('Iniciando fetch')
        fetch('http://147.182.207.78:3000/business', {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                console.log('fetch Response:', response)
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                return response.json();
            })
    }

    return (
        <section>
            <Title title="Home" text="Home" />
            <div className="body-home">
                <aside className="left-home">
                    <Link to="/management" className="box"><ManagementSVG /><h2>Management</h2></Link>
                    <Link to="/templates" className="box"><ProductsSVG /><h2>Templates</h2></Link>
                    <Link to="/orders" className="box"><OrdersSVG /><h2>Orders</h2></Link>
                    <Link to="/analytics" className="box"><AnalyticsSVG /><h2>Analytics</h2></Link>
                </aside>
                <aside className="right-home">
                    <p className="uppertext">Here is your preview</p>
                    <img src={businessQR} alt="QR Code" />
                    <p className="undertext">Scan to preview</p>
                </aside>
            </div>
        </section>
    )
}