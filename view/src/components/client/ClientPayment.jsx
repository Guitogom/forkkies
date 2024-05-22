import { useState } from 'react'
import { PayCard } from '../../assets/svg/PayCard.jsx'

export function ClientPayment({ cart, setCart, primartyColor, secondaryColor, themeColor, template, orderPrice }) {
    console.log(cart)

    const [clientName, setClientName] = useState('')

    const payCash = () => {
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
                }
                return response.json()
            })
            .then(response => {
                localStorage.removeItem('cart')
                setCart([])
            })
            .catch(error => {
                console.error('Error:', error.message)
            })
    }


    return (
        <div className='client-payment'>
            <h3>Payment</h3>
            <input type="text" placeholder='Name' className='client-payment-name-input' />
            <div className="client-payment-methods">
                <button onClick={payCash}>Cash</button>
                <button><PayCard />
                </button>
                <button>PayPal</button>
            </div>
        </div>
    )
}
