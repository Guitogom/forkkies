import { PlaySVG } from "../../../../assets/svg/PlaySVG.jsx"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { NextArrowSVG } from "../../../../assets/svg/NextArrowSVG.jsx"
import { OrderDetailsProp } from "./OrderDetailsProp.jsx"

export function OrderProp({ order }) {
    const date = new Date(order.date).toLocaleString()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState(order.status)
    const [swipeStatus, setSwipeStatus] = useState(null)

    const formatPrice = (price) => {
        return price % 1 === 0 ? `${price}.00` : price.toFixed(2)
    }

    const fetchOrders = () => {
        if (localStorage.getItem('session_token') !== null) {
            const token = localStorage.getItem('session_token')
            fetch('https://api.forkkies.live/modifyorderstatus', {
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
                    console.log(orders)
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    localStorage.removeItem('session_token')
                    navigate('/error')
                })
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case '0':
                return "pending"
            case '1':
                return "payed"
            case '2':
                return "ready"
            case '3':
                return "delivered"
            case '4':
                return "canceled"
            default:
                return "Do not touch"
        }
    }

    const getNextStatus = (currentStatus) => {
        switch (currentStatus) {
            case '0':
                return '1'
            case '1':
                return '2'
            case '2':
                return '3'
            case '3':
                return '4'
            case '4':
                return '0'
            default:
                return '0'
        }
    }

    const getPreviousStatus = (currentStatus) => {
        switch (currentStatus) {
            case '0':
                return '4'
            case '4':
                return '3'
            case '3':
                return '2'
            case '2':
                return '1'
            case '1':
                return '0'
            default:
                return '0'
        }
    }

    const handleClick = () => {
        const nextStatus = getNextStatus(status)
        setStatus(nextStatus)
    }

    return (
        <div>
            <div className={`order-prop ${getStatusText(status)}-color`}>
                <p>#{order.id}</p>
                <p>{date}</p>
                <p>{order.name}</p>
                <p>{formatPrice(order.total)}€</p>
                <button onClick={handleClick} className="order-prop-status-button">{getStatusText(status)}<NextArrowSVG /></button>
                <button onClick={() => setOpen(!open)} className="order-prop-open-button"><PlaySVG rotation={open ? '90deg' : '0deg'} /></button>
            </div>
            {order.products.length > 0 && (
                <div className="order-prop-details" style={{ height: open ? `${200 * order.products.length}px` : '0' }}>
                    {order.products.map((product) => (
                        <OrderDetailsProp key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}
