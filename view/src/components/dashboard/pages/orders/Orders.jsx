import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Title } from "../../Title"
import '../../../../styles/Orders.css'
import { NextArrowSVG } from "../../../../assets/svg/NextArrowSVG.jsx"

// Components
import { OrderProp } from "./OrderProp.jsx"

export function Orders({ business, orders, setOrders }) {
    const navigate = useNavigate()

    useEffect(() => {
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
                        console.log(orders.result.orders)
                    })
                    .catch(error => {
                        console.error('Error:', error.message)
                        localStorage.removeItem('session_token')
                        navigate('/error')
                    })
            }
        }

        fetchOrders()

        // const interval = setInterval(fetchOrders, 60000)

        // return () => clearInterval(interval)
    }, [])

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
                    <p>Date</p>
                    <p>Name</p>
                    <p>Total Price</p>
                    <p>Status</p>
                    <p></p>
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