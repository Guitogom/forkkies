

export function ClientPayment({ cart, setCart, primartyColor, secondaryColor, themeColor }) {

    const pay = () => {
        fetch('https://api.forkkies.live/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cart: cart
            })
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
            <button onClick={pay}></button>
        </div>
    )
}