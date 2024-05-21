import { useEffect, useState } from 'react'

export function ClientOrderProduct({ cartProduct, cart, setCart, secondaryColor, primaryColor, themeColor }) {
    var imagenDisplay = `data:image/jpeg;base64,${cartProduct.img}`

    const [innerCart, setInnerCart] = useState(cartProduct)

    useEffect(() => {
        const updateCart = () => {
            const newCart = cart.map(product =>
                product.product === innerCart.product
                    ? { ...innerCart, quantity: innerCart.quantity > 0 ? innerCart.quantity : 0 }
                    : product
            ).filter(product => product.quantity > 0)

            setCart(newCart)
        }
        updateCart()
    }, [innerCart, cart, setCart])

    const lessQuantity = () => {
        setInnerCart(prevState => {
            const newQuantity = prevState.quantity - 1
            return {
                ...prevState,
                quantity: newQuantity,
                totalPrice: newQuantity * prevState.individualPrice
            }
        })
    }

    const plusQuantity = () => {
        setInnerCart(prevState => ({
            ...prevState,
            quantity: prevState.quantity + 1,
            totalPrice: (prevState.quantity + 1) * prevState.individualPrice
        }))
    }

    const placeQuantity = (e) => {
        const value = parseInt(e.target.value, 10)
        setInnerCart(prevState => ({
            ...prevState,
            quantity: value >= 0 ? value : 1,
            totalPrice: (value >= 0 ? value : 1) * prevState.individualPrice
        }))
    }

    const formatPrice = (price) => {
        if (!price) return '0.00'
        price = price.toFixed(2)
        return price
    }

    return (
        <div className="client-product-in-order">
            <img src={imagenDisplay} alt={cartProduct.name} />
            <div className="client-product-in-order-info">
                <h3 style={{ color: secondaryColor }}>{cartProduct.name}</h3>
                <p style={{ color: secondaryColor }}>{formatPrice(cartProduct.totalPrice)}€</p>
                <div className='client-full-product-quantity-handler'>
                    <button className='client-full-product-add-to-cart-less' style={{ backgroundColor: secondaryColor, color: themeColor }} onClick={lessQuantity}>-</button>
                    <input type="number" value={innerCart.quantity} className='client-full-product-add-to-cart-input' style={{ backgroundColor: secondaryColor, color: themeColor }} onChange={placeQuantity} disabled />
                    <button className='client-full-product-add-to-cart-plus' style={{ backgroundColor: secondaryColor, color: themeColor }} onClick={plusQuantity}>+</button>
                </div>
            </div>
        </div>
    )
}