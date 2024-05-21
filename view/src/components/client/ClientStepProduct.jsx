import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function ClientStepProduct({ cart, setCart, categories, secondaryColor, primaryColor, themeColor }) {
    const { tag, categoryId, productId } = useParams()
    const category = categories.find(cat => cat.id === parseInt(categoryId))
    const product = category ? category.products.find(pro => pro.id === parseInt(productId)) : null
    const [innerCart, setInnerCart] = useState({
        category: category ? category.id : '',
        product: product ? product.id : '',
        name: product ? product.name : '',
        img: product ? product.img : '',
        quantity: 1,
        individualPrice: product ? product.price : 0,
        totalPrice: product ? product.price : 0
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (product) {
            setInnerCart({
                category: category.id,
                product: product.id,
                name: product.name,
                img: product.img,
                quantity: 1,
                individualPrice: product.price,
                totalPrice: product.price
            })
        }
    }, [categoryId, productId])

    if (!category || !product) {
        return <p>Product or category not found</p>
    }

    var imagenDisplay = `data:image/jpeg;base64,${product.img}`

    const formatPrice = (price) => {
        if (!price) return '0.00'
        price = price.toFixed(2)
        return price
    }

    const lessQuantity = () => {
        if (innerCart.quantity > 1) {
            setInnerCart(prevState => ({
                ...prevState,
                quantity: prevState.quantity - 1,
                totalPrice: (prevState.quantity - 1) * prevState.individualPrice
            }))
        }
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

    const plusQuantity = () => {
        setInnerCart(prevState => ({
            ...prevState,
            quantity: prevState.quantity + 1,
            totalPrice: (prevState.quantity + 1) * prevState.individualPrice
        }))
    }

    const beginSteps = () => {
        navigate(`/b/${tag}/c/${category.id}/sp/${product.id}/s`)
    }

    return (
        <section>
            <div className="client-full-product-info" >
                <img src={imagenDisplay} alt={`${product.name} Image`} className='client-full-product-image' style={{ filter: `drop-shadow(0px 0px 8px ${secondaryColor})` }} />
                <h2 className="client-full-product-name" style={{ color: secondaryColor }}>{product.name}</h2>
                <p className="client-full-product-price" style={{ color: secondaryColor }}>{formatPrice(product.price)}€</p>
                <p className="client-full-product-description" style={{ color: secondaryColor }}>{product.description || 'Descripción del producto medianamente larga'}</p>
                <hr className='client-hr' style={{ boxShadow: `0 0 10px ${secondaryColor}`, backgroundColor: `${secondaryColor}` }} />
            </div>
            <div className="client-full-product-add-to-cart">
                {/* <div className='client-full-product-quantity-handler'>
                    <button className='client-full-product-add-to-cart-less' style={{ backgroundColor: secondaryColor, color: themeColor }} onClick={lessQuantity}>-</button>
                    <input type="number" value={innerCart.quantity} className='client-full-product-add-to-cart-input' style={{ backgroundColor: secondaryColor, color: themeColor }} onChange={placeQuantity} />
                    <button className='client-full-product-add-to-cart-plus' style={{ backgroundColor: secondaryColor, color: themeColor }} onClick={plusQuantity}>+</button>
                </div>
                <p style={{ color: secondaryColor }} className='client-full-product-total-price-text'>Total Price:</p>
                <p className="client-full-product-total-price" style={{ color: secondaryColor }}>{formatPrice(innerCart.totalPrice)}€</p> */}
                <p style={{ color: secondaryColor }}>This product contains steps</p>
                <button className='client-full-product-begin-steps-button' style={{ backgroundColor: secondaryColor, color: themeColor }} onClick={beginSteps}><svg fill={themeColor} viewBox="-0.5 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m0 22.835v-21.665c0-.007 0-.015 0-.024 0-.63.511-1.141 1.141-1.141.201 0 .391.052.555.144l-.006-.003 18.71 10.493v-10.038c0-.331.268-.6.599-.6h1.2c.332 0 .6.269.6.6v22.799.001c0 .331-.268.599-.599.599h-.001-1.2c-.331 0-.599-.268-.599-.599v-.001-10.038l-18.71 10.494c-.158.091-.347.145-.548.145-.632-.007-1.142-.521-1.142-1.155 0-.004 0-.008 0-.011v.001z"></path></g></svg>Begin</button>
            </div>
        </section>
    )
}
