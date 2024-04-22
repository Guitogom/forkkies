import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from "react"
import './../../styles/Dashboard.css'
import { Header } from './Header.jsx'
import { Nav } from './Nav.jsx'

/* Pages */
import { Management } from './pages/Management.jsx'
import { Templates } from './pages/Templates.jsx'
import { Home } from './pages/Home.jsx'
import { Orders } from './pages/Orders.jsx'
import { Analytics } from './pages/Analytics.jsx'
import { Loading } from './Loading.jsx'

export function Dashboard({ setCurrentPage }) {
    const [loaded, setLoaded] = useState(false)
    const [business, setBusiness] = useState({})
    useEffect(() => {
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            const timeout = setTimeout(() => {
                setCurrentPage('error')
                console.error('Error: Timeout')
            }, 8000)
            fetch('http://147.182.207.78:3000/business', {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    clearTimeout(timeout)
                    if (!response.ok) {
                        throw new Error('Error al obtener los datos')
                    }
                    return response.json()
                })
                .then(business => {
                    console.log('Datos del negocio:', business)
                    setBusiness(business)
                    setLoaded(true)
                })
                .catch(error => {
                    clearTimeout(timeout)
                    setCurrentPage('landing')
                    console.error('Error:', error.message)
                })
        }
    }, [])

    if (!loaded) return <Loading />


    return (
        <Router>
            <main>
                <Header business={business} />
                <section className="screen">
                    <Routes>
                        <Route path="/management" element={<Management business={business} setBusiness={setBusiness} />} />
                        <Route path="/templates" element={<Templates business={business} setBusiness={setBusiness} />} />
                        <Route path="/" element={<Home business={business} setBusiness={setBusiness} />} />
                        <Route path="/orders" element={<Orders business={business} setBusiness={setBusiness} />} />
                        <Route path="/analytics" element={<Analytics business={business} setBusiness={setBusiness} />} />
                    </Routes>
                </section>
                <Nav />
            </main>
        </Router>
    )
}