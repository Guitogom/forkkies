import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Title } from "../../Title"
import '../../../../styles/Orders.css'
import { NextArrowSVG } from "../../../../assets/svg/NextArrowSVG.jsx"

// Components
import { OrderProp } from "./OrderProp.jsx"

export function Orders({ business, orders, setOrders }) {
    const navigate = useNavigate()
    const [refreshing, setRefreshing] = useState(true)
    const [stopping, setStopping] = useState(false);

    const fetchOrders = () => {
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            fetch('https://api.forkkies.live/getorders', {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        navigate('/error')
                    }
                    return response.json()
                })
                .then(orders => {
                    setOrders(orders.result.orders)
                    setRefreshing(false)
                    setStopping(true)
                    setTimeout(() => setStopping(false), 200)
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    localStorage.removeItem('session_token')
                    navigate('/error')
                })
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const refreshOrders = () => {
        fetchOrders()
        setRefreshing(true)
    }

    return (
        <section>
            <Title title="Orders" text="Orders" />
            <div className="order-colors">
                <div className="order-status-color"><div className="order-status-ball pending-color"></div><p className="order-status-title">Pending</p></div>
                <div className="order-status-arrow"><NextArrowSVG /></div>
                <div className="order-status-color"><div className="order-status-ball payed-color"></div><p className="order-status-title">Payed</p></div>
                <div className="order-status-arrow"><NextArrowSVG /></div>
                <div className="order-status-color"><div className="order-status-ball ready-color"></div><p className="order-status-title">Ready</p></div>
                <div className="order-status-arrow"><NextArrowSVG /></div>
                <div className="order-status-color"><div className="order-status-ball delivered-color"></div><p className="order-status-title">Delivered</p></div>
                <div className="order-status-arrow"><NextArrowSVG /></div>
                <div className="order-status-color"><div className="order-status-ball canceled-color"></div><p className="order-status-title">Canceled</p></div>
            </div>
            <div className="order-table">
                <div className="order-titles">
                    <p>ID</p>
                    <p>Time</p>
                    <p>Name</p>
                    <p>Total Price</p>
                    <p>Action</p>
                    <button className={`order-refresh`} style={{ backgroundColor: `${refreshing ? 'var(--green)' : 'var(--forth-color)'}` }} onClick={refreshOrders}><svg className={`${refreshing ? 'refreshing' : stopping ? 'stopping' : ''}`} fill="#000000" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z"></path></g></svg>Refresh</button>
                </div>
                {orders.length > 0 ? (
                    orders.slice().reverse().map(order => (
                        <OrderProp key={order.id} order={order} />
                    ))
                ) : (
                    <p>...</p>
                )}
            </div>
        </section>
    )
}