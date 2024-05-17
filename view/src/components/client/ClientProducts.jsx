import { useParams } from "react-router-dom";
import { ClientProductProp } from "./props/ClientProductProp.jsx"

export function ClientProducts({ categories, secondaryColor }) {
    const { categoryId } = useParams();
    const category = categories.find(cat => cat.id === parseInt(categoryId));

    if (!category) {
        return <div>Category not found</div>;
    }

    return (
        <div className="client-products-categories"></div>
        <div className="client-products">
            {category.products && category.products.length > 0 ? (
                category.products.map((product, index) => (
                    <ClientProductProp key={index} product={product} secondaryColor={secondaryColor} />
                ))
            ) : (
                <div>No products available in this category.</div>
            )}
        </div>
    )
}