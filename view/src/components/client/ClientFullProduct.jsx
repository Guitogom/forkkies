import { useParams } from 'react-router-dom'
import { useState } from 'react'

export function ClientFullProduct({ categories, secondaryColor, primaryColor }) {
    const { categoryId, productId } = useParams()
    const category = categories.find(cat => cat.id === parseInt(categoryId))
    const product = category.products.find(pro => pro.id === parseInt(productId))
    var imagenDisplay = `data:image/jpeg;base64,${product.img}`

    const formatPrice = (price) => {
        price = price.toString()
        if (!price.includes('.')) {
            price += '.00'
        } else {
            const [integerPart, decimalPart] = price.split('.')
            if (decimalPart.length === 1) {
                price += '0'
            }
        }
        return price
    }

    const lessQuantity = () => {
        if (innerCart.quantity > 1) {
            setInnerCart({ ...innerCart, quantity: innerCart.quantity - 1 })
        }
    }

    const plusQuantity = () => {
        setInnerCart({ ...innerCart, quantity: innerCart.quantity + 1 })
    }

    const [innerCart, setInnerCart] = useState({
        category: category.id,
        product: product.id,
        quantity: 1,
        individualPrice: product.price,
        totalPrice: 0
    })

    return (
        <section>
            <div className="client-full-product-info">
                <img src={`${imagenDisplay}`} alt={`${product.name} Image`} className='client-full-product-image' style={{ filter: `drop-shadow(0px 0px 8px ${secondaryColor})` }} />
                <h2 className="client-full-product-name" style={{ color: secondaryColor }}>{product.name}</h2>
                <p className="client-full-product-description" style={{ color: secondaryColor }}>{product.description}</p>
                <p className="client-full-product-price" style={{ color: secondaryColor }}>{formatPrice(product.price)}€</p>
            </div>
            <div className="client-full-product-add-to-cart">
                <button className='client-full-product-add-to-cart-less' style={{ backgroundColor: secondaryColor, color: primaryColor }} onClick={lessQuantity}>-</button>
                <input type="text" value={innerCart.quantity} className='client-full-product-add-to-cart-input' style={{ backgroundColor: secondaryColor, color: primaryColor }} />
                <button className='client-full-product-add-to-cart-plus' style={{ backgroundColor: secondaryColor, color: primaryColor }} onClick={plusQuantity}>+</button>
            </div>
        </section>
    )
}