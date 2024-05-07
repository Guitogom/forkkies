import { Link, useParams } from 'react-router-dom';

export function CategoryDisplay({ category }) {
    const { id } = useParams()
    var imagenDisplay = `data:image/jpeg;base64,${category.img}`

    return (
        <Link className="category" to={`/dashboard/t/${id}/${category.id}`}>
            <img src={`${imagenDisplay}`} alt={category.name} />
            <h1>{category.name}</h1>
        </Link>
    )
}