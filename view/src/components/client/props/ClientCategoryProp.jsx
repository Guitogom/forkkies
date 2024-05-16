import { Link, useParams } from "react-router-dom";

export function ClientCategoryProp({ category, secondaryColor }) {
    const { tag } = useParams()
    var imagenDisplay = `data:image/jpeg;base64,${category.img}`


    return (
        <Link to={`/b/${tag}/c/${category.id}`} className="client-category-prop">
            <img src={imagenDisplay} alt={category.name} className="category-prop-img" />
            <h3 className="category-prop-name" style={{ color: secondaryColor }}>{category.name}</h3>
        </Link>
    )
}