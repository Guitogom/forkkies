import { useParams } from 'react-router-dom'

export function ClientFullProduct({ categories, secondaryColor }) {
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

    return (
        <section>
            <div className="client-full-product-info">
                <img src={`${imagenDisplay}`} alt={`${product.name} Image`} className='client-full-product-image' style={{ filter: `drop-shadow(0px 0px 8px ${secondaryColor})` }} />
                <h2 className="client-full-product-name" style={{ color: secondaryColor }}>{product.name}</h2>
                <p className="client-full-product-description" style={{ color: secondaryColor }}>{product.description}</p>
                <p className="client-full-product-price" style={{ color: secondaryColor }}>{formatPrice(product.price)}€</p>
            </div>
        </section>
    )
}