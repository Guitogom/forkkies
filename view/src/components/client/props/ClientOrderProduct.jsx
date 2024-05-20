import { useState } from 'react'

export function ClientOrderProduct({ cartProduct, cart, setCart, secondaryColor, primaryColor }) {
    var imagenDisplay = `data:image/jpeg;base64,${cartProduct.img}`

    const [innerCart, setInnerCart] = useState(cartProduct)

    const lessQuantity = () => {
        if (innerCart.quantity > 1) {
            setInnerCart(prevState => ({
                ...prevState,
                quantity: prevState.quantity - 1,
                totalPrice: (prevState.quantity - 1) * prevState.individualPrice
            }))
        }
    }

    const plusQuantity = () => {
        setInnerCart(prevState => ({
            ...prevState,
            quantity: prevState.quantity + 1,
            totalPrice: (prevState.quantity + 1) * prevState.individualPrice
        }))
    }

    const placeQuantity = (e) => {
        const value = parseInt(e.target.value)
        if (value > 0) {
            setInnerCart(prevState => ({
                ...prevState,
                quantity: value,
                totalPrice: value * prevState.individualPrice
            }))
        } else {
            setInnerCart(prevState => ({
                ...prevState,
                quantity: 1,
                totalPrice: prevState.individualPrice
            }))
        }
    }

    return (
        <div className="client-product-in-order">
            <img src={imagenDisplay} alt={cartProduct.name} />
            <div>
                <h3>{cartProduct.name}</h3>
                <p>{cartProduct.price}</p>
                <div className='client-full-product-quantity-handler'>
                    <button className='client-full-product-add-to-cart-less' style={{ backgroundColor: secondaryColor, color: primaryColor }} onClick={lessQuantity}>-</button>
                    <input type="number" value={innerCart.quantity} className='client-full-product-add-to-cart-input' style={{ backgroundColor: secondaryColor, color: primaryColor }} onChange={placeQuantity} />
                    <button className='client-full-product-add-to-cart-plus' style={{ backgroundColor: secondaryColor, color: primaryColor }} onClick={plusQuantity}>+</button>
                </div>
            </div>
        </div>
    )
}