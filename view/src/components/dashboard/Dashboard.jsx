import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import './../../styles/Dashboard.css'
import { Header } from './Header.jsx'
import { Nav } from './Nav.jsx'

/* Pages */
import { Management } from './pages/management/Management.jsx'
import { Templates } from './pages/templates/Templates.jsx'
import { Home } from './pages/Home.jsx'
import { Orders } from './pages/orders/Orders.jsx'
import { Analytics } from './pages/analytics/Analytics.jsx'
import { Loading } from './Loading.jsx'
import { Template } from "./pages/templates/Template.jsx"
import { CategoryPanel } from "./pages/templates/CategoryPanel.jsx"
import { Category } from "./pages/templates/Category.jsx"
import { ProductPanel } from "./pages/templates/ProductPanel.jsx"

export function Dashboard() {
    const [loaded, setLoaded] = useState(false)
    const [business, setBusiness] = useState({})

    const [businessName, setBusinessName] = useState(business.name)
    const [businessType, setBusinessType] = useState(business.type)
    const [businessStatus, setBusinessStatus] = useState(business.active_template)

    useEffect(() => {
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            const timeout = setTimeout(() => {
                window.location.href = '/error'
                console.error('Error: Timeout')
            }, 6000)
            fetch('http://147.182.207.78:3000/getbusiness', {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    clearTimeout(timeout)
                    if (!response.ok) {
                        window.location.href = '/error'
                    }
                    return response.json()
                })
                .then(business => {
                    setBusiness(business)
                    setBusinessName(business.name)
                    setBusinessType(business.type)
                    setBusinessStatus(business.active_template)
                    setLoaded(true)
                })
                .catch(error => {
                    clearTimeout(timeout)
                    console.error('Error:', error.message)
                    window.location.href = '/error'
                })

        }

    }, [])

    if (!loaded) return <Loading />


    return (
        <main>
            <Header business={business} businessName={businessName} businessType={businessType} businessStatus={businessStatus} />
            <section className="screen">
                <Routes>
                    <Route path="/management" element={<Management business={business} setBusiness={setBusiness} businessName={businessName} setBusinessName={setBusinessName} />} />
                    <Route path="/templates" element={<Templates business={business} setBusiness={setBusiness} />} />
                    <Route path="/t/:id" element={<Template business={business} setBusiness={setBusiness} />} />
                    <Route path="/t/:id/cp/:c_id" element={<CategoryPanel business={business} setBusiness={setBusiness} />} />
                    <Route path="/t/:id/:c_id" element={<Category />} />
                    <Route path="/t/:id/:c_id/pp/:p_id" element={<ProductPanel />} />
                    <Route path="/" element={<Home business={business} setBusiness={setBusiness} />} />
                    <Route path="/orders" element={<Orders business={business} setBusiness={setBusiness} />} />
                    <Route path="/analytics" element={<Analytics business={business} setBusiness={setBusiness} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </section>
            <Nav />
        </main>
    )
}