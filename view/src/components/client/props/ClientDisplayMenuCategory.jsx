import { Link, useParams } from 'react-router-dom';

export function ClientDisplayMenuCategory({ category, primaryColor, displayNav, setDisplayNav }) {
    const { tag } = useParams()

    return (
        <Link to={`/b/${tag}/c/${category.id}`} className="client-category-display-menu" onClick={() => setDisplayNav(!displayNav)} >
            <img src={`data:image/jpeg;base64,${category.img}`} alt={category.name} />
            <h3 style={{ color: primaryColor }}>{category.name}</h3>
        </Link>
    )
}