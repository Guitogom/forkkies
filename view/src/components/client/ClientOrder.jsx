import { ClientOrderProduct } from './props/ClientOrderProduct.jsx'

export function ClientOrder({ cart, setCart, secondaryColor, primaryColor, themeColor }) {

    return (
        <section className="client-cart">
            <h2>Your Order</h2>
            {cart.map((cartProduct) => (
                <ClientOrderProduct
                    key={cartProduct.product}
                    cartProduct={cartProduct}
                    cart={cart}
                    setCart={setCart}
                    secondaryColor={secondaryColor}
                    primaryColor={primaryColor}
                    themeColor={themeColor}
                />
            ))}
            {
                cart.length > 0 && (
                    <p>You can pay with the right lower button.</p>
                )
            }
        </section>
    )
}