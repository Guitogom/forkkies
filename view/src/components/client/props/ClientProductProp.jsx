import { Link, useParams } from "react-router-dom";

export function ClientProductProp({ product, secondaryColor }) {
    const { tag, categoryId } = useParams()
    var imagenDisplay = `data:image/jpeg;base64,${product.img}`
    var link = `/b/${tag}/c/${categoryId}/p/${product.id}`

    if (product.steps.length > 0) {
        link = `/b/${tag}/c/${categoryId}/sp/${product.id}`
    }

    return (
        <Link to={link} className="client-category-prop">
            <img src={imagenDisplay} alt={product.name} className="category-prop-img" />
            <h3 className="category-prop-name" style={{ color: secondaryColor }}>{product.name}</h3>
        </Link>
    )
}