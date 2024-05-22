import { useEffect, useState } from "react"
import { Route, Routes, Navigate, useNavigate, useParams, Link } from "react-router-dom"
import '../../styles/Client.css'

// Componentes
import { ClientHeader } from './ClientHeader.jsx'
import { ClientFooter } from './ClientFooter.jsx'
import { ClientLoading } from "./ClientLoading.jsx"
import { ClientCategories } from "./ClientCategories.jsx"
import { ClientProducts } from "./ClientProducts.jsx"
import { ClientFullProduct } from "./ClientFullProduct.jsx"
import { ClientStepProduct } from "./ClientStepProduct.jsx"
import { ClientDisplayMenu } from "./ClientDisplayMenu.jsx"
import { ClientOrder } from "./ClientOrder.jsx"
import { ClientPayment } from "./ClientPayment.jsx"
import { ClientStepHandler } from "./ClientStepHandler.jsx"

export function Client() {
    const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [])

    const { tag } = useParams()
    const [loaded, setLoaded] = useState(false)
    const [template, setTemplate] = useState({})

    const [primaryColor, setPrimaryColor] = useState("#ADD861")
    const [secondaryColor, setSecondaryColor] = useState("#4D4D4D")
    const [callToActionColor, setCallToActionColor] = useState("#D9D9D9")
    const [themeColor, setThemeColor] = useState("#F9FBFD")

    const [orderPrice, setOrderPrice] = useState(0)

    const navigate = useNavigate()

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
                    navigate('/')
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
                navigate('/')
            })

    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        const total = cart.reduce((acc, item) => acc + item.totalPrice, 0)
        setOrderPrice(total)
    }, [cart])

    const [displayNav, setDisplayNav] = useState(false)

    if (!loaded) return <ClientLoading />

    return (
        <main className="client-app" style={{ backgroundColor: themeColor }}>
            <ClientHeader display={displayNav} setDisplay={setDisplayNav} name={template.name} primaryColor={primaryColor} secondaryColor={secondaryColor} callToActionColor={callToActionColor} themeColor={themeColor} />
            <div className="client-screen" >
                <Routes>
                    <Route path='/categories' element={<ClientCategories categories={template.categories} secondaryColor={secondaryColor} />} />
                    <Route path='/c/:categoryId' element={<ClientProducts categories={template.categories} secondaryColor={secondaryColor} themeColor={themeColor} />} />
                    <Route path='/c/:categoryId/p/:productId' element={<ClientFullProduct categories={template.categories} secondaryColor={secondaryColor} primaryColor={primaryColor} cart={cart} setCart={setCart} themeColor={themeColor} />} />
                    <Route path='/c/:categoryId/sp/:productId' element={<ClientStepProduct categories={template.categories} secondaryColor={secondaryColor} primaryColor={primaryColor} cart={cart} setCart={setCart} themeColor={themeColor} />} />
                    <Route path='/c/:categoryId/sp/:productId/s' element={<ClientStepHandler categories={template.categories} secondaryColor={secondaryColor} themeColor={themeColor} primaryColor={primaryColor} cart={cart} setCart={setCart} />} />
                    <Route path='/order' element={<ClientOrder cart={cart} setCart={setCart} secondaryColor={secondaryColor} primaryColor={primaryColor} themeColor={themeColor} />} />
                    <Route path='/pay' element={<ClientPayment cart={cart} setCart={setCart} secondaryColor={secondaryColor} primaryColor={primaryColor} themeColor={themeColor} template={template} orderPrice={orderPrice} />} />
                    <Route path="*" element={<Navigate to={`/b/${tag}/categories`} />} />
                </Routes>
                <ClientDisplayMenu displayNav={displayNav} setDisplayNav={setDisplayNav} categories={template.categories} primaryColor={primaryColor} themeColor={themeColor} />
            </div>
            <ClientFooter primaryColor={primaryColor} secondaryColor={secondaryColor} callToActionColor={callToActionColor} themeColor={themeColor} orderPrice={orderPrice} />
        </main>
    )
}