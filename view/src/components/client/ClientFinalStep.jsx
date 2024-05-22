import React, { useState } from 'react'
import { CartSVG } from '../../assets/svg/CartSVG.jsx'

export function ClientFinalStep({ optionSpecials, deletableSpecials, extraSpecials, primaryColor, secondaryColor, themeColor, cart, setCart, product }) {
    console.log(optionSpecials)

    const calculateSpecialsPrice = (specials) => {
        let totalPriceChange = 0;
        Object.values(specials).forEach((step) => {
            step.forEach((special) => {
                totalPriceChange += parseFloat(special.price_changer)
            })
        })
        return totalPriceChange
    }

    const updatedProduct = { ...product }
    let totalPriceChange = calculateSpecialsPrice(optionSpecials) + calculateSpecialsPrice(deletableSpecials) + calculateSpecialsPrice(extraSpecials)
    updatedProduct.price += totalPriceChange
    console.log(updatedProduct)
    console.log(totalPriceChange)

    const [innerCart, setInnerCart] = useState({
        quantity: 1,
        totalPrice: product.price
    })

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
    )
}

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

// The code provided is a React component that allows users to customize a product by adding various special options and adjusting the quantity. It also updates the total price based on these options. However, there seems to be an issue with NaN values appearing in the price calculations. This typically happens when the price_changer values are not properly parsed or when non-numeric values are involved in the calculations.

// Here are some steps to debug and fix the NaN issue in your code:

// Ensure all price_changer values are numbers: Verify that all price_changer values in your specials objects are valid numbers.

// Handle undefined or non-numeric price_changer values: Add checks to handle cases where price_changer might be undefined or non-numeric.

// Fix the total price calculation: Ensure that the total price calculation uses valid numbers throughout.

// Here's an updated version of your code with improvements to handle these potential issues:

// javascript
// Copiar código
// import React, { useState, useEffect } from 'react';
// import { CartSVG } from '../../assets/svg/CartSVG.jsx';

// export function ClientFinalStep({ optionSpecials, deletableSpecials, extraSpecials, primaryColor, secondaryColor, themeColor, cart, setCart, product }) {
//     const calculateSpecialsPrice = (specials) => {
//         let totalPriceChange = 0;
//         Object.values(specials).forEach((step) => {
//             step.forEach((special) => {
//                 const priceChange = parseFloat(special.price_changer);
//                 if (!isNaN(priceChange)) {
//                     totalPriceChange += priceChange;
//                 }
//             });
//         });
//         return totalPriceChange;
//     };

//     const [innerCart, setInnerCart] = useState({
//         quantity: 1,
//         totalPrice: product.price
//     });

//     useEffect(() => {
//         const totalPriceChange = calculateSpecialsPrice(optionSpecials) + calculateSpecialsPrice(deletableSpecials) + calculateSpecialsPrice(extraSpecials);
//         const newTotalPrice = (product.price + totalPriceChange) * innerCart.quantity;
//         setInnerCart((prevCart) => ({
//             ...prevCart,
//             totalPrice: newTotalPrice
//         }));
//     }, [optionSpecials, deletableSpecials, extraSpecials, innerCart.quantity, product.price]);

//     const formatPrice = (price) => price.toFixed(2);

//     const lessQuantity = () => {
//         if (innerCart.quantity > 1) {
//             setInnerCart((prevCart) => ({
//                 ...prevCart,
//                 quantity: prevCart.quantity - 1,
//                 totalPrice: (product.price + calculateSpecialsPrice(optionSpecials) + calculateSpecialsPrice(deletableSpecials) + calculateSpecialsPrice(extraSpecials)) * (prevCart.quantity - 1)
//             }));
//         }
//     };

