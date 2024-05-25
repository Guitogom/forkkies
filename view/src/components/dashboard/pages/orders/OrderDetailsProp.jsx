export function OrderDetailsProp({ product }) {
    const imagenDisplay = `data:image/jpeg;base64,${product.img}`

    console.log(product)

    const formatPrice = (price) => {
        if (!price) return '0.00'
        price = price.toFixed(2)
        return price
    }

    const totalPrice = product.unit_price * product.quantity

    return (
        <div className="order-prop-details-item">
            <div className="order-prop-details-item-image">
                <img src={imagenDisplay} alt={product.name} />
            </div>
            <div className="order-prop-details-item-info">
                <p>{product.name}</p>
                <p>x{product.quantity}</p>
            </div>
            <div className="order-prop-details-item-specials">
                <div className="order-prop-details-item-specials-options">
                    <p style={{ color: '#4440E0', fontWeight: 'bold', fontFamily: 'var(--secondary-font)' }}>?</p>
                    <p>
                        {
                            product.options.map((special, index) => (
                                <span key={index}>
                                    {special}{index < product.options.length - 1 ? ', ' : ''}
                                </span>
                            ))
                        }
                    </p>
                </div>
                <div className="order-prop-details-item-specials-deletables">
                    <p style={{ color: '#F24141', fontWeight: 'bold', fontFamily: 'var(--secondary-font)' }}>-</p>
                    <p>
                        {
                            product.deletables.map((special, index) => (
                                <span key={index}>
                                    {special}{index < product.deletables.length - 1 ? ', ' : ''}
                                </span>
                            ))
                        }
                    </p>
                </div>
                <div className="order-prop-details-item-specials-extras">
                    <p style={{ color: '#42E73E', fontWeight: 'bold', fontFamily: 'var(--secondary-font)' }}>+</p>
                    <p>
                        {
                            product.extras.map((special, index) => (
                                <span key={index}>
                                    {special}{index < product.extras.length - 1 ? ', ' : ''}
                                </span>
                            ))
                        }
                    </p>
                </div>
            </div>
            <div className="order-prop-details-item-prices">
                {
                    product.quantity > 1 ? (
                        <>
                            <p className="order-prop-details-item-prices-math">{formatPrice(product.unit_price)} x {product.quantity}</p>
                            <p className="order-prop-details-item-prices-total">{formatPrice(totalPrice)}</p>
                        </>
                    ) : (
                        <p className="order-prop-details-item-prices-total">{formatPrice(totalPrice)}</p>
                    )
                }
            </div>
        </div>
    )
}
