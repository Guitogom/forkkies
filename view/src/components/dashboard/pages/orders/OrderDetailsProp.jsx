export function OrderDetailsProp({ product }) {
    const imagenDisplay = `data:image/jpeg;base64,${product.img}`

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
                </div>
                <div className="order-prop-details-item-specials-deletables">
                    <p style={{ color: '#F24141', fontWeight: 'bold', fontFamily: 'var(--secondary-font)' }}>-</p>
                </div>
                <div className="order-prop-details-item-specials-extras">
                    <p style={{ color: '#42E73E', fontWeight: 'bold', fontFamily: 'var(--secondary-font)' }}>+</p>
                </div>
            </div>
            <div className="order-prop-details-item-prices">
                <p>{product.price}</p>
                <p>{product.totalPrice}</p>
            </div>
        </div>
    )
}