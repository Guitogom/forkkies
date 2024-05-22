import { useState } from 'react'

export function ClientPayment({ cart, setCart, primartyColor, secondaryColor, themeColor, template, orderPrice }) {
    console.log(cart)

    const [clientName, setClientName] = useState('')

    const pay = () => {
        const requestBody = {
            business_id: 0,
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

        console.log('Request body: ', requestBody)

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
                console.log(response)
            })
            .catch(error => {
                console.error('Error:', error.message)
            })
    }


    return (
        <div>
            <button onClick={pay}>Pagar</button>
        </div>
    )
}
