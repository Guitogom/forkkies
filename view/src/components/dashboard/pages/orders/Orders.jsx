import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Title } from "../../Title"
import '../../../../styles/Orders.css'

export function Orders({ business }) {
    const navigate = useNavigate()

    useEffect(() => {
        console.log('fetching orders')
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
                    console.log(orders)
                })
                .catch(error => {
                    console.error('Error:', error.message)
                    localStorage.removeItem('session_token')
                    navigate('/error')
                })
        }
    }, [])

    return (
        <section>
            <Title title="Orders" text="Orders" />
            <div className="order-colors"></div>
            <div className="order-table">

            </div>
        </section>
    )
}