import { ClientOrderProduct } from './props/ClientOrderProduct.jsx'

export function ClientOrder({ cart, setCart, secondaryColor, primaryColor, themeColor, orderPrice }) {

    const formatPrice = (price) => {
        return price % 1 === 0 ? `${price}.00` : price.toFixed(2)
    }

    return (
        <section className="client-cart">
            <h2>Your Order</h2>
            {cart.length > 0 ? (
                cart.map((cartProduct) => (
                    <ClientOrderProduct
                        key={cartProduct.product}
                        cartProduct={cartProduct}
                        cart={cart}
                        setCart={setCart}
                        secondaryColor={secondaryColor}
                        primaryColor={primaryColor}
                        themeColor={themeColor}
                    />
                ))
            ) : (
                <p style={{ color: secondaryColor }}>Your cart is empty.</p>
            )}
            <div className='client-cart-total'>
                <p style={{ color: secondaryColor }}>Total:</p>
                <p style={{ color: secondaryColor }}>{formatPrice(orderPrice)}€</p>
            </div>
            {
                cart.length > 0 ? (
                    <p style={{ color: secondaryColor }}>You can pay with the right lower button.</p>
                ) : (
                    <p style={{ color: secondaryColor }}>You can't pay if your cart is empty.</p>
                )
            }
        </section>
    )
}