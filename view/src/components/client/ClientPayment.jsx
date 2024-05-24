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
                <button onClick={payCash}><svg viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#2A6797" d="M2 11c-2 0-2 2-2 2v21s0 2 2 2h32c2 0 2-2 2-2V13s0-2-2-2H2z"></path><path fill="#5DADEC" d="M2 6C0 6 0 8 0 8v20s0 2 2 2h32c2 0 2-2 2-2V8s0-2-2-2H2z"></path><circle fill="#4289C1" cx="25" cy="18" r="6.5"></circle><path fill="#2A6797" d="M33 28.5H3c-.827 0-1.5-.673-1.5-1.5V9c0-.827.673-1.5 1.5-1.5h30c.827 0 1.5.673 1.5 1.5v18c0 .827-.673 1.5-1.5 1.5zM3 8.5a.5.5 0 0 0-.5.5v18c0 .275.225.5.5.5h30c.275 0 .5-.225.5-.5V9a.5.5 0 0 0-.5-.5H3z"></path><path fill="#FFE8B6" d="M14 6h8v24.062h-8z"></path><path fill="#FFAC33" d="M14 30h8v6h-8z"></path><path fill="#2A6797" d="M12.764 21.84c0 .658-1.474 1.447-3.301 1.447c-2.42 0-3.877-1.681-4.361-3.742H3.808a.57.57 0 1 1 0-1.139h1.129c-.008-.136-.029-.27-.029-.406c0-.3.026-.597.063-.89H3.808a.57.57 0 1 1 0-1.14h1.416c.593-1.835 2.03-3.257 4.313-3.257c1.84 0 3.008.993 3.008 1.519c0 .336-.205.612-.526.612c-.584 0-.876-1.022-2.482-1.022c-1.51 0-2.428.942-2.891 2.147h3.327a.57.57 0 1 1 0 1.14H6.351a6.246 6.246 0 0 0-.072.891c0 .134.016.27.025.405h3.668a.57.57 0 1 1 0 1.139H6.485c.389 1.43 1.346 2.631 2.978 2.631c1.563 0 2.25-.934 2.79-.934c.307.001.511.235.511.599z"></path></g></svg>Cash</button>
                {/* <button><PayCard /></button>
                <button>PayPal</button> */}
            </div>
        </div>
    )
}