//     const plusQuantity = () => {
//         setInnerCart((prevCart) => ({
//             ...prevCart,
//             quantity: prevCart.quantity + 1,
//             totalPrice: (product.price + calculateSpecialsPrice(optionSpecials) + calculateSpecialsPrice(deletableSpecials) + calculateSpecialsPrice(extraSpecials)) * (prevCart.quantity + 1)
//         }));
//     };

//     const placeQuantity = (e) => {
//         const quantity = parseInt(e.target.value);
//         if (!isNaN(quantity) && quantity >= 1) {
//             setInnerCart({
//                 ...innerCart,
//                 quantity: quantity,
//                 totalPrice: (product.price + calculateSpecialsPrice(optionSpecials) + calculateSpecialsPrice(deletableSpecials) + calculateSpecialsPrice(extraSpecials)) * quantity
//             });
//         }
//     };

//     const addToCart = () => {
//         const totalPriceChange = calculateSpecialsPrice(optionSpecials) + calculateSpecialsPrice(deletableSpecials) + calculateSpecialsPrice(extraSpecials);
//         const totalPrice = (product.price + totalPriceChange) * innerCart.quantity;

//         const newItem = {
//             category: product.category,
//             product: product.id,
//             name: product.name,
//             img: product.img,
//             quantity: innerCart.quantity,
//             individualPrice: product.price,
//             totalPrice: totalPrice,
//             steps: {
//                 optionSpecials: optionSpecials,
//                 deletableSpecials: deletableSpecials,
//                 extraSpecials: extraSpecials
//             }
//         };

//         setCart([...cart, newItem]);
//     };

//     const imagenDisplay = `data:image/jpeg;base64,${product.img}`;

//     return (
//         <section>
//             <div className="client-full-product-info">
//                 <img src={imagenDisplay} alt={`${product.name} Image`} className='client-full-product-image' style={{ filter: `drop-shadow(0px 0px 8px ${secondaryColor})` }} />
//                 <h2 className="client-full-product-name" style={{ color: secondaryColor }}>{product.name}</h2>
//                 <p className="client-full-product-price" style={{ color: secondaryColor }}>{formatPrice(product.price)}€</p>
//                 <p className="client-full-product-description" style={{ color: secondaryColor }}>{product.description || 'Descripción del producto medianamente larga'}</p>
//                 <hr className='client-hr' style={{ boxShadow: `0 0 10px ${secondaryColor}`, backgroundColor: `${secondaryColor}` }} />
//             </div>
//             <div className="client-full-product-add-to-cart">
//                 <div className='client-full-product-quantity-handler'>
//                     <button className='client-full-product-add-to-cart-less' style={{ backgroundColor: secondaryColor, color: themeColor }} onClick={lessQuantity}>-</button>
//                     <input type="text" value={innerCart.quantity} className='client-full-product-add-to-cart-input' style={{ backgroundColor: secondaryColor, color: themeColor }} onChange={placeQuantity} disabled />
//                     <button className='client-full-product-add-to-cart-plus' style={{ backgroundColor: secondaryColor, color: themeColor }} onClick={plusQuantity}>+</button>
//                 </div>
//                 <p style={{ color: secondaryColor }} className='client-full-product-total-price-text'>Total Price:</p>
//                 <p className="client-full-product-total-price" style={{ color: secondaryColor }}>{formatPrice(innerCart.totalPrice)}€</p>
//                 <button className='client-full-product-add-to-cart-button' style={{ backgroundColor: secondaryColor, color: themeColor }} onClick={addToCart}><CartSVG fill={themeColor} />Add to Cart</button>
//             </div>
//         </section>
//     );
// }
// Key Changes:
// Validation of price_changer values: Added checks to ensure price_changer values are parsed correctly and are not NaN.
// Use useEffect for recalculating total price: Added useEffect to recalculate the total price whenever dependencies change.
// Consistent calculation in quantity handlers: Updated lessQuantity and plusQuantity functions to use the same formula for recalculating the total price.
// These changes should resolve issues with NaN values and ensure that the total price is correctly calculated based on the product options and quantity.