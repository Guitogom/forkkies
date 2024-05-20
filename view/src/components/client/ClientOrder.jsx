import { ClientOrderProduct } from './props/ClientOrderProduct.jsx'

export function ClientOrder({ cart, setCart, secondaryColor, primaryColor }) {

    return (
        <section>
            <h2>Your Order</h2>
            <div className="client-cart">
                {cart.map((cartProduct, index) => (
                    <ClientOrderProduct key={index} cartProduct={cartProduct} cart={cart} setCart={setCart} secondaryColor={secondaryColor} primaryColor={primaryColor} />
                ))}
            </div>
        </section>
    )
}