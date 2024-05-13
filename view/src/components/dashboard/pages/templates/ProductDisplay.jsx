import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function ProductDisplay({ product }) {
    const { id } = useParams()
    const { c_id } = useParams()
    var imagenDisplay = `data:image/jpeg;base64,${product.img}`
    if (product.img === '') {
        imagenDisplay = '/src/assets/media/camera.webp'
    }


    return (
        <Link className="product" to={`/dashboard/t/${id}/${c_id}/pp/${product.id}`}>
            <img src={imagenDisplay} alt={product.name} />
            <h2 className='product-name'>{product.name}</h2>
            <p className='product-price'>{product.price || '54.00'}€</p>
        </Link>
    )
}