import { PlaySVG } from "../../../../assets/svg/PlaySVG.jsx"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export function OrderProp({ order }) {
    const date = new Date(order.date).toLocaleDateString()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

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
            case 0:
                return "pending";
            case 1:
                return "payed";
            case 2:
                return "ready";
            case 3:
                return "delivered";
            case 4:
                return "canceled";
            default:
                return "Do not touch";
        }
    }

    const statusText = getStatusText(order.status);

    return (
        <div className="order-prop">
            <p>#{order.id}</p>
            <p>{date}</p>
            <p>{order.name}</p>
            <p>{formatPrice(order.total)}€</p>
            <button>{getStatusText()}</button>
            <button onClick={() => setOpen(!open)}><PlaySVG rotation={open ? '90deg' : '0deg'} /></button>
        </div>
    )
}
