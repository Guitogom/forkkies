import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PayCard } from '../../assets/svg/PayCard.jsx'

export function ClientPayment({ cart, setCart, primaryColor, secondaryColor, themeColor, template, orderPrice, setOrderNumber }) {
    const { tag } = useParams()
    const [clientName, setClientName] = useState('Anonymous')
    const [fetching, setFetching] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (cart.length === 0) {
            navigate(`/b/${tag}/categories`)
        }
    }, [])

    const payCash = () => {
        if (fetching) return
        setFetching(true)

        const requestBody = {
            business_id: template.id,
            total: orderPrice,
            name: clientName,
            products: cart.map(item => {
                let specials = []

                if (item.steps) {
                    if (item.steps.optionSpecials) {
                        for (const step in item.steps.optionSpecials) {
                            item.steps.optionSpecials[step].forEach(special => {
                                specials.push(special.id)
                            })
                        }
                    }
                    if (item.steps.deletableSpecials) {
                        for (const step in item.steps.deletableSpecials) {
                            item.steps.deletableSpecials[step].forEach(special => {
                                specials.push(special.id)
                            })
                        }
                    }
                    if (item.steps.extraSpecials) {
                        for (const step in item.steps.extraSpecials) {
                            item.steps.extraSpecials[step].forEach(special => {
                                specials.push(special.id)
                            })
                        }
                    }
                }

                return {
                    id: item.product,
                    unit_price: item.individualPrice,
                    quantity: item.quantity,
                    specials: specials.length > 0 ? specials.join(',') : ''
                }
            })
        }

        fetch('https://api.forkkies.live/neworder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Error:', response.statusText)
                    setFetching(false)
                }
                return response.json()
            })
            .then(response => {
                localStorage.removeItem('cart')
                setCart([])
                setOrderNumber(response.result)
                navigate(`/b/${tag}/pay/cash`)
            })
            .catch(error => {
                console.error('Error:', error.message)
                setFetching(false)
            })
    }


    return (
        <div className='client-payment'>
            <h3 style={{ color: secondaryColor }}>Payment</h3>
            <p style={{ color: secondaryColor }}>How do we address to you?</p>
            <input type="text" placeholder='Name' className='client-payment-name-input' onChange={(e) => setClientName(e.target.value)} style={{ backgroundColor: themeColor, color: secondaryColor, border: `1px solid ${secondaryColor}` }} />
            <p style={{ color: secondaryColor }}>Choose your payment method</p>
            <div className="client-payment-methods">
                <button onClick={payCash}>Cash</button>
                <button><PayCard />
                </button>
                <button>PayPal</button>
            </div>
        </div>
    )
}
