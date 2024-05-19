import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function ClientFullProduct({ cart, setCart, categories, secondaryColor, primaryColor }) {
    const { categoryId, productId } = useParams()
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

    const addToCart = () => {
        const newCart = [...cart]
        const index = newCart.findIndex(item => item.product === innerCart.product)
        if (index === -1) {
            newCart.push(innerCart)
        } else {
            newCart[index] = innerCart
        }
        setCart(newCart)
    }

    return (
        <section>
            <div className="client-full-product-info">
                <img src={imagenDisplay} alt={`${product.name} Image`} className='client-full-product-image' style={{ filter: `drop-shadow(0px 0px 8px ${secondaryColor})` }} />
                <h2 className="client-full-product-name" style={{ color: secondaryColor }}>{product.name}</h2>
                <p className="client-full-product-description" style={{ color: secondaryColor }}>{product.description}</p>
                <p className="client-full-product-price" style={{ color: secondaryColor }}>{formatPrice(product.price)}€</p>
            </div>
            <div className="client-full-product-add-to-cart">
                <div className='client-full-product-quantity-handler'>
                    <button className='client-full-product-add-to-cart-less' style={{ backgroundColor: secondaryColor, color: primaryColor }} onClick={lessQuantity}>-</button>
                    <input type="number" value={innerCart.quantity} className='client-full-product-add-to-cart-input' style={{ backgroundColor: secondaryColor, color: primaryColor }} onChange={placeQuantity} />
                    <button className='client-full-product-add-to-cart-plus' style={{ backgroundColor: secondaryColor, color: primaryColor }} onClick={plusQuantity}>+</button>
                </div>
                <p style={{ color: secondaryColor }}>Total Price:</p>
                <p className="client-full-product-total-price" style={{ color: secondaryColor }}>{formatPrice(innerCart.totalPrice)}€</p>
                <button className='client-full-product-add-to-cart-button' style={{ backgroundColor: secondaryColor, color: primaryColor }} onClick={addToCart}>Add to Cart</button>
            </div>
        </section>
    )
}
