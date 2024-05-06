import { Link, useParams } from 'react-router-dom';

export function CategoryDisplay({ category }) {
    const { id } = useParams()

    return (
        <Link className="category" to={`/dashboard/t/${id}/${category.id}`}>
            <img src={`${category.img}`} alt={category.name} />
            <h1>{category.name}</h1>
        </Link>
    )
}