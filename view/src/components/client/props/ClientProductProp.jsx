import { Link, useParams } from "react-router-dom";

export function ClientProductProp({ product, secondaryColor }) {
    const { tag } = useParams()
    var imagenDisplay = `data:image/jpeg;base64,${product.img}`


    return (
        <Link to={`/b/${tag}/c/${product.id}`} className="client-category-prop">
            <img src={imagenDisplay} alt={product.name} className="category-prop-img" />
            <h3 className="category-prop-name" style={{ color: secondaryColor }}>{product.name}</h3>
        </Link>
    )
}