import React, { useState } from 'react'
import { CartSVG } from '../../assets/svg/CartSVG.jsx'

export function ClientFinalStep({ optionSpecials, deletableSpecials, extraSpecials, primaryColor, secondaryColor, themeColor, cart, setCart, product }) {
    const [innerCart, setInnerCart] = useState({
        quantity: 1,
        totalPrice: product.price
    })

    console.log('Product: ', product)

    const formatPrice = (price) => {
        return price.toFixed(2)
    }

    const lessQuantity = () => {
        if (innerCart.quantity > 1) {
            setInnerCart({
                ...innerCart,
                quantity: innerCart.quantity - 1,
                totalPrice: innerCart.totalPrice - product.price
            })
        }
    }

    const plusQuantity = () => {
        setInnerCart({
            ...innerCart,
            quantity: innerCart.quantity + 1,
            totalPrice: innerCart.totalPrice + product.price
        })
    }

    const placeQuantity = (e) => {
        const quantity = parseInt(e.target.value);
        if (!isNaN(quantity) && quantity >= 1) {
            setInnerCart({
                ...innerCart,
                quantity: quantity,
                totalPrice: quantity * product.price
            })
        }
    }

    const calculateSpecialsPrice = (specials) => {
        if (!Array.isArray(specials)) {
            console.error("Specials is not an array:", specials)
            return 0
        }

        let totalPriceChange = 0
        specials.forEach(special => {
            totalPriceChange += parseFloat(special.price_changer)
        })
        return totalPriceChange
    }


    const addToCart = () => {
        let totalPriceChange = calculateSpecialsPrice(optionSpecials) + calculateSpecialsPrice(deletableSpecials) + calculateSpecialsPrice(extraSpecials)

        const totalPrice = (product.price + totalPriceChange) * innerCart.quantity

        const newItem = {
            category: product.category,
            product: product.id,
            name: product.name,
            img: product.img,
            quantity: innerCart.quantity,
            individualPrice: product.price,
            totalPrice: totalPrice,
            steps: {
                optionSpecials: optionSpecials,
                deletableSpecials: deletableSpecials,
                extraSpecials: extraSpecials
            }
        }

        setCart([...cart, newItem])
    }


    var imagenDisplay = `data:image/jpeg;base64,${product.img}`

    return (
        <section>
            <div className="client-full-product-info">
                <img src={imagenDisplay} alt={`${product.name} Image`} className='client-full-product-image' style={{ filter: `drop-shadow(0px 0px 8px ${secondaryColor})` }} />
                <h2 className="client-full-product-name" style={{ color: secondaryColor }}>{product.name}</h2>
                <p className="client-full-product-price" style={{ color: secondaryColor }}>{formatPrice(product.price)}€</p>
                <p className="client-full-product-description" style={{ color: secondaryColor }}>{product.description || 'Descripción del producto medianamente larga'}</p>
                <hr className='client-hr' style={{ boxShadow: `0 0 10px ${secondaryColor}`, backgroundColor: `${secondaryColor}` }} />
            </div>
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


        // <div>
        //     <h1>Confirmation</h1>
        //     <h2>Review your order</h2>
        //     <div style={{ color: 'red' }}>
        //         {Object.keys(optionSpecials).map((key) => {
        //             const step = optionSpecials[key];
        //             return (
        //                 <div key={key}>
        //                     <h3>{step[0].title}</h3>
        //                     <ul>
        //                         {step.map((special) => (
        //                             <li key={special.id}>{special.name}</li>
        //                         ))}
        //                     </ul>
        //                 </div>
        //             );
        //         })}
        //         {Object.keys(deletableSpecials).map((key) => {
        //             const step = deletableSpecials[key];
        //             return (
        //                 <div key={key}>
        //                     <h3>{step[0].title}</h3>
        //                     <ul>
        //                         {step.map((special) => (
        //                             <li key={special.id}>{special.name}</li>
        //                         ))}
        //                     </ul>
        //                 </div>
        //             );
        //         })}
        //         {Object.keys(extraSpecials).map((key) => {
        //             const step = extraSpecials[key];
        //             return (
        //                 <div key={key}>
        //                     <h3>{step[0].title}</h3>
        //                     <ul>
        //                         {step.map((special) => (
        //                             <li key={special.id}>{special.name}</li>
        //                         ))}
        //                     </ul>
        //                 </div>
        //             );
        //         })}
        //     </div>
        //     <button onClick={() => setCart([])}>Confirm</button>
        // </div>
    )
}
