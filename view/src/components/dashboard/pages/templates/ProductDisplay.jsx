
export function ProductDisplay({ product }) {

    return (
        <div className="product">
            <img src={`${product.img}`} alt={product.name} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
        </div>
    )
}