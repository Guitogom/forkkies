import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CartSVG } from '../../assets/svg/CartSVG.jsx'

export function ClientFinalStep({ optionSpecials, deletableSpecials, extraSpecials, primaryColor, secondaryColor, themeColor, cart, setCart, product }) {
    const { tag, categoryId, productId } = useParams()
    const navigate = useNavigate()

    const calculateSpecialsPrice = (specials) => {
        let totalPriceChange = 0
        Object.values(specials).forEach((step) => {
            step.forEach((special) => {
                const priceChange = parseFloat(special.price_changer)
                if (!isNaN(priceChange)) {
                    totalPriceChange += priceChange
                }
            })
        })
        return totalPriceChange
    }

    const [innerCart, setInnerCart] = useState({
        quantity: 1,
        totalPrice: product ? product.price : 0,
    })

    useEffect(() => {
        if (product) {
            const totalPriceChange = calculateSpecialsPrice(optionSpecials) + calculateSpecialsPrice(deletableSpecials) + calculateSpecialsPrice(extraSpecials)
            const newTotalPrice = (product.price + totalPriceChange) * innerCart.quantity
            setInnerCart((prevCart) => ({
                ...prevCart,
                totalPrice: newTotalPrice
            }))
        }
    }, [optionSpecials, deletableSpecials, extraSpecials, innerCart.quantity, product])

    const formatPrice = (price) => price.toFixed(2)

    const lessQuantity = () => {
        if (innerCart.quantity > 1) {
            setInnerCart((prevCart) => ({
                ...prevCart,
                quantity: prevCart.quantity - 1,
                totalPrice: (product.price + calculateSpecialsPrice(optionSpecials) + calculateSpecialsPrice(deletableSpecials) + calculateSpecialsPrice(extraSpecials)) * (prevCart.quantity - 1)
            }))
        }
    }

    const plusQuantity = () => {
        setInnerCart((prevCart) => ({
            ...prevCart,
            quantity: prevCart.quantity + 1,
            totalPrice: (product.price + calculateSpecialsPrice(optionSpecials) + calculateSpecialsPrice(deletableSpecials) + calculateSpecialsPrice(extraSpecials)) * (prevCart.quantity + 1)
        }))
    }

    const placeQuantity = (e) => {
        const quantity = parseInt(e.target.value)
        if (!isNaN(quantity) && quantity >= 1) {
            setInnerCart({
                ...innerCart,
                quantity: quantity,
                totalPrice: (product.price + calculateSpecialsPrice(optionSpecials) + calculateSpecialsPrice(deletableSpecials) + calculateSpecialsPrice(extraSpecials)) * quantity
            })
        }
    }

    const addToCart = () => {
        const totalPriceChange = calculateSpecialsPrice(optionSpecials) + calculateSpecialsPrice(deletableSpecials) + calculateSpecialsPrice(extraSpecials)
        const totalPrice = (product.price + totalPriceChange) * innerCart.quantity

        const newItem = {
            innerId: Math.random().toString(36).substr(2, 9),
            type: 1,
            category: categoryId,
            product: productId,
            name: product.name,
            img: product.img,
            quantity: innerCart.quantity,
            individualPrice: product.price + totalPriceChange,
            totalPrice: totalPrice,
            steps: {
                optionSpecials: optionSpecials,
                deletableSpecials: deletableSpecials,
                extraSpecials: extraSpecials
            }
        }

        setCart([...cart, newItem])
        navigate(`/b/${tag}/c/${categoryId}`)
    }

    const renderSpecials = (specials, title) => {
        const allSpecials = Object.values(specials).flatMap(step => step || []);
        if (allSpecials.length > 0) {
            return (
                <div className='client-full-product-specials' style={{ borderBottom: `1px solid ${secondaryColor}` }}>
                    <h3 style={{ color: secondaryColor }}>{title}</h3>
                    <div className='client-full-product-specials-flex'>
                        {allSpecials.map((special, index) => (
                            <img key={index} src={`data:image/jpeg;base64,${special.img}`} alt={special.name} />
                        ))}
                    </div>
                </div>
            )
        }
        return null
    }

    const imagenDisplay = `data:image/jpeg;base64,${product.img}`

    return (
        <section>
            <div className="client-full-product-info">
                <img src={imagenDisplay} alt={`${product.name} Image`} className='client-full-product-image' style={{ filter: `drop-shadow(0px 0px 8px ${secondaryColor})` }} />
                <h2 className="client-full-product-name" style={{ color: secondaryColor }}>{product.name}</h2>
                <div className="client-full-product-properties">
                    {
                        product.properties.length > 0 ? (product.properties.map((property, index) => {
                            return (
                                <div className="property" key={index}>
                                    <img src={`data:image/png;base64,${property.img}`} alt={property.name} />
                                </div>
                            )
                        })) : <div></div>
                    }
                </div>
                <p style={{ color: secondaryColor }}>Original Price:</p>
                <p className="client-full-product-price" style={{ color: secondaryColor }}>{formatPrice(product.price)}€</p>
                <p className="client-full-product-description" style={{ color: secondaryColor }}>{product.description || 'Descripción del producto medianamente larga'}</p>
                <hr className='client-hr' style={{ boxShadow: `0 0 10px ${secondaryColor}`, backgroundColor: `${secondaryColor}` }} />
            </div>
            {renderSpecials(optionSpecials, "In this product you prefer:")}
            {renderSpecials(extraSpecials, "In this product you also want:")}
            {renderSpecials(deletableSpecials, "In this product you don't want:")}
            <div className="client-full-product-add-to-cart">
                <div className='client-full-product-quantity-handler'>
                    <button className='client-full-product-add-to-cart-less' style={{ backgroundColor: secondaryColor, color: themeColor }} onClick={lessQuantity}>-</button>
                    <input type="text" value={innerCart.quantity} className='client-full-product-add-to-cart-input' style={{ backgroundColor: secondaryColor, color: themeColor }} onChange={placeQuantity} disabled />
                    <button className='client-full-product-add-to-cart-plus' style={{ backgroundColor: secondaryColor, color: themeColor }} onClick={plusQuantity}>+</button>
                </div>
                <p style={{ color: secondaryColor }} className='client-full-product-total-price-text'>Total Price:</p>
                <p className="client-full-product-total-price" style={{ color: secondaryColor }}>{formatPrice(innerCart.totalPrice)}€</p>
                <button className='client-full-product-add-to-cart-button' style={{ backgroundColor: secondaryColor, color: themeColor }} onClick={addToCart}><CartSVG fill={themeColor} />Add to Cart</button>
            </div>
        </section>
    )
}


